import { useEffect, useState, type FormEvent, type LucideIcon } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BedDouble,
  BellRing,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ConciergeBell,
  CookingPot,
  Heart,
  Landmark,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  ParkingCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  UtensilsCrossed,
  Wifi,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  bookingEnquirySchema,
  roomCategoryOptions,
  type BookingEnquiryInput,
} from "@/lib/booking-enquiries.schema";
import { hotelInformation, indicativeRates, roomCategories } from "@/lib/hotel-data";
import { submitBookingEnquiry } from "@/lib/booking-enquiries.functions";
import templePhoto from "@/assets/raghunath-temple.webp";
import roomPhotoOne from "@/assets/hotel-guest-room-01.webp";
import roomPhotoTwo from "@/assets/hotel-guest-room-02.webp";
import roomPhotoThree from "@/assets/hotel-guest-room-03.webp";
import loungePhoto from "@/assets/hotel-lounge-seating.webp";
import lobbyPhoto from "@/assets/hotel-lobby-seating.webp";
import receptionPhotoOne from "@/assets/hotel-reception-01.webp";
import receptionPhotoTwo from "@/assets/hotel-reception-02.webp";
import receptionPhotoThree from "@/assets/hotel-reception-desk.webp";
import stairwellPhoto from "@/assets/hotel-stairwell.webp";

const roomPhotos: Record<(typeof roomCategories)[number]["image"], string> = {
  "hotel-guest-room-01.webp": roomPhotoOne,
  "hotel-guest-room-02.webp": roomPhotoTwo,
  "hotel-guest-room-03.webp": roomPhotoThree,
  "hotel-lounge-seating.webp": loungePhoto,
};

const heroSlides = [
  {
    eyebrow: "WELCOME TO JAMMU",
    title: "Your comfortable stay in the heart of Jammu.",
    description:
      "Warm hospitality, a welcoming place to rest, and the sights of Raghunath Bazar just outside.",
    action: "Discover the hotel",
    target: "about",
    image: receptionPhotoOne,
    alt: "Hotel Novelty reception in Raghunath Bazar, Jammu",
    chapter: "01 / A WARM WELCOME",
  },
  {
    eyebrow: "A ROOM FOR EVERY JOURNEY",
    title: "Find your own corner of comfort.",
    description:
      "Choose from welcoming room categories for pilgrims, families and travellers exploring Jammu.",
    action: "Explore our rooms",
    target: "rooms",
    image: roomPhotoOne,
    alt: "A guest room at Hotel Novelty in Jammu",
    chapter: "02 / REST EASY",
  },
  {
    eyebrow: "A CITY FULL OF FLAVOUR",
    title: "Good things are close at hand.",
    description:
      "Settle into a convenient stay with multi-cuisine dining and the market right around the corner.",
    action: "Dining at the hotel",
    target: "restaurant",
    image: undefined,
    alt: "",
    chapter: "03 / SAVOUR THE STAY",
  },
  {
    eyebrow: "RIGHT OPPOSITE THE TEMPLE",
    title: "Stay steps away from Raghunath Temple.",
    description:
      "Discover the historic heart of Jammu from a wonderfully central Raghunath Bazar address.",
    action: "See our location",
    target: "location",
    image: templePhoto,
    alt: "Shri Raghunath Temple opposite Hotel Novelty",
    chapter: "04 / EXPLORE JAMMU",
  },
] as const;

const amenities: { icon: LucideIcon; name: string }[] = [
  { icon: BedDouble, name: "Air-conditioned rooms" },
  { icon: Wifi, name: "Wi-Fi" },
  { icon: ParkingCircle, name: "On-site parking" },
  { icon: UtensilsCrossed, name: "Multi-cuisine restaurant" },
  { icon: ConciergeBell, name: "24-hour room service" },
  { icon: BellRing, name: "24-hour reception" },
  { icon: MapPin, name: "Travel desk" },
  { icon: Landmark, name: "Local sightseeing assistance" },
  { icon: Mountain, name: "Kashmir tour arrangements" },
  { icon: Heart, name: "Doctor on call" },
  { icon: Sparkles, name: "Attached bathrooms" },
  { icon: CookingPot, name: "Hot and cold running water" },
];

const galleryItems = [
  { name: "A warm welcome", category: "RECEPTION", image: receptionPhotoThree, alt: "Reception desk and welcoming entry at Hotel Novelty" },
  { name: "A comfortable room", category: "GUEST ROOMS", image: roomPhotoOne, alt: "Guest room with patterned bedding at Hotel Novelty" },
  { name: "A little space to unwind", category: "HOTEL INTERIORS", image: loungePhoto, alt: "Seating lounge at Hotel Novelty" },
  { name: "The heart of Raghunath Bazar", category: "JAMMU", image: templePhoto, alt: "The historic Shri Raghunath Temple facade in Jammu" },
  { name: "Room details", category: "DELUXE ROOMS", image: roomPhotoTwo, alt: "Air-conditioned guest room at Hotel Novelty" },
  { name: "Settle in comfortably", category: "GUEST ROOMS", image: roomPhotoThree, alt: "A warmly furnished guest room at Hotel Novelty" },
  { name: "The way in", category: "HOTEL INTERIORS", image: stairwellPhoto, alt: "Interior staircase within Hotel Novelty" },
  { name: "Reception, day and night", category: "RECEPTION", image: receptionPhotoTwo, alt: "Interior reception and staircase at Hotel Novelty" },
] as const;

const navItems = [
  { title: "About", target: "about" },
  { title: "Rooms", target: "rooms" },
  { title: "Restaurant", target: "restaurant" },
  { title: "Amenities", target: "amenities" },
  { title: "Gallery", target: "gallery" },
  { title: "Location", target: "location" },
  { title: "Contact", target: "contact" },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hotel Novelty Jammu | Stay Opposite Raghunath Temple" },
      {
        name: "description",
        content:
          "Discover Hotel Novelty, a centrally located budget hotel at Raghunath Bazar, Jammu. Explore room categories, amenities, indicative rates and booking enquiries.",
      },
      { property: "og:title", content: "Hotel Novelty Jammu | A Stay in the Heart of Raghunath Bazar" },
      {
        property: "og:description",
        content: "A centrally located hotel opposite Shri Raghunath Temple. Discover comfortable rooms and plan a stay in Jammu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hotel",
          name: hotelInformation.name,
          telephone: hotelInformation.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: "121, Raghunath Bazar, Prem Nagar, Resham Ghar Colony",
            addressLocality: "Jammu",
            addressRegion: "Jammu and Kashmir",
            postalCode: "180001",
            addressCountry: "IN",
          },
          description:
            "Centrally located accommodation opposite Shri Raghunath Temple in Raghunath Bazar, Jammu.",
          priceRange: "₹₹",
          checkinTime: "12:00",
          checkoutTime: "11:00",
          amenityFeature: amenities.map(({ name }) => ({
            "@type": "LocationFeatureSpecification",
            name,
            value: true,
          })),
        }),
      },
    ],
  }),
  component: HotelHomepage,
});

function HotelHomepage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("No preference");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showTop, setShowTop] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formNotice, setFormNotice] = useState("");
  const submitEnquiry = useServerFn(submitBookingEnquiry);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
      setShowTop(window.scrollY > 680);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((index) => (index + 1) % heroSlides.length), 7000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((index) => (index === null ? null : (index + 1) % galleryItems.length));
      if (event.key === "ArrowLeft") setLightboxIndex((index) => (index === null ? null : (index + galleryItems.length - 1) % galleryItems.length));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  async function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormNotice("");
    const formData = new FormData(event.currentTarget);
    const parsed = bookingEnquirySchema.safeParse({
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email") || "",
      checkIn: formData.get("checkIn"),
      checkOut: formData.get("checkOut"),
      guests: Number(formData.get("guests")),
      rooms: Number(formData.get("rooms")),
      preferredRoom: formData.get("preferredRoom"),
      message: formData.get("message") || "",
    });

    if (!parsed.success) {
      setFormNotice(parsed.error.issues[0]?.message ?? "Please check your booking enquiry details.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitEnquiry({ data: parsed.data });
      if (result.success) {
        event.currentTarget.reset();
        setSelectedRoom("No preference");
        setFormNotice("Your enquiry has been securely received. Please call the hotel directly for an immediate response.");
      } else {
        setFormNotice("We couldn't submit your enquiry just now. Please call or WhatsApp the hotel directly.");
      }
    } catch {
      setFormNotice("We couldn't submit your enquiry just now. Please call or WhatsApp the hotel directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const goToRoomEnquiry = (room: string) => {
    setSelectedRoom(room);
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };
  const moveSlide = (direction: number) => {
    setActiveSlide((index) => (index + direction + heroSlides.length) % heroSlides.length);
  };
  const localDate = new Date();
  const today = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, "0")}-${String(localDate.getDate()).padStart(2, "0")}`;

  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`hotel-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-shell">
          <a className="wordmark" href="#home" aria-label="Hotel Novelty, home">
            <span className="wordmark-mark">N<span>.</span></span>
            <span className="wordmark-copy"><strong>HOTEL NOVELTY</strong><small>JAMMU · INDIA</small></span>
          </a>
          <nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.target} href={`#${item.target}`} onClick={() => setMenuOpen(false)}>{item.title}</a>
            ))}
            <Button className="nav-book" asChild><a href="#booking">Book your stay <ArrowRight aria-hidden="true" /></a></Button>
          </nav>
          <Button className="mobile-menu-toggle" variant="ghost" size="icon" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Mobile navigation">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          {navItems.map((item) => <a key={item.target} href={`#${item.target}`} onClick={() => setMenuOpen(false)}>{item.title}</a>)}
          <Button asChild><a href="#booking" onClick={() => setMenuOpen(false)}>Book your stay <ArrowRight /></a></Button>
        </nav>
      </header>

      <section id="home" className="hero" aria-label="Welcome to Hotel Novelty">
        {heroSlides.map((slide, index) => (
          <div key={slide.eyebrow} className={`hero-slide ${index === activeSlide ? "is-active" : ""} ${!slide.image ? "hero-slide-dining" : ""}`} aria-hidden={index !== activeSlide}>
            {slide.image && <img className="hero-image" src={slide.image} alt={slide.alt} fetchPriority={index === 0 ? "high" : undefined} />}
            <div className="hero-shade" />
          </div>
        ))}
        <div id="main-content" className="hero-content shell">
          <div className="hero-caption" key={activeSlide}>
            <span className="eyebrow hero-eyebrow"><span />{heroSlides[activeSlide].eyebrow}</span>
            <h1>{heroSlides[activeSlide].title}</h1>
            <p>{heroSlides[activeSlide].description}</p>
            <Button variant="hero" asChild><a href={`#${heroSlides[activeSlide].target}`}>{heroSlides[activeSlide].action}<ArrowRight aria-hidden="true" /></a></Button>
          </div>
          <div className="hero-bottom">
            <a className="hero-scroll" href="#about"><span className="scroll-line" /><span>SCROLL TO DISCOVER</span><ArrowDown aria-hidden="true" /></a>
            <div className="hero-pagination" aria-label="Choose a featured slide">
              <span className="hero-chapter">{heroSlides[activeSlide].chapter}</span>
              <button aria-label="Previous slide" onClick={() => moveSlide(-1)}><ChevronLeft /></button>
              <span className="slide-count"><strong>0{activeSlide + 1}</strong> / 04</span>
              <button aria-label="Next slide" onClick={() => moveSlide(1)}><ChevronRight /></button>
              <div className="hero-dots" aria-hidden="true">
                {heroSlides.map((slide, index) => <span key={slide.eyebrow} className={index === activeSlide ? "is-active" : ""} />)}
              </div>
            </div>
          </div>
        </div>
        <a className="hero-side-label" href="#location">RAGHUNATH BAZAR · JAMMU, INDIA</a>
      </section>

      <section className="quick-facts" aria-label="At a glance">
        <div className="quick-facts-inner shell">
          <a className="fact-location" href="#location"><MapPin aria-hidden="true" /><span><small>RIGHT OPPOSITE</small><strong>Shri Raghunath Temple</strong></span></a>
          <span className="fact-divider" />
          <div className="fact"><Clock3 aria-hidden="true" /><span><small>FRONT DESK</small><strong>Open all day, every day</strong></span></div>
          <span className="fact-divider" />
          <a className="fact-rating" href="#reviews"><span className="fact-star"><Star aria-hidden="true" fill="currentColor" /></span><span><small>GOOGLE GUEST RATING</small><strong>3.4 <span>/ 5 · 320 reviews</span></strong></span></a>
          <a className="facts-book" href="#booking">Plan your visit <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section id="about" className="section about-section shell">
        <div className="about-layout">
          <div className="about-image-wrap" data-reveal>
            <img src={receptionPhotoTwo} alt="Hotel Novelty's hotel reception and welcoming interior in central Jammu" loading="lazy" />
            <span className="image-caption">IN THE HEART OF RAGHUNATH BAZAR <span>· JAMMU</span></span>
            <div className="about-stamp"><strong>STAY</strong><span>in the</span><strong>HEART</strong><span>of Jammu</span></div>
          </div>
          <div className="about-copy" data-reveal>
            <span className="eyebrow"><span className="eyebrow-index">01</span> A WELCOMING PLACE TO STAY</span>
            <h2>Welcome to<br /><em>Hotel Novelty,</em> Jammu.</h2>
            <p className="about-lead">The city outside. A comfortable place to return to.</p>
            <p>Hotel Novelty is a centrally located budget hotel in the heart of Jammu's Raghunath Bazar. Set opposite the historic Shri Raghunath Temple, the hotel offers a convenient base for pilgrims, families and travellers exploring Jammu's religious attractions and shopping destinations.</p>
            <p>With welcoming rooms, a multi-cuisine restaurant and reception open around the clock, make the most of your time in the city.</p>
            <div className="about-features">
              <div><Check /><span>Central Raghunath Bazar</span></div>
              <div><Check /><span>Opposite Shri Raghunath Temple</span></div>
              <div><Check /><span>24-hour reception</span></div>
              <div><Check /><span>Multi-cuisine dining</span></div>
            </div>
            <a className="text-link" href="#location">Find us in Jammu <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
        <div className="welcome-marquee" aria-hidden="true"><span>JAMMU, A LITTLE CLOSER</span><span>·</span><span>JAMMU, A LITTLE CLOSER</span><span>·</span><span>JAMMU, A LITTLE CLOSER</span></div>
      </section>

      <section id="rooms" className="section rooms-section">
        <div className="shell">
          <div className="section-heading rooms-heading" data-reveal>
            <div><span className="eyebrow"><span className="eyebrow-index">02</span> REST WELL, YOUR WAY</span><h2>Find the right room<br /><em>for your stay.</em></h2></div>
            <div className="section-aside"><p>From temple visits to family holidays, find a room category that suits your journey.</p><span className="room-category-note">5 ROOM CATEGORIES · ENQUIRE FOR CURRENT RATES</span></div>
          </div>
          <div className="rooms-grid">
            {roomCategories.map((room, index) => (
              <article className={`room-card ${index === 0 ? "room-featured" : ""}`} key={room.name} data-reveal>
                <button className="room-photo" aria-label={`View enquiry for ${room.name}`} onClick={() => goToRoomEnquiry(room.name)}>
                  <img src={roomPhotos[room.image]} alt={`Photograph of ${room.name} accommodation at Hotel Novelty`} loading="lazy" />
                  <span className="room-number">ROOM 0{index + 1}</span>
                  {index === 0 && <span className="room-ribbon">GUEST FAVOURITE</span>}
                </button>
                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p>{room.detail}</p>
                  <div className="room-facilities"><span><Check aria-hidden="true" /> Attached bathroom</span><span><Check aria-hidden="true" /> LCD TV · Intercom</span>{index !== 1 && <span><Check aria-hidden="true" /> Hot &amp; cold water</span>}</div>
                  <Button variant="room" onClick={() => goToRoomEnquiry(room.name)}>Ask about this room <ArrowRight aria-hidden="true" /></Button>
                </div>
              </article>
            ))}
          </div>

          <div className="rate-guide" data-reveal>
            <div className="rate-header"><span className="eyebrow">A HELPFUL GUIDE</span><h3>Compare before you book.</h3><p>Supplied platform comparison figures · not guaranteed offers.</p></div>
            <div className="rate-list">
              {indicativeRates.map((item) => <div className="rate-line" key={item.platform}><span>{item.platform}</span><strong>₹{item.amount.toLocaleString("en-IN")}</strong></div>)}
              <p className="rate-disclaimer">Rates are indicative and subject to availability, dates and applicable taxes. Contact the hotel for current rates.</p>
            </div>
            <div className="rate-cta"><span>Looking for today's price?</span><Button asChild><a href="#booking">Enquire for best rate <ArrowRight /></a></Button></div>
          </div>
        </div>
      </section>

      <section id="restaurant" className="restaurant-section">
        <div className="restaurant-visual" aria-hidden="true"><div className="dining-ornament"><span className="dining-ornament-ring" /><UtensilsCrossed /><span className="dining-word">MADE FOR THE MOMENT</span></div><div className="dining-border" /></div>
        <div className="restaurant-copy" data-reveal>
          <span className="eyebrow"><span className="eyebrow-index">03</span> GOOD FOOD, CLOSE BY</span>
          <h2>Delicious dining<br />at <em>Hotel Novelty.</em></h2>
          <p>Enjoy a welcoming multi-cuisine dining experience during your stay. Settle in after a full day of exploring and let the table bring you back together.</p>
          <div className="cuisine-list"><span>INDIAN</span><i /> <span>CHINESE</span><i /> <span>CONTINENTAL</span><i /> <span>LOCAL VEGETARIAN</span></div>
          <div className="dining-service"><Clock3 /><span><strong>A little extra, around the clock.</strong><small>24-hour room service</small></span></div>
          <Button variant="outline" asChild><a href={hotelInformation.whatsapp} target="_blank" rel="noreferrer">Enquire about dining <MessageCircle aria-hidden="true" /></a></Button>
        </div>
      </section>

      <section id="amenities" className="section amenities-section shell">
        <div className="section-heading amenities-heading" data-reveal>
          <div><span className="eyebrow"><span className="eyebrow-index">04</span> THE THOUGHTFUL EXTRAS</span><h2>What you need,<br /><em>within easy reach.</em></h2></div>
          <p className="section-aside">Every journey is different. Enjoy the convenience of facilities that make a city stay a little simpler.</p>
        </div>
        <div className="amenities-grid">
          {amenities.map(({ icon: Icon, name }, index) => <div className="amenity" key={name} data-reveal style={{ "--item-index": index } as React.CSSProperties}><span className="amenity-icon"><Icon aria-hidden="true" /></span><span>{name}</span><ArrowRight className="amenity-arrow" aria-hidden="true" /></div>)}
        </div>
      </section>

      <section id="jammu" className="explore-section">
        <div className="shell">
          <div className="explore-heading" data-reveal>
            <span className="eyebrow"><span className="eyebrow-index">05</span> OUTSIDE YOUR DOOR</span>
            <div><h2>Discover the culture<br />and heritage of <em>Jammu.</em></h2><p>From a morning temple visit to an afternoon in the bazar, the city is waiting to be discovered.</p></div>
          </div>
          <div className="explore-grid">
            <a className="attraction attraction-temple" href={hotelInformation.mapsDirections} target="_blank" rel="noreferrer" data-reveal>
              <img src={templePhoto} alt="Historic Shri Raghunath Temple directly opposite Hotel Novelty" loading="lazy" />
              <span className="attraction-number">01</span><span className="attraction-copy"><small>A SACRED LANDMARK</small><strong>Shri Raghunath Temple</strong><span>Directly opposite the hotel <ArrowRight /></span></span>
            </a>
            {[
              { num: "02", name: "Sri Ranbireshwar Temple", icon: Landmark, label: "A PROMINENT JAMMU TEMPLE" },
              { num: "03", name: "Mubarak Mandi Palace", icon: Sparkles, label: "JAMMU'S ARCHITECTURAL HERITAGE" },
              { num: "04", name: "Amar Mahal Palace", icon: Mountain, label: "A MUCH-LOVED HERITAGE SITE" },
              { num: "05", name: "Raghunath Bazar", icon: MapPin, label: "SHOPPING RIGHT OUTSIDE" },
              { num: "06", name: "Jammu General Bus Stand", icon: ArrowRight, label: "A CONVENIENT CITY CONNECTION" },
            ].map(({ num, name, icon: Icon, label }) => <a className="attraction attraction-text" key={num} href={hotelInformation.mapsDirections} target="_blank" rel="noreferrer" data-reveal><span className="attraction-number">{num}</span><Icon className="attraction-icon" /><span className="attraction-copy"><small>{label}</small><strong>{name}</strong><span>Explore the neighbourhood <ArrowRight /></span></span></a>)}
          </div>
          <p className="explore-footnote">Attractions shown without distances. Travel times vary by route and conditions.</p>
        </div>
      </section>

      <section className="why-section" aria-labelledby="why-title">
        <div className="why-photo"><img src={lobbyPhoto} alt="Warm, welcoming interior seating in Hotel Novelty" loading="lazy" /></div>
        <div className="why-content" data-reveal>
          <span className="eyebrow eyebrow-light"><span className="eyebrow-index">06</span> RIGHT HERE IN THE HEART OF THE CITY</span>
          <h2 id="why-title">A stay that makes<br />Jammu <em>easier.</em></h2>
          <div className="why-list">
            {[
              [MapPin, "Right in Raghunath Bazar", "Step out into a popular market in the heart of Jammu."],
              [Landmark, "Across from Raghunath Temple", "Spend more time experiencing the landmark close by."],
              [BedDouble, "A room for your kind of trip", "Explore five room categories for couples, families and groups."],
              [UtensilsCrossed, "Multi-cuisine dining", "Enjoy a restaurant and around-the-clock room service."],
              [Clock3, "A reception that never closes", "Front-desk assistance is available around the clock."],
              [Mountain, "Help discovering the region", "Ask about local sightseeing and Kashmir tour arrangements."],
            ].map(([icon, title, copy], index) => {
              const Icon = icon as LucideIcon;
              return <div className="why-item" key={title as string} style={{ "--item-index": index } as React.CSSProperties}><span><Icon aria-hidden="true" /></span><div><h3>{title as string}</h3><p>{copy as string}</p></div></div>;
            })}
          </div>
          <a className="why-link" href="#booking">Come and make yourself at home <ArrowRight /></a>
        </div>
      </section>

      <section id="gallery" className="section gallery-section shell">
        <div className="section-heading gallery-heading" data-reveal>
          <div><span className="eyebrow"><span className="eyebrow-index">07</span> A GLIMPSE OF YOUR STAY</span><h2>Come on in.<br /><em>Take a look around.</em></h2></div>
          <div className="gallery-meta"><span>PHOTOS OF HOTEL NOVELTY &amp; JAMMU</span><p>Bedrooms, welcoming spaces and the temple right across the street.</p></div>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <button className={`gallery-item gallery-item-${index + 1}`} key={item.name} onClick={() => setLightboxIndex(index)} data-reveal aria-label={`Open photograph: ${item.name}`}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span className="gallery-overlay"><small>{item.category}</small><strong>{item.name}</strong><span className="gallery-expand" aria-hidden="true"><ArrowRight /></span></span>
            </button>
          ))}
        </div>
      </section>

      <section id="reviews" className="reviews-section">
        <div className="shell">
          <div className="reviews-top" data-reveal>
            <div><span className="eyebrow"><span className="eyebrow-index">08</span> SHARED EXPERIENCES</span><h2>Real impressions.<br /><em>Shared openly.</em></h2><p>Guest ratings and feedback themes, shared with honesty.</p></div>
            <div className="review-score"><div><span className="review-number">3.4</span><span className="review-denominator">/ 5</span></div><span className="review-stars" aria-label="Rating 3.4 out of 5"><Star /><Star /><Star /><Star /><Star /></span><span className="review-count">GOOGLE RATING <span>·</span> 320 REVIEWS</span><span className="review-note">Rating and review count as provided.</span></div>
          </div>
          <div className="review-themes" data-reveal>
            <div className="theme-column liked"><span className="theme-symbol"><Heart aria-hidden="true" /></span><div><span className="theme-label">OFTEN APPRECIATED</span><h3>What guests enjoy.</h3></div><ul><li><Check /> A central Raghunath Bazar location</li><li><Check /> Close to Shri Raghunath Temple</li><li><Check /> Budget-friendly pricing</li><li><Check /> Helpful front-desk staff</li><li><Check /> Convenient access to shopping</li></ul></div>
            <span className="review-separator" />
            <div className="theme-column concerns"><span className="theme-symbol"><Sparkles aria-hidden="true" /></span><div><span className="theme-label">ALSO REPORTED</span><h3>Where experiences vary.</h3></div><ul><li><span className="theme-bullet" /> Older, compact rooms</li><li><span className="theme-bullet" /> Occasional cleanliness concerns</li><li><span className="theme-bullet" /> Bathroom maintenance</li><li><span className="theme-bullet" /> Wi-Fi performance</li><li><span className="theme-bullet" /> Power backup during outages</li></ul></div>
          </div>
          <p className="review-disclaimer">Guest feedback themes are shown as supplied. No individual guest quotations or names are reproduced here.</p>
        </div>
      </section>

      <section id="booking" className="booking-section">
        <div className="booking-backdrop" aria-hidden="true"><img src={receptionPhotoOne} alt="" loading="lazy" /></div>
        <div className="booking-inner shell">
          <div className="booking-intro" data-reveal>
            <span className="eyebrow eyebrow-light"><span className="eyebrow-index">09</span> MAKE YOUR PLANS</span>
            <h2>Plan your stay<br />at <em>Hotel Novelty.</em></h2>
            <p>Visiting for pilgrimage, shopping, business or a family trip? Share your dates and the hotel team can help with your accommodation enquiry.</p>
            <div className="booking-assurance"><ShieldCheck /><span><strong>An enquiry, never a booking promise.</strong><small>Availability and current rates are confirmed directly by the hotel.</small></span></div>
            <a className="booking-direct" href={`tel:${hotelInformation.telephoneHref}`}><Phone /><span>Prefer to speak directly?<strong>{hotelInformation.phone}</strong></span><ArrowRight /></a>
            <span className="booking-note">Reception open 24 hours · Check-in from 12:00 PM</span>
          </div>

          <form className="booking-form" onSubmit={handleBookingSubmit} data-reveal>
            <div className="form-heading"><span>YOUR JAMMU STAY</span><strong>A few details to get started.</strong></div>
            <div className="form-grid">
              <label>Full name <span>*</span><input name="fullName" required autoComplete="name" maxLength={100} placeholder="Your name" /></label>
              <label>Phone number <span>*</span><input name="phone" required type="tel" autoComplete="tel" minLength={7} maxLength={20} placeholder="+91" /></label>
              <label className="form-wide">Email address <small>OPTIONAL</small><input name="email" type="email" autoComplete="email" maxLength={255} placeholder="you@example.com" /></label>
              <label>Check-in <span>*</span><span className="input-icon"><CalendarDays /><input type="date" name="checkIn" required min={today} /></span></label>
              <label>Check-out <span>*</span><span className="input-icon"><CalendarDays /><input type="date" name="checkOut" required min={today} /></span></label>
              <label>Guests <span>*</span><input type="number" name="guests" required min={1} step={1} defaultValue={2} inputMode="numeric" /></label>
              <label>Rooms <span>*</span><input type="number" name="rooms" required min={1} step={1} defaultValue={1} inputMode="numeric" /></label>
              <label className="form-wide">Preferred room <span>*</span><select name="preferredRoom" value={selectedRoom} onChange={(event) => setSelectedRoom(event.target.value)}>{roomCategoryOptions.map((room) => <option value={room} key={room}>{room === "No preference" ? "No preference" : room.replace(" – ", " — ")}</option>)}</select></label>
              <label className="form-wide">Anything else to share?<textarea name="message" rows={3} maxLength={2000} placeholder="A note for the hotel (optional)" /></label>
            </div>
            <Button className="submit-enquiry" type="submit" disabled={submitting}>{submitting ? "Sending enquiry…" : "Send booking enquiry"}<ArrowRight aria-hidden="true" /></Button>
            <p className="form-feedback" role="status" aria-live="polite">{formNotice}</p>
            <p className="form-privacy">Your details are shared securely with the hotel for this enquiry.</p>
          </form>
        </div>
      </section>

      <section id="location" className="section location-section shell">
        <div className="location-copy" data-reveal>
          <span className="eyebrow"><span className="eyebrow-index">10</span> COME FIND US</span>
          <h2>At the heart<br />of <em>Raghunath Bazar.</em></h2>
          <p className="location-address"><MapPin aria-hidden="true" /><span>{hotelInformation.address}</span></p>
          <div className="location-hours"><div><Clock3 /><span><small>RECEPTION</small><strong>Open 24 hours</strong></span></div><div><CalendarDays /><span><small>CHECK-IN / CHECK-OUT</small><strong>12:00 PM / 11:00 AM</strong></span></div></div>
          <div className="location-actions"><Button asChild><a href={`tel:${hotelInformation.telephoneHref}`}><Phone />Call now</a></Button><Button variant="outline" asChild><a href={hotelInformation.whatsapp} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button><Button variant="outline" asChild><a href={hotelInformation.mapsDirections} target="_blank" rel="noreferrer"><MapPin />Get directions</a></Button></div>
        </div>
        <div className="map-wrap" data-reveal><iframe title="Map showing Hotel Novelty at Raghunath Bazar, Jammu" src={hotelInformation.maps} width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><a className="map-directions" href={hotelInformation.mapsDirections} target="_blank" rel="noreferrer">OPEN IN MAPS <ArrowRight /></a><span className="map-index">32°43′47″ N&nbsp; 74°51′36″ E</span></div>
      </section>

      <section id="contact" className="policies-section">
        <div className="shell policy-layout">
          <div className="policy-heading" data-reveal><span className="eyebrow"><span className="eyebrow-index">11</span> A FEW HELPFUL DETAILS</span><h2>Before you<br /><em>arrive.</em></h2><p>Good to know, so your time in Jammu goes smoothly.</p></div>
          <div className="policy-list" data-reveal>
            <div className="policy-item"><Clock3 /><div><strong>Check-in &amp; check-out</strong><span>Check-in from 12:00 PM · Check-out by 11:00 AM</span><small>Early check-in and late check-out are subject to availability.</small></div></div>
            <div className="policy-item"><Phone /><div><strong>Reception, all day</strong><span>Hotel reception is open 24 hours.</span></div></div>
            <div className="policy-item"><ShieldCheck /><div><strong>Guest identification</strong><span>Valid government-issued photo ID is mandatory for guests aged 18 and above.</span></div></div>
            <div className="policy-item"><Sparkles /><div><strong>A smoke-free, family-friendly stay</strong><span>The property is smoke-free and kid-friendly.</span></div></div>
            <div className="policy-item"><Heart /><div><strong>Travelling with pets?</strong><span>Pets are not allowed at the property.</span></div></div>
          </div>
        </div>
      </section>

      <footer className="hotel-footer">
        <div className="footer-main shell">
          <div className="footer-brand"><a className="wordmark wordmark-footer" href="#home"><span className="wordmark-mark">N<span>.</span></span><span className="wordmark-copy"><strong>HOTEL NOVELTY</strong><small>JAMMU · INDIA</small></span></a><p>A comfortable, centrally located stay across from Shri Raghunath Temple, in the heart of Jammu.</p><a className="footer-phone" href={`tel:${hotelInformation.telephoneHref}`}><Phone />{hotelInformation.phone}</a></div>
          <div className="footer-nav"><span>EXPLORE</span><div>{navItems.map((item) => <a href={`#${item.target}`} key={item.target}>{item.title}<ArrowRight /></a>)}</div></div>
          <div className="footer-visit"><span>COME BY &amp; SAY HELLO</span><p>{hotelInformation.address}</p><a href={hotelInformation.mapsDirections} target="_blank" rel="noreferrer">Get directions <ArrowRight /></a><a href={hotelInformation.whatsapp} target="_blank" rel="noreferrer">Message us on WhatsApp <ArrowRight /></a><Button asChild><a href="#booking">Plan your stay <ArrowRight /></a></Button></div>
        </div>
        <div className="footer-bottom shell"><span>© {new Date().getFullYear()} HOTEL NOVELTY · JAMMU</span><strong>Stay comfortable. Explore Jammu. Experience hospitality.</strong><a href="#home">BACK TO TOP <ArrowUp /></a></div>
      </footer>

      {lightboxIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Hotel Novelty photo gallery" onClick={() => setLightboxIndex(null)} onKeyDown={(event) => { if (event.key === "Escape") setLightboxIndex(null); }}>
          <Button className="lightbox-close" variant="ghost" size="icon" aria-label="Close gallery" onClick={() => setLightboxIndex(null)}><X /></Button>
          <Button className="lightbox-prev" variant="ghost" size="icon" aria-label="Previous photograph" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex + galleryItems.length - 1) % galleryItems.length); }}><ChevronLeft /></Button>
          <figure className="lightbox-image" onClick={(event) => event.stopPropagation()}><img src={galleryItems[lightboxIndex].image} alt={galleryItems[lightboxIndex].alt} /><figcaption><span>{galleryItems[lightboxIndex].category}</span><strong>{galleryItems[lightboxIndex].name}</strong><small>0{lightboxIndex + 1} / 0{galleryItems.length}</small></figcaption></figure>
          <Button className="lightbox-next" variant="ghost" size="icon" aria-label="Next photograph" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % galleryItems.length); }}><ChevronRight /></Button>
        </div>
      )}
      {showTop && <Button className="back-to-top" variant="secondary" size="icon" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp aria-hidden="true" /></Button>}
    </main>
  );
}