import { timingSafeEqual } from "crypto";

export function verifySession(cookie: string, secret: string): boolean {
  const cookieBuf = Buffer.from(cookie);
  const secretBuf = Buffer.from(secret);
  if (cookieBuf.length !== secretBuf.length) {
    return false;
  }
  return timingSafeEqual(cookieBuf, secretBuf);
}
