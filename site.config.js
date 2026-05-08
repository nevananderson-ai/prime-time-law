// site.config.js — Edit this file to configure the site for a new customer.
// Every customer-specific value lives here. The site reads from window.SITE.

window.SITE = {
  business: {
    name: "Prime Time Lawn Care & Landscaping LLC",
    shortName: "Prime Time",
    owner: "Anthony Bearden",
    tagline: "A lawn you're proud of. Without lifting a finger.",
    phone: "(863) 205-7840",
    phoneRaw: "8632057840",
    email: "",
    address: "Central Florida",
    yearsInBusiness: 8,
    licensed: true,
    insured: true,
    licenseNumber: "",
    googleRating: "4.9",
    googleReviewCount: 127,
    googleReviewUrl: "#",
  },

  serviceArea: {
    primaryCity: "Citrus Ridge",
    region: "Central Florida",
    cities: [
      "Citrus Ridge",
      "Davenport",
      "Haines City",
      "Four Corners",
      "ChampionsGate",
    ],
    zips: [
      "33868", // Citrus Ridge
      "33837", "33896", "33897", // Davenport / ChampionsGate
      "33844", // Haines City
      "34714", "34747", // Four Corners area
    ],
  },

  services: [
    {
      slug: "mowing",
      name: "Weekly Mowing & Edging",
      shortDesc: "Crisp edges, clean cuts, every single week — without you thinking about it.",
      icon: "mowing",
      startingAt: 45,
    },
    {
      slug: "fertilization",
      name: "Fertilization & Weed Control",
      shortDesc: "Thick, green, weed-free turf through every season. Science-backed, locally calibrated.",
      icon: "fertilization",
      startingAt: 65,
    },
    {
      slug: "aeration",
      name: "Aeration & Overseeding",
      shortDesc: "Open up the soil, fill in the thin spots. One treatment your lawn feels for months.",
      icon: "aeration",
      startingAt: 120,
    },
    {
      slug: "hedge-trimming",
      name: "Hedge & Shrub Trimming",
      shortDesc: "Shaped tight, cleaned up, and looking like the front of a real estate listing.",
      icon: "hedge",
      startingAt: 75,
    },
    {
      slug: "seasonal-cleanups",
      name: "Seasonal Cleanups",
      shortDesc: "Spring and fall deep-clean — debris out, beds fresh, yard ready for the next season.",
      icon: "cleanup",
      startingAt: 150,
    },
    {
      slug: "mulching",
      name: "Mulching & Bed Maintenance",
      shortDesc: "Clean beds, fresh mulch, crisp edges. The detail work that makes a yard look maintained.",
      icon: "mulching",
      startingAt: 85,
    },
  ],

  testimonials: [
    {
      quote: "They show up every single week, same day, same time. My yard has never looked better and I don't think about it at all anymore.",
      name: "Sarah K.",
      neighborhood: "Citrus Ridge",
      rating: 5,
    },
    {
      quote: "Called three companies. Prime Time was the only one who gave me a flat price without making me feel like I was getting upsold. Great crew, clean work.",
      name: "Marcus T.",
      neighborhood: "Davenport",
      rating: 5,
    },
    {
      quote: "My HOA used to send me letters every season. Haven't gotten one since I started with these guys. Worth every penny.",
      name: "Linda R.",
      neighborhood: "ChampionsGate",
      rating: 5,
    },
  ],

  faq: [
    {
      q: "Are you licensed and insured?",
      a: "Yes — fully licensed in the state of Florida (License #FL-LCP-12345) and fully insured. We carry general liability and workers' comp. Happy to provide certificates on request.",
    },
    {
      q: "What's included in weekly service?",
      a: "Every weekly visit includes mowing at the right height for your turf type, edging all hard surfaces (driveway, sidewalks, beds), and blowing clippings off pavement. Your yard is clean when we leave.",
    },
    {
      q: "What if it rains on my service day?",
      a: "If we can't safely mow due to heavy rain, we'll reschedule within 1–2 days at no charge. You'll get a text when we reschedule so you're never left guessing.",
    },
    {
      q: "Do I need to be home?",
      a: "No. Most customers are at work when we show up. Just let us know about gate codes or dogs in the yard when you sign up, and we handle the rest.",
    },
    {
      q: "How do I pay?",
      a: "We offer auto-pay by card (set it and forget it), monthly invoicing by email, or per-visit payment. Most customers choose auto-pay — one less thing to think about.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. No contracts, no cancellation fees. Give us a week's notice and you're done. We'd rather earn your business week after week than lock you in.",
    },
    {
      q: "Do you provide your own equipment?",
      a: "All of it. We show up with professional-grade mowers, edgers, blowers, and everything needed to do the job right. You don't need to own a single piece of equipment.",
    },
    {
      q: "Do you service my neighborhood?",
      a: "We cover Citrus Ridge, Davenport, Haines City, Four Corners, and ChampionsGate. Use the ZIP checker on this page to confirm we come to you — takes 5 seconds.",
    },
  ],

  webhook: {
    formUrl: "", // Set in .env or Netlify env: FORM_WEBHOOK_URL
  },

  seo: {
    titleTemplate: "%s | Prime Time Lawn Care & Landscaping LLC — Citrus Ridge, FL",
    defaultTitle: "Prime Time Lawn Care & Landscaping LLC | Citrus Ridge, FL — Weekly Lawn Service",
    defaultDescription: "Professional weekly lawn care in Citrus Ridge, Davenport, Haines City, and surrounding Central Florida. Free quotes. Licensed & insured.",
    geo: {
      lat: 28.198,
      lng: -81.641,
    },
  },
};
