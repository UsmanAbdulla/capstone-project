(function () {
  "use strict";

  function trimValue(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function isValidEmail(email) {
    var trimmed = trimValue(email);
    if (!trimmed) {
      return false;
    }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(trimmed);
  }

  function isValidPassword(password) {
    return trimValue(password).length >= 8;
  }

  function validateLoginForm(email, password) {
    var trimmedEmail = trimValue(email);
    var trimmedPassword = trimValue(password);
    var errors = {
      email: "",
      password: "",
    };

    if (!trimmedEmail) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!trimmedPassword) {
      errors.password = "Password is required.";
    } else if (trimmedPassword.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    return {
      isValid: !errors.email && !errors.password,
      errors: errors,
      trimmedEmail: trimmedEmail,
      trimmedPassword: trimmedPassword,
    };
  }

  var validation = {
    trimValue: trimValue,
    isValidEmail: isValidEmail,
    isValidPassword: isValidPassword,
    validateLoginForm: validateLoginForm,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = validation;
    return;
  }

  var form = document.getElementById("login-form");
  if (!form) {
    return;
  }

  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("password");
  var emailError = document.getElementById("email-error");
  var passwordError = document.getElementById("password-error");
  var submitButton = document.getElementById("submit-button");

  var touched = {
    email: false,
    password: false,
  };

  function setFieldError(input, errorElement, message) {
    var hasError = Boolean(message);

    errorElement.textContent = message;
    input.setAttribute("aria-invalid", hasError ? "true" : "false");
    input.classList.toggle("input-invalid", hasError);
  }

  function updateSubmitButton(isValid) {
    submitButton.disabled = !isValid;
  }

  function renderValidation(result, showAllErrors) {
    var showEmailError = showAllErrors || touched.email;
    var showPasswordError = showAllErrors || touched.password;

    setFieldError(
      emailInput,
      emailError,
      showEmailError ? result.errors.email : ""
    );
    setFieldError(
      passwordInput,
      passwordError,
      showPasswordError ? result.errors.password : ""
    );
    updateSubmitButton(result.isValid);
  }

  function validateCurrentForm(showAllErrors) {
    var result = validateLoginForm(emailInput.value, passwordInput.value);
    renderValidation(result, showAllErrors);
    return result;
  }

  emailInput.addEventListener("input", function () {
    touched.email = true;
    validateCurrentForm(false);
  });

  passwordInput.addEventListener("input", function () {
    touched.password = true;
    validateCurrentForm(false);
  });

  emailInput.addEventListener("blur", function () {
    touched.email = true;
    validateCurrentForm(false);
  });

  passwordInput.addEventListener("blur", function () {
    touched.password = true;
    validateCurrentForm(false);
  });

  form.addEventListener("submit", function (event) {
    touched.email = true;
    touched.password = true;

    var result = validateCurrentForm(true);
    if (!result.isValid) {
      event.preventDefault();
      if (result.errors.email) {
        emailInput.focus();
      } else if (result.errors.password) {
        passwordInput.focus();
      }
      return;
    }

    event.preventDefault();
    emailInput.value = result.trimmedEmail;
    passwordInput.value = result.trimmedPassword;
    form.classList.add("login-form--success");
    submitButton.textContent = "Signed in";
    submitButton.disabled = true;
  });

  renderValidation(validateLoginForm("", ""), false);
})();
