import { z } from "zod";

export const roomCategoryOptions = [
  "Deluxe Double Room – AC",
  "Deluxe Double Room – Non-AC",
  "Super Deluxe Room",
  "Suite Room",
  "Deluxe Four-Bed Family Room",
  "No preference",
] as const;

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date.");

export const bookingEnquirySchema = z
  .object({
    fullName: z.string().trim().min(1, "Enter your name.").max(100),
    phone: z
      .string()
      .trim()
      .min(7)
      .max(20)
      .regex(/^\+?[0-9\s()-]+$/, "Enter a valid phone number."),
    email: z.union([z.literal(""), z.string().trim().email().max(255)]),
    checkIn: dateString,
    checkOut: dateString,
    guests: z.number().int().positive(),
    rooms: z.number().int().positive(),
    preferredRoom: z.enum(roomCategoryOptions),
    message: z.string().trim().max(2000),
  })
  .refine(({ checkIn, checkOut }) => checkOut > checkIn, {
    message: "Check-out must be after check-in.",
    path: ["checkOut"],
  });

export type BookingEnquiryInput = z.infer<typeof bookingEnquirySchema>;