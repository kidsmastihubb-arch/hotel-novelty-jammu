import { createServerFn } from "@tanstack/react-start";
import { bookingEnquirySchema } from "@/lib/booking-enquiries.schema";

export const submitBookingEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingEnquirySchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("booking_enquiries").insert({
        full_name: data.fullName,
        phone: data.phone,
        email: data.email || null,
        check_in: data.checkIn,
        check_out: data.checkOut,
        guests: data.guests,
        rooms: data.rooms,
        preferred_room: data.preferredRoom,
        message: data.message || null,
      });

      if (error) {
        console.error("Booking enquiry could not be saved:", error.code);
        return { success: false as const };
      }

      return { success: true as const };
    } catch {
      return { success: false as const };
    }
  });