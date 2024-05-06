import { z } from 'zod';
import { controlListSchema } from '@/common/schemas/control-list';

export const productSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  catalogCategory: z.string(),
  manufacturer: z.string(),
  productType: z.string(),
  controlList: z.array(controlListSchema),
});

export type Product = z.infer<typeof productSchema>;
