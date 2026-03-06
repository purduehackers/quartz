import { VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  cleanUrls: true,
  buildCommand: "bun run build",
};
