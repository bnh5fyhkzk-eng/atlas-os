import { createHmac, timingSafeEqual } from "crypto";

export function sign(secret: string): string {
  return createHmac("sha256", secret).update("atlas" + secret).digest("hex");
}

export function verify(cookie: string, secret: string): boolean {
  const expected = sign(secret);
  if (cookie.length !== expected.length) {
    return false;
  }
  return timingSafeEqual(Buffer.from(cookie), Buffer.from(expected));
}
