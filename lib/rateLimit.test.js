import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, getClientIp, _resetRateLimitState } from "./rateLimit.js";

beforeEach(() => {
  _resetRateLimitState();
});

describe("checkRateLimit", () => {
  it("allows requests under the limit", () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit("1.2.3.4").allowed).toBe(true);
    }
  });

  it("blocks the request after the limit is exceeded", () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit("1.2.3.4");
    }
    const result = checkRateLimit("1.2.3.4");
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("tracks separate keys independently", () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit("1.2.3.4");
    }
    expect(checkRateLimit("1.2.3.4").allowed).toBe(false);
    expect(checkRateLimit("5.6.7.8").allowed).toBe(true);
  });
});

describe("getClientIp", () => {
  function requestWithHeaders(headers) {
    return { headers: new Headers(headers) };
  }

  it("reads the first address from x-forwarded-for", () => {
    const ip = getClientIp(
      requestWithHeaders({ "x-forwarded-for": "203.0.113.5, 10.0.0.1" })
    );
    expect(ip).toBe("203.0.113.5");
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", () => {
    const ip = getClientIp(requestWithHeaders({ "x-real-ip": "203.0.113.9" }));
    expect(ip).toBe("203.0.113.9");
  });

  it("returns 'unknown' when no IP headers are present", () => {
    const ip = getClientIp(requestWithHeaders({}));
    expect(ip).toBe("unknown");
  });
});
