import { randomBytes } from "crypto";

export function generateObjectName({ originalName }: { originalName: string }) {
  return `${randomBytes(16).toString("hex")}${originalName}`;
}
