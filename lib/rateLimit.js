// In-memory, per-process rate limiter. This is intentionally simple: it needs
// zero extra infrastructure (no Redis/Upstash) and is enough to stop casual
// bot floods against a low-traffic contact form.
//
// Known limitation: state is per server instance/process, not shared across
// serverless invocations or multiple instances. If this app is deployed to a
// multi-instance/serverless platform under real abuse, replace this with a
// durable shared store (e.g. Upstash Redis, Vercel KV) — the checkRateLimit
// call site below would not need to change, only this module's internals.

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_TRACKED_KEYS = 5000; // hard cap so the Map can't grow unbounded

const hits = new Map(); // key -> array of request timestamps (ms)

function prune(now) {
  for (const [key, timestamps] of hits) {
    const fresh = timestamps.filter((t) => now - t < WINDOW_MS);
    if (fresh.length === 0) {
      hits.delete(key);
    } else {
      hits.set(key, fresh);
    }
  }
}

export function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "unknown";
}

export function checkRateLimit(key) {
  const now = Date.now();

  if (hits.size > MAX_TRACKED_KEYS) {
    prune(now);
  }

  const timestamps = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterMs = WINDOW_MS - (now - timestamps[0]);
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return { allowed: true, retryAfterSeconds: 0 };
}

// Test-only: reset all in-memory state between test cases.
export function _resetRateLimitState() {
  hits.clear();
}
