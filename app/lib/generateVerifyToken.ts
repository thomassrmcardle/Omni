import { randomBytes } from "crypto";

export function generateVerifyToken() {
  return randomBytes(32).toString("hex");
}