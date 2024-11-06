import { z } from "zod";

export default z.object({
  categories: z.array(z.number()).min(1),
  author: z.string().trim().min(1),
  title: z.string().trim().min(1).max(24),
  description: z.string().trim().min(24).max(1024),
  price: z.number().min(0),
});
