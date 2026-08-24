/**
 * In-Memory Rate Limiter (MVP)
 *
 * Note: In a true serverless environment, this state will reset on cold starts
 * and will not be shared across separate worker instances. It is sufficient
 * for an MVP to deter basic abuse. For production at scale, swap this with
 * an external store like Upstash Redis.
 */

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitInfo>();

export interface RateLimitOptions {
  limit: number; // Number of requests allowed
  windowMs: number; // Time window in milliseconds
}

export const rateLimit = (
  identifier: string,
  action: string,
  options: RateLimitOptions
): { success: boolean; limit: number; remaining: number; reset: number } => {
  const now = Date.now();
  const key = `${action}:${identifier}`;

  const info = store.get(key) || { count: 0, resetTime: now + options.windowMs };

  // If the time window has passed, reset the count
  if (now > info.resetTime) {
    info.count = 0;
    info.resetTime = now + options.windowMs;
  }

  // Increment the request count
  info.count += 1;
  store.set(key, info);

  const remaining = Math.max(0, options.limit - info.count);
  const success = info.count <= options.limit;

  return {
    success,
    limit: options.limit,
    remaining,
    reset: info.resetTime,
  };
};

export const getClientIp = (headers: Headers): string => {
  return headers.get("x-forwarded-for")?.split(",")[0] || headers.get("x-real-ip") || "unknown-ip";
};
