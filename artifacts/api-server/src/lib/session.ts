import { createHmac, timingSafeEqual } from "crypto";
import type { Request, Response } from "express";

const COOKIE_NAME = "session";
const SESSION_SECRET = process.env.SESSION_SECRET || "dev-secret-change-me";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function sign(value: string): string {
  const signature = createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
  return `${value}.${signature}`;
}

function unsign(signed: string): string | null {
  const lastDot = signed.lastIndexOf(".");
  if (lastDot === -1) return null;

  const value = signed.slice(0, lastDot);
  const signature = signed.slice(lastDot + 1);
  const expected = createHmac("sha256", SESSION_SECRET).update(value).digest("hex");

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (sigBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(sigBuffer, expectedBuffer)) return null;

  return value;
}

export function setSessionCookie(res: Response, userId: string): void {
  const signed = sign(userId);
  res.cookie(COOKIE_NAME, signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_MS,
  });
}

export function getUserIdFromSession(req: Request): string | null {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));

  if (!match) return null;

  const value = decodeURIComponent(match.slice(COOKIE_NAME.length + 1));
  return unsign(value);
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(COOKIE_NAME);
}
