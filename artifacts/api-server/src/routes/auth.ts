import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";
import { db, usersTable } from "@workspace/db";
import { hashPassword, verifyPassword } from "../lib/auth";
import { setSessionCookie, clearSessionCookie, getUserIdFromSession } from "../lib/session";

const router: IRouter = Router();

const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
  }

  const { username, email, password } = parsed.data;

  const existing = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existing.length > 0) {
    return res.status(409).json({ error: "An account with this email already exists" });
  }

  const { hash, salt } = hashPassword(password);

  const [user] = await db
    .insert(usersTable)
    .values({ username, email, passwordHash: hash, passwordSalt: salt })
    .returning({ id: usersTable.id, username: usersTable.username, email: usersTable.email });

  setSessionCookie(res, user.id);
  res.status(201).json({ user });
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const { email, password } = parsed.data;

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

  if (!user || !verifyPassword(password, user.passwordHash, user.passwordSalt)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  setSessionCookie(res, user.id);
  res.json({ user: { id: user.id, username: user.username, email: user.email } });
});

router.post("/logout", (req, res) => {
  clearSessionCookie(res);
  res.status(204).send();
});

router.get("/me", async (req, res) => {
  const userId = getUserIdFromSession(req);
  if (!userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const [user] = await db
    .select({ id: usersTable.id, username: usersTable.username, email: usersTable.email })
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  if (!user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  res.json({ user });
});

export default router;
