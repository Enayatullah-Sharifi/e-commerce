import nodemailer from "nodemailer";

export async function sendEmail(email, subject, text) {
  try {
    const transporter = await nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      service: process.env.EMAIL_SERVICE,
      secure: process.env.EMAIL_SECURE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
    });
  } catch (err) {
    console.log(err);
  }
}
