export type Project = {
  title: string;
  description: string;
  bullets: string[];
  tech: string[];
  liveLink?: string;
  clientRepo?: string;
  serverRepo?: string;
  category: "fullstack" | "backend" | "api";
};

export const projects: Project[] = [
  {
    title: "Elite Property",
    description:
      "Full-Stack Property Management System with role-based access for Admins, Agents, and Users.",
    bullets: [
      "Developed a role-based access control (RBAC) system for Admins, Agents, and Users.",
      "Integrated Stripe API for secure payment processing and transaction management.",
      "Utilized TanStack Query for efficient data fetching, caching, and state synchronization.",
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Tailwind CSS",
      "Stripe",
      "TanStack Query",
    ],
    liveLink: "https://elite-property-8bf86.web.app/",
    clientRepo: "https://github.com/leon-dream1/elite-property",
    serverRepo: "https://github.com/leon-dream1/elite-property-server",
    category: "fullstack",
  },
  {
    title: "Choose Your Own Car",
    description:
      "Production-ready Car Marketplace REST API with real-time chat, payment gateway, and advanced caching.",
    bullets: [
      "Built with Modular Architecture, RBAC, and JWT authentication using Access + Refresh token strategy.",
      "Integrated Redis (Upstash) for OTP/session storage, sliding-window rate limiting, and 15x faster query caching.",
      "Real-time Buyer↔Seller chat via Socket.io with room-based messaging and typing indicators.",
      "Full Order & Payment flow with SSLCommerz and MongoDB Transactions ensuring atomic updates.",
    ],
    tech: [
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Socket.io",
      "Cloudinary",
      "SSLCommerz",
      "JWT",
      "Zod",
    ],
    liveLink: "https://choose-your-own-car-server.onrender.com/",
    clientRepo: "https://github.com/leon-dream1/choose-your-own-car-server",
    category: "backend",
  },
  {
    title: "ThoughtHub",
    description:
      "Scalable Blog API Backend built with Modular Pattern for maintainability.",
    bullets: [
      "Developed robust RESTful API using Modular Pattern for improved maintainability.",
      "Engineered advanced Search, Sort, and Filter using Mongoose query builders.",
      "Ensured high security with JWT authentication, Bcrypt hashing, and Zod validation.",
    ],
    tech: [
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Zod",
    ],
    liveLink: "https://thought-hub-a-blog-post-server.vercel.app/",
    clientRepo:
      "https://github.com/leon-dream1/ThoughtHub---A-Blog-Post-server",
    category: "api",
  },
  {
    title: "Hotello",
    description:
      "Hotel Booking Platform with real-time room availability and advanced filtering.",
    bullets: [
      "Built dynamic booking system with real-time room availability based on selected dates.",
      "Implemented advanced filtering by price range and user ratings.",
      "Managed secure user authentication and profile management using Firebase.",
    ],
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Tailwind CSS",
    ],
    liveLink: "https://travello-booking-room.web.app/",
    clientRepo: "https://github.com/leon-dream1/hotello-booking-system-client",
    serverRepo: "https://github.com/leon-dream1/hotello-booking-system-server",
    category: "fullstack",
  },
];
