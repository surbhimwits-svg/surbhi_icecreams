// Shared between the contact form (client) and the /api/contact route (server)
// so validation rules can never drift out of sync between the two.

export const NAME_PATTERN = /^[A-Za-z][A-Za-z\s'.-]{1,99}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts an optional +91 prefix and an optional single space/dash between
// the two 5-digit halves, matching the "+91 98765 43210" format shown as
// the form's own placeholder (as well as unformatted "9876543210").
export const PHONE_PATTERN = /^(?:\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

export const NAME_MAX_LENGTH = 100;
export const EMAIL_MAX_LENGTH = 150;
export const PHONE_MAX_LENGTH = 20;
export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 2000;

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
  } else if (trimmedPhone.length > PHONE_MAX_LENGTH) {
    errors.phone = `Phone number must be ${PHONE_MAX_LENGTH} characters or fewer.`;
  } else if (!PHONE_PATTERN.test(trimmedPhone)) {
    errors.phone = "Please enter a valid 10-digit Indian mobile number.";
  }

  const trimmedMessage = typeof message === "string" ? message.trim() : "";
  if (!trimmedMessage) {
    errors.message = "Please enter a message.";
  } else if (trimmedMessage.length < MESSAGE_MIN_LENGTH) {
    errors.message = `Message should be at least ${MESSAGE_MIN_LENGTH} characters.`;
  } else if (trimmedMessage.length > MESSAGE_MAX_LENGTH) {
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
