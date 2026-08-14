import { Resend } from "resend";
import { createSupabaseClient } from "@/lib/supabase/client";
import { validateContactForm, isHoneypotTriggered } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

function logEvent(level, event, details) {
  const line = { timestamp: new Date().toISOString(), level, event, ...details };
  console[level === "error" ? "error" : "log"](JSON.stringify(line));
}

export async function POST(request) {
  const ip = getClientIp(request);

  const { allowed, retryAfterSeconds } = checkRateLimit(ip);
  if (!allowed) {
    logEvent("warn", "contact.rate_limited", { ip, retryAfterSeconds });
    return Response.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    logEvent("warn", "contact.invalid_json", { ip });
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never see or fill in. Bots that
  // auto-fill every input trip it. Respond as if it succeeded so the bot
  // doesn't learn it was detected, but never save or email the submission.
  if (isHoneypotTriggered(body)) {
    logEvent("warn", "contact.honeypot_triggered", { ip });
    return Response.json({ success: true }, { status: 200 });
  }

  const { errors, isValid, values } = validateContactForm(body ?? {});
  if (!isValid) {
    logEvent("info", "contact.validation_failed", { ip, fields: Object.keys(errors) });
    const firstError = Object.values(errors)[0];
    return Response.json({ error: firstError, errors }, { status: 400 });
  }

  const supabase = createSupabaseClient();
  const { error: dbError } = await supabase.from("contact_messages").insert(values);

  if (dbError) {
    logEvent("error", "contact.db_insert_failed", {
      ip,
      code: dbError.code,
      message: dbError.message,
    });
    return Response.json(
      { error: "Failed to save your message. Please try again." },
      { status: 500 }
    );
  }

  logEvent("info", "contact.saved", { ip, email: values.email });

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error: emailError } = await resend.emails.send({
      from: `Surbhi Icecreams Website <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.ADMIN_NOTIFICATION_EMAIL,
      replyTo: values.email,
      subject: `New contact form message from ${values.name}`,
      text: `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\n\nMessage:\n${values.message}`,
    });

    if (emailError) {
      logEvent("error", "contact.email_failed", { ip, message: emailError.message });
    } else {
      logEvent("info", "contact.email_sent", { ip });
    }
  } catch (emailError) {
    logEvent("error", "contact.email_threw", { ip, message: emailError.message });
  }

  return Response.json({ success: true }, { status: 200 });
}
