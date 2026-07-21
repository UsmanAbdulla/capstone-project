"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const {
  trimValue,
  isValidEmail,
  isValidPassword,
  validateLoginForm,
} = require("./login.js");

describe("trimValue", function () {
  it("trims leading and trailing whitespace", function () {
    assert.equal(trimValue("  user@example.com  "), "user@example.com");
    assert.equal(trimValue("  secret123  "), "secret123");
  });

  it("returns empty string for whitespace-only input", function () {
    assert.equal(trimValue("   "), "");
    assert.equal(trimValue("\t\n"), "");
  });
});

describe("validateLoginForm", function () {
  it("accepts a valid submission", function () {
    const result = validateLoginForm("user@example.com", "password123");

    assert.equal(result.isValid, true);
    assert.equal(result.errors.email, "");
    assert.equal(result.errors.password, "");
    assert.equal(result.trimmedEmail, "user@example.com");
    assert.equal(result.trimmedPassword, "password123");
  });

  it("rejects an invalid email format", function () {
    const result = validateLoginForm("not-an-email", "password123");

    assert.equal(result.isValid, false);
    assert.equal(result.errors.email, "Please enter a valid email address.");
    assert.equal(result.errors.password, "");
  });

  it("rejects a password shorter than 8 characters", function () {
    const result = validateLoginForm("user@example.com", "short");

    assert.equal(result.isValid, false);
    assert.equal(result.errors.email, "");
    assert.equal(
      result.errors.password,
      "Password must be at least 8 characters."
    );
  });

  it("rejects empty fields", function () {
    const result = validateLoginForm("", "");

    assert.equal(result.isValid, false);
    assert.equal(result.errors.email, "Email is required.");
    assert.equal(result.errors.password, "Password is required.");
  });

  it("rejects whitespace-only input", function () {
    const result = validateLoginForm("   ", "   ");

    assert.equal(result.isValid, false);
    assert.equal(result.errors.email, "Email is required.");
    assert.equal(result.errors.password, "Password is required.");
  });

  it("trims pasted values with surrounding spaces before validating", function () {
    const result = validateLoginForm(
      "  user@example.com  ",
      "  password123  "
    );

    assert.equal(result.isValid, true);
    assert.equal(result.trimmedEmail, "user@example.com");
    assert.equal(result.trimmedPassword, "password123");
  });
});

describe("field validators", function () {
  it("validates email format independently", function () {
    assert.equal(isValidEmail("user@example.com"), true);
    assert.equal(isValidEmail("bad-email"), false);
    assert.equal(isValidEmail("  user@example.com  "), true);
  });

  it("validates password length independently", function () {
    assert.equal(isValidPassword("12345678"), true);
    assert.equal(isValidPassword("1234567"), false);
    assert.equal(isValidPassword("  12345678  "), true);
  });
});
