import { z } from 'zod';

export const controlListSchema = z.object({
  permittedActions: z
    .array(z.enum(['SELECT', 'INSERT', 'DELETE']))
    .min(1, 'At least 1 permitted actions is required.'),
  accessType: z.enum(['ROLE', 'GROUP', 'USER']),
  grantedTo: z.string().min(3, 'granted to field may not be empty.'),
});

export const productSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  controlList: z.array(controlListSchema).nonempty('At least 1 control entry is required.'),
});

export type ControlList = z.infer<typeof controlListSchema>;
export type Product = z.infer<typeof productSchema>;
