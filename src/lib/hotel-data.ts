export const indicativeRates = [
  { platform: "Hotel Official Site", amount: 1495 },
  { platform: "EaseMyTrip", amount: 978 },
  { platform: "Goibibo", amount: 984 },
  { platform: "Tripadvisor", amount: 985 },
  { platform: "Cleartrip", amount: 1060 },
] as const;

export const roomCategories = [
  {
    name: "Deluxe Double Room — AC",
    detail: "Welcoming air-conditioned accommodation for your stay in Jammu.",
    image: "hotel-guest-room-01.webp",
  },
  {
    name: "Deluxe Double Room — Non-AC",
    detail: "A budget-conscious room choice for pilgrims and city travellers.",
    image: "hotel-guest-room-02.webp",
  },
  {
    name: "Super Deluxe Room",
    detail: "A comfortable room option with warm, wood-toned interiors.",
    image: "hotel-guest-room-03.webp",
  },
  {
    name: "Suite Room",
    detail: "An accommodation option for guests looking for extra room to settle in.",
    image: "hotel-lounge-seating.webp",
  },
  {
    name: "Deluxe Four-Bed Family Room",
    detail: "A room category created for families and group travellers.",
    image: "hotel-guest-room-03.webp",
  },
] as const;

export const hotelInformation = {
  name: "Hotel Novelty",
  address:
    "121, Raghunath Bazar, Prem Nagar, Resham Ghar Colony, Jammu, Jammu and Kashmir 180001, India",
  phone: "+91 96971 92471",
  telephoneHref: "+919697192471",
  whatsapp: "https://wa.me/919697192471",
  maps:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.3538385441902!2d74.86010361127994!3d32.72979387357431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e8485fe353f29%3A0x81b4b00532934f3b!2sHotel%20Novelty!5e0!3m2!1sen!2sin!4v1794732415129!5m2!1sen!2sin",
  mapsDirections: "https://www.google.com/maps/search/?api=1&query=Hotel+Novelty+Raghunath+Bazar+Jammu",
} as const;