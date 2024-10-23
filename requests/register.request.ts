import { z } from "zod";

export default z.object({
  name: z.string().trim().min(2).max(24),
  login: z.string().trim().min(2).max(24),
  password: z.string().trim().min(6).max(24),
});
