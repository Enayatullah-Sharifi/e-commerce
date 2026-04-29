import expressAsyncHandler from "express-async-handler";
import {
  registerFormValidator,
  loginFormValidator,
} from "../utils/formValidator.js";
import User from "../model/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import Token from "../model/Token.js";
import crypto from "crypto";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// @desc    Register User
// @route   POST    /api/auth/register
// @access  Public
export const register = expressAsyncHandler(async (req, res) => {
  // 1)    get user information from client side
  const { username, email, password, password2 } = req.body;
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username || email)}&background=random&color=fff`;

  // 2)    validate user inputs
  const { errors, valid } = registerFormValidator(
    username,
    email,
    password,
    password2,
  );
  if (!valid) {
    res.status(400);
    throw new Error(Object.values(errors));
  }
  // 3)    query database to fine the user
  let user = await User.findOne({ email });

  // 4)    if user exist throw an error with user already exist
  if (user) {
    res.status(400);
    throw new Error("User already exist!");
  }

  // 5)     if there is no user then hash the password and store user into database
  user = await User.create({
    username,
    email,
    password,
    img: avatar,
  });
  // 6)     send a verification email to user's email
  if (user) {
    const token = await Token.create({
      token: await crypto.randomBytes(32).toString("hex"),
      userId: user._id,
    });
    const url = `${process.env.CLIENT_SIDE_URL}/api/auth/user/${user._id}/verify/${token.token}`;
    await sendEmail(
      email,
      "A link sent to your email please valid your email",
      url,
    );
    res.status(201).json({
      success: true,
      message:
        "A verification link sent to your email please validate your email!",
    });
  }
  // 7)     response to user
  res.status(201).json({
    success: false,
    message: "Something went wrong please try again",
  });
});

// @desc    Login User
// @route   POST    /api/auth/login
// @access  Public
export const login = expressAsyncHandler(async (req, res) => {
  // 1)     get the user info from client
  const { email, password } = req.body;

  // 2)     validate user input
  const { valid, errors } = loginFormValidator(email, password);
  if (!valid) {
    res.status(400);
    throw new Error(Object.values(errors));
  }
  // 3)     check if user exist compare user's email and password else throw err no user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("Invalid Credentials");
  }

  //    match password
  if (!(await user.matchPassword(password))) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  // 4)     if user exist check if user is validate or not
  if (!user.verified) {
    // 5)     if user is not validate send him a validation email else login user
    let token;
    token = await Token.findOneAndDelete({ userId: user._id });
    token = await Token.create({
      userId: user._id,
      token: await crypto.randomBytes(32).toString("hex"),
    });
    const url = `${process.env.BASE_URL}/api/auth/user/${user._id}/verify/${token.token}`;

    sendEmail(
      email,
      "Your account is not verified, we sent you a verification link please verify your email",
      url,
    );
    res.status(400).json({
      success: false,
      message:
        "Your account is not verified, we sent you a verification link please verify your email",
    });
  }

  // 6)     generate jwt token and set cookie
  const token = await generateToken(user, res);
  res
    .status(201)
    .cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true only in HTTPS
    })
    .json({
      success: true,
      message: "Logged in successfully!",
      data: {
        username: user.username,
        email: user.email,
        img: user.img,
        id: user._id,
        role: user.role,
      },
    });
});

// @desc    Validate User
// @route   GET    /api/auth/user/:userId/verify/:token
// @access  Private
export const validateUser = expressAsyncHandler(async (req, res) => {
  // 1) todo    get userId and verify token from url (req.query);
  // 2) todo    find the user with its userId if exist go forward else throw err with no user
  // 3) todo    find the verify token from database and compare it with the token from url
  // 4) todo    if the verify token belongs to that user delete token from db and verify user
  // 5) todo    (optional) generate token and set cookie in order to login user
});

// @desc    Logout User
// @route   GET    /api/auth/logout
// @access  Private
export const logout = expressAsyncHandler(async (req, res) => {
  // 1) todo    get the user info from cookie
  res
    .status(200)
    .cookie("token", "", { expires: new Date(0) })
    .json({ message: "Logged out" });
  // 2) todo    destroy cookie and logout the user
});

// @desc    Forgot Password
// @route   POST    /api/auth/forgotpassword
// @access  Private
export const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetUrl = `${process.env.CLIENT_SIDE_URL}/forgotpassword/${resetToken}`;

  await sendEmail(
    email,
    "We sent a link to your email in order to reset your password",
    resetUrl,
  );

  res.status(200).json({
    success: true,
    message:
      "A link sent to your email please visit the link to reset your password",
  });
});

// @desc    Forgot Password
// @route   GET    /api/auth/forgotpassword/:resetToken
// @access  Private
export const resetPassword = expressAsyncHandler(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(404);
    throw new Error("Not found");
  }
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully!",
  });
});
