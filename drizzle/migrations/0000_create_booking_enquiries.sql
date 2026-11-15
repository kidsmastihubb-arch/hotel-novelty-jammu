CREATE TABLE public.booking_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL,
  rooms integer NOT NULL,
  preferred_room text NOT NULL,
  message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT booking_enquiries_name_length CHECK (char_length(full_name) BETWEEN 1 AND 100),
  CONSTRAINT booking_enquiries_phone_length CHECK (char_length(phone) BETWEEN 7 AND 20),
  CONSTRAINT booking_enquiries_email_length CHECK (email IS NULL OR char_length(email) <= 255),
  CONSTRAINT booking_enquiries_dates_order CHECK (check_out > check_in),
  CONSTRAINT booking_enquiries_guests_range CHECK (guests BETWEEN 1 AND 30),
  CONSTRAINT booking_enquiries_rooms_range CHECK (rooms BETWEEN 1 AND 10),
  CONSTRAINT booking_enquiries_room_category CHECK (preferred_room IN ('Deluxe Double Room – AC', 'Deluxe Double Room – Non-AC', 'Super Deluxe Room', 'Suite Room', 'Deluxe Four-Bed Family Room', 'No preference')),
  CONSTRAINT booking_enquiries_message_length CHECK (message IS NULL OR char_length(message) <= 2000)
);
GRANT ALL ON public.booking_enquiries TO service_role;
ALTER TABLE public.booking_enquiries ENABLE ROW LEVEL SECURITY;