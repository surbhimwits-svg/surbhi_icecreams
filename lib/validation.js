// Shared between the contact form (client) and the /api/contact route (server)
// so validation rules can never drift out of sync between the two.

export const NAME_PATTERN = /^[A-Za-z][A-Za-z\s'.-]{1,99}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Exactly 10 digits, no country code, no spaces/dashes. Intentionally
// stricter than a general phone-number format: digits only, nothing else.
export const PHONE_PATTERN = /^\d{10}$/;

export const NAME_MAX_LENGTH = 100;
export const EMAIL_MAX_LENGTH = 150;
export const PHONE_MAX_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 2000;

// Strips everything but digits and caps at PHONE_MAX_LENGTH. Used by the
// phone input's onChange so non-digit characters can never be typed/pasted,
// rather than relying on validation to catch them after the fact.
export function sanitizePhoneInput(value) {
  return typeof value === "string" ? value.replace(/\D/g, "").slice(0, PHONE_MAX_LENGTH) : "";
}

// Must stay off-screen/invisible to sighted users but present in the DOM,
// so simple bots that auto-fill every field trip it while real users never
// see or touch it. Never render it with display:none — some bots skip
// fields hidden that way, so an off-screen absolute position is used instead.
export const HONEYPOT_FIELD = "company_website";

export function isHoneypotTriggered(body) {
  const value = body?.[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim() !== "";
}

export function validateContactForm({ name, email, phone, message }) {
  const errors = {};

  const trimmedName = typeof name === "string" ? name.trim() : "";
  if (!trimmedName) {
    errors.name = "Please enter your name.";
  } else if (trimmedName.length > NAME_MAX_LENGTH) {
    errors.name = `Name must be ${NAME_MAX_LENGTH} characters or fewer.`;
  } else if (!NAME_PATTERN.test(trimmedName)) {
    errors.name = "Name should only contain letters and be at least 2 characters.";
  }

  const trimmedEmail = typeof email === "string" ? email.trim() : "";
  if (!trimmedEmail) {
    errors.email = "Please enter your email address.";
  } else if (trimmedEmail.length > EMAIL_MAX_LENGTH) {
    errors.email = `Email must be ${EMAIL_MAX_LENGTH} characters or fewer.`;
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
  if (!trimmedPhone) {
    errors.phone = "Please enter your phone number.";
  } else if (!PHONE_PATTERN.test(trimmedPhone)) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  // Message is optional: an empty message is valid, but if one is provided
  // it still can't exceed the max length.
  const trimmedMessage = typeof message === "string" ? message.trim() : "";
  if (trimmedMessage.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`;
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    values: {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      message: trimmedMessage,
    },
  };
}
