ALTER TABLE public.booking_enquiries DROP CONSTRAINT booking_enquiries_guests_range;
ALTER TABLE public.booking_enquiries DROP CONSTRAINT booking_enquiries_rooms_range;
ALTER TABLE public.booking_enquiries ADD CONSTRAINT booking_enquiries_guests_positive CHECK (guests > 0);
ALTER TABLE public.booking_enquiries ADD CONSTRAINT booking_enquiries_rooms_positive CHECK (rooms > 0);