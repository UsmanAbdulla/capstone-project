const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const formMessage = document.getElementById("form-message");
const submitButton = form.querySelector(".submit-btn");

function setFieldError(input, errorElement, message) {
  if (message) {
    input.classList.add("invalid");
    errorElement.textContent = message;
    return false;
  }

  input.classList.remove("invalid");
  errorElement.textContent = "";
  return true;
}

function validateEmail(value) {
  if (!value.trim()) {
    return "Email is required.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Enter a valid email address.";
  }

  return "";
}

function validatePassword(value) {
  if (!value) {
    return "Password is required.";
  }

  if (value.length < 8) {
    return "Password must be at least 8 characters.";
  }

  return "";
}

function validateForm() {
  const emailMessage = validateEmail(emailInput.value);
  const passwordMessage = validatePassword(passwordInput.value);

  const emailValid = setFieldError(emailInput, emailError, emailMessage);
  const passwordValid = setFieldError(passwordInput, passwordError, passwordMessage);

  return emailValid && passwordValid;
}

function setFormMessage(message, type = "") {
  formMessage.textContent = message;
  formMessage.className = `form-message${type ? ` ${type}` : ""}`;
}

emailInput.addEventListener("input", () => {
  setFieldError(emailInput, emailError, validateEmail(emailInput.value));
});

passwordInput.addEventListener("input", () => {
  setFieldError(passwordInput, passwordError, validatePassword(passwordInput.value));
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setFormMessage("");

  if (!validateForm()) {
    setFormMessage("Please fix the errors above.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Signing in...";

  const payload = {
    email: emailInput.value.trim(),
    password: passwordInput.value,
    remember: document.getElementById("remember").checked,
  };

  try {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("Login attempt:", payload);
    setFormMessage("Signed in successfully.", "success");
  } catch {
    setFormMessage("Something went wrong. Please try again.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Sign in";
  }
});
