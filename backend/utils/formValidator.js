// Registration form validation
export function registerFormValidator(username, email, password, password2) {
  const errors = {};
  // username
  if (username.trim() === "") {
    errors.username = "username must not be empty";
  } else {
    const usernameRE = /^[a-zA-Z]/;
    if (!usernameRE.test(username)) {
      errors.username = "Insert a valid username";
    }
  }

  // email
  if (email.trim() === "") {
    errors.email = "email must not be empty";
  } else {
    const emailRE =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!emailRE.test(email)) {
      errors.email = "Please insert a valid email";
    }
  }

  // password
  if (password.trim() === "") {
    errors.password = "password must not be empty";
  } else {
    const passwordRE = /^[a-zA-Z0-9]{6,20}$/;
    if (!passwordRE.test(password.trim())) {
      errors.password = "Password must be between 6 to 20 character";
    }
  }

  // password2
  if (password2.trim() === "") {
    errors.confirmPassword = "confirm password must not be empty";
  } else if (password.trim() !== password2.trim()) {
    errors.password = "Password do not match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

// Login form validation
export function loginFormValidator(email, password) {
  const errors = {};

  // email
  if (email.trim() === "") {
    errors.email = "email must not be empty";
  } else {
    const emailRE =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!emailRE.test(email)) {
      errors.email = "Please insert a valid email";
    }
  }

  // password
  if (password.trim() === "") {
    errors.password = "password must not be empty";
  } else {
    const passwordRE = /^[a-zA-Z0-9]{6,20}$/;
    if (!passwordRE.test(password.trim())) {
      errors.password = "Password must be between 6 to 20 character";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

export function addProductFormValidator(
  name,
  price,
  category,
  qty,
  image,
  description
) {
  const errors = {};

  if (name.trim() === "") {
    errors.name = "Product name is required";
  } else {
    const nameRE = /^[a-zA-Z]/;
    if (!nameRE.test(name)) {
      errors.name = "Insert a valid name";
    }
  }

  if (price === "") {
    errors.price = "Price is required";
  } else {
    const priceRE = /^[0-9.]{1,8}$/;
    if (!priceRE.test(price)) {
      errors.price = "Insert a valid price";
    }
  }

  if (qty === "") {
    errors.qty = "Quantity is required";
  } else {
    const qtyRE = /^[0-9]/;
    if (!qtyRE.test(qty)) {
      errors.qty = "Insert a value quantity";
    }
  }

  if (category.trim() === "") {
    errors.category = "Category is required";
  } else {
    const categoryRE = /^[a-zA-Z]/;
    if (!categoryRE.test(category.trim())) {
      errors.category = "Insert a valid category";
    }
  }

  if (description.trim() === "") {
    errors.description = "description is required";
  } else {
    const descriptionRE = /^[a-zA-Z]/;
    if (!descriptionRE.test(description.trim())) {
      errors.description = "Insert a valid description";
    }
  }

  if (image.trim() === "") {
    errors.image = "Image is required";
  } else {
    const imgRE = /^.+\.(jpg|jpeg|png|gif|bmp|svg)$/gi;
    if (!imgRE.test(image.trim())) {
      errors.image = "Insert a valid image please!";
    }
  }

  return {
    valid: Object.keys(errors).length < 1,
    errors,
  };
}
