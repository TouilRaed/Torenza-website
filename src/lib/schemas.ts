import { z } from "zod";

export const CartItemSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  size: z.string().min(1),
  qty: z.number().int().min(1).max(20),
  image: z.string().min(1),
});

export const CustomerSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(8, "Enter a valid phone number")
    .regex(/^[0-9 +()-]+$/, "Only digits, spaces and + - ( )"),
  city: z.string().min(2, "Please pick your city"),
  address: z.string().min(5, "Full address is required"),
  notes: z.string().max(500).optional().or(z.literal("")),
});

export const OrderSchema = z.object({
  items: z.array(CartItemSchema).min(1, "Cart is empty"),
  customer: CustomerSchema,
  subtotal: z.number().nonnegative(),
  currency: z.string().default("DZD"),
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type Customer = z.infer<typeof CustomerSchema>;
export type Order = z.infer<typeof OrderSchema>;
