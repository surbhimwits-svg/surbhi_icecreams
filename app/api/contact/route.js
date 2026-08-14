import { Resend } from "resend";

const NAME_PATTERN = /^[A-Za-z][A-Za-z\s'.-]{1,49}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;

function validate({ name, email, phone, message }) {
  if (typeof name !== "string" || !NAME_PATTERN.test(name.trim())) {
    return "Invalid name.";
  }
  if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    return "Invalid email address.";
  }
  if (typeof phone !== "string" || !PHONE_PATTERN.test(phone.trim())) {
    return "Invalid phone number.";
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return "Message is too short.";
  }
  return null;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, message } = body ?? {};
  const validationError = validate({ name, email, phone, message });
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: `Surbhi Icecreams Website <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.ADMIN_NOTIFICATION_EMAIL,
      replyTo: email.trim(),
      subject: `New contact form message from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nPhone: ${phone.trim()}\n\nMessage:\n${message.trim()}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send message." }, { status: 502 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return Response.json({ error: "Failed to send message." }, { status: 500 });
  }
}
