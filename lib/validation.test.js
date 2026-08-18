import { describe, it, expect } from "vitest";
import {
  validateContactForm,
  isHoneypotTriggered,
  HONEYPOT_FIELD,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "./validation.js";

const VALID = {
  name: "Ananya Deshpande",
  email: "ananya@example.com",
  phone: "9876543210",
  message: "Hi, I would like to place a bulk order for a birthday party.",
};

describe("validateContactForm", () => {
  it("accepts a fully valid submission", () => {
    const result = validateContactForm(VALID);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("accepts an empty message (message is optional)", () => {
    const result = validateContactForm({ ...VALID, message: "" });
    expect(result.isValid).toBe(true);
    expect(result.errors.message).toBeUndefined();
    expect(result.values.message).toBe("");
  });

  it("rejects a missing name", () => {
    const result = validateContactForm({ ...VALID, name: "" });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("rejects an invalid email format", () => {
    const result = validateContactForm({ ...VALID, email: "not-an-email" });
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it("accepts a short message now that there is no minimum length", () => {
    const result = validateContactForm({ ...VALID, message: "too short" });
    expect(result.isValid).toBe(true);
  });

  it("rejects a message over the maximum length", () => {
    const result = validateContactForm({
      ...VALID,
      message: "a".repeat(MESSAGE_MAX_LENGTH + 1),
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.message).toBeDefined();
  });

  it("rejects a non-numeric phone number", () => {
    const result = validateContactForm({ ...VALID, phone: "abcdefg" });
    expect(result.isValid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it("rejects a too-short phone number", () => {
    const result = validateContactForm({ ...VALID, phone: "123" });
    expect(result.isValid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it("rejects a too-long phone number", () => {
    const result = validateContactForm({ ...VALID, phone: "98765432101" });
    expect(result.isValid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it("rejects a phone number with a +91 prefix", () => {
    const result = validateContactForm({ ...VALID, phone: "+919876543210" });
    expect(result.isValid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it("rejects a phone number containing spaces", () => {
    const result = validateContactForm({ ...VALID, phone: "98765 43210" });
    expect(result.isValid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it("rejects a phone number containing letters", () => {
    const result = validateContactForm({ ...VALID, phone: "98765abc10" });
    expect(result.isValid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it("accepts exactly 10 digits", () => {
    const result = validateContactForm({ ...VALID, phone: "9123456789" });
    expect(result.isValid).toBe(true);
  });

  it("rejects a name over the maximum length", () => {
    const result = validateContactForm({
      ...VALID,
      name: "a".repeat(NAME_MAX_LENGTH + 1),
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("rejects a name containing digits", () => {
    const result = validateContactForm({ ...VALID, name: "Test123" });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("trims values before returning them", () => {
    const result = validateContactForm({
      ...VALID,
      name: "  Ananya Deshpande  ",
    });
    expect(result.values.name).toBe("Ananya Deshpande");
  });

  it("treats non-string input as empty rather than throwing", () => {
    expect(() => validateContactForm({})).not.toThrow();
    const result = validateContactForm({});
    expect(result.isValid).toBe(false);
  });
});

describe("isHoneypotTriggered", () => {
  it("is false when the honeypot field is empty", () => {
    expect(isHoneypotTriggered({ [HONEYPOT_FIELD]: "" })).toBe(false);
  });

  it("is false when the honeypot field is absent", () => {
    expect(isHoneypotTriggered({})).toBe(false);
  });

  it("is true when the honeypot field has any value", () => {
    expect(isHoneypotTriggered({ [HONEYPOT_FIELD]: "http://spam.example" })).toBe(
      true
    );
  });

  it("is false when the honeypot field is only whitespace", () => {
    expect(isHoneypotTriggered({ [HONEYPOT_FIELD]: "   " })).toBe(false);
  });
});
