import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function createAuthToken(address: string) {
  return jwt.sign({ address }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAuthToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { address: string };
  } catch {
    return null;
  }
}
