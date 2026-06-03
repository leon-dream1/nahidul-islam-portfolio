import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LikeButton from "@/components/LikeButton";

export const metadata: Metadata = {
  title: "Scale From Zero To Millions Of Users | Nahidul Islam",
  description:
    "A deep dive into system design: how to build a system that starts with a single server and scales to serve millions of users.",
  openGraph: {
    title: "Scale From Zero To Millions Of Users",
    description:
      "System design principles: from single server to millions of users.",
    type: "article",
    publishedTime: "2025-05-14",
  },
};

// ── Inline SVG Diagrams ─────────────────────────────────────────────────────

function DiagramSingleServer() {
  return (
    <svg
      viewBox="0 0 700 260"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <rect
        width="700"
        height="260"
        fill="var(--bg-secondary, #0d1117)"
        rx="12"
      />
      {/* User */}
      <rect
        x="40"
        y="90"
        width="110"
        height="80"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="var(--border, #374151)"
        strokeWidth="1.5"
      />
      <text
        x="95"
        y="128"
        fill="#6b7280"
        fontSize="22"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        🌐
      </text>
      <text
        x="95"
        y="152"
        fill="#6b7280"
        fontSize="11"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Browser
      </text>
      {/* Arrow */}
      <line
        x1="150"
        y1="130"
        x2="220"
        y2="130"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="6,4"
      />
      <polygon points="220,125 234,130 220,135" fill="#4b5563" />
      {/* Server */}
      <rect
        x="234"
        y="50"
        width="220"
        height="160"
        rx="14"
        fill="var(--bg, #111827)"
        stroke="#4b5563"
        strokeWidth="1.5"
      />
      <text
        x="344"
        y="80"
        fill="#374151"
        fontSize="9"
        textAnchor="middle"
        fontFamily="monospace"
        letterSpacing="3"
      >
        SINGLE SERVER
      </text>
      <rect x="254" y="90" width="180" height="34" rx="7" fill="#1a2030" />
      <text
        x="344"
        y="112"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Web App
      </text>
      <rect x="254" y="132" width="180" height="34" rx="7" fill="#1a2030" />
      <text
        x="344"
        y="154"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Database
      </text>
      <rect x="254" y="174" width="180" height="26" rx="7" fill="#1a2030" />
      <text
        x="344"
        y="192"
        fill="#9ca3af"
        fontSize="11"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Cache
      </text>
      {/* DNS */}
      <rect
        x="510"
        y="60"
        width="160"
        height="60"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#1f2937"
        strokeWidth="1"
      />
      <text
        x="590"
        y="87"
        fill="#4b5563"
        fontSize="11"
        textAnchor="middle"
        fontFamily="monospace"
      >
        DNS
      </text>
      <text
        x="590"
        y="106"
        fill="#374151"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        api.mysite.com
      </text>
      {/* IP */}
      <text
        x="344"
        y="238"
        fill="#374151"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        IP: 15.125.23.214
      </text>
    </svg>
  );
}

function DiagramLoadBalancer() {
  return (
    <svg
      viewBox="0 0 700 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <rect
        width="700"
        height="300"
        fill="var(--bg-secondary, #0d1117)"
        rx="12"
      />
      {/* Users */}
      <rect
        x="20"
        y="110"
        width="100"
        height="80"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#1f2937"
        strokeWidth="1.5"
      />
      <text
        x="70"
        y="148"
        fill="#6b7280"
        fontSize="22"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        👥
      </text>
      <text
        x="70"
        y="170"
        fill="#6b7280"
        fontSize="11"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Users
      </text>
      {/* Arrow to LB */}
      <line
        x1="120"
        y1="150"
        x2="194"
        y2="150"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="6,4"
      />
      <polygon points="194,145 208,150 194,155" fill="#4b5563" />
      {/* Load Balancer */}
      <rect
        x="208"
        y="105"
        width="130"
        height="90"
        rx="12"
        fill="var(--bg, #111827)"
        stroke="#4b5563"
        strokeWidth="2"
      />
      <text
        x="273"
        y="145"
        fill="#d1d5db"
        fontSize="13"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Load
      </text>
      <text
        x="273"
        y="163"
        fill="#d1d5db"
        fontSize="13"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Balancer
      </text>
      <text
        x="273"
        y="182"
        fill="#374151"
        fontSize="9"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Public IP
      </text>
      {/* Arrows to servers */}
      <line
        x1="338"
        y1="132"
        x2="430"
        y2="100"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="6,4"
      />
      <polygon points="424,95 437,99 431,110" fill="#4b5563" />
      <line
        x1="338"
        y1="168"
        x2="430"
        y2="200"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="6,4"
      />
      <polygon points="424,195 437,200 431,211" fill="#4b5563" />
      {/* Server 1 */}
      <rect
        x="437"
        y="60"
        width="150"
        height="80"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="512"
        y="97"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Server 1
      </text>
      <text
        x="512"
        y="116"
        fill="#4b5563"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Private IP
      </text>
      {/* Server 2 */}
      <rect
        x="437"
        y="160"
        width="150"
        height="80"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="512"
        y="197"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Server 2
      </text>
      <text
        x="512"
        y="216"
        fill="#4b5563"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Private IP
      </text>
      {/* Note */}
      <text
        x="350"
        y="278"
        fill="#374151"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Failover + horizontal scaling enabled
      </text>
    </svg>
  );
}

function DiagramDBReplication() {
  return (
    <svg
      viewBox="0 0 700 360"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <rect
        width="700"
        height="360"
        fill="var(--bg-secondary, #0d1117)"
        rx="12"
      />
      {/* Web Servers */}
      <rect
        x="230"
        y="20"
        width="240"
        height="70"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="350"
        y="61"
        fill="#9ca3af"
        fontSize="13"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Web Servers
      </text>
      {/* Write arrow to master */}
      <line
        x1="300"
        y1="90"
        x2="190"
        y2="158"
        stroke="#4b5563"
        strokeWidth="1.5"
        strokeDasharray="6,4"
      />
      <polygon points="186,153 196,162 204,154" fill="#4b5563" />
      <text x="222" y="130" fill="#374151" fontSize="10" fontFamily="monospace">
        writes
      </text>
      {/* Read arrow to slaves */}
      <line
        x1="400"
        y1="90"
        x2="500"
        y2="158"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="6,4"
      />
      <polygon points="494,153 504,162 512,154" fill="#374151" />
      <text x="465" y="130" fill="#374151" fontSize="10" fontFamily="monospace">
        reads
      </text>
      {/* Master DB */}
      <rect
        x="100"
        y="160"
        width="180"
        height="80"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#6b7280"
        strokeWidth="2"
      />
      <text
        x="190"
        y="197"
        fill="#d1d5db"
        fontSize="13"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Master DB
      </text>
      <text
        x="190"
        y="218"
        fill="#6b7280"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        writes only
      </text>
      {/* Replication arrows */}
      <line
        x1="280"
        y1="200"
        x2="440"
        y2="185"
        stroke="#1f2937"
        strokeWidth="1.5"
        strokeDasharray="4,3"
      />
      <polygon points="434,180 446,184 440,195" fill="#374151" />
      <line
        x1="280"
        y1="215"
        x2="440"
        y2="255"
        stroke="#1f2937"
        strokeWidth="1.5"
        strokeDasharray="4,3"
      />
      <polygon points="434,250 446,255 440,266" fill="#374151" />
      {/* Slave DB 1 */}
      <rect
        x="446"
        y="155"
        width="200"
        height="65"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="546"
        y="186"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Slave DB 1
      </text>
      <text
        x="546"
        y="205"
        fill="#4b5563"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        reads only
      </text>
      {/* Slave DB 2 */}
      <rect
        x="446"
        y="238"
        width="200"
        height="65"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="546"
        y="269"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Slave DB 2
      </text>
      <text
        x="546"
        y="288"
        fill="#4b5563"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        reads only
      </text>
      <text
        x="350"
        y="340"
        fill="#374151"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Better performance · Reliability · High availability
      </text>
    </svg>
  );
}

function DiagramCacheCDN() {
  return (
    <svg
      viewBox="0 0 700 280"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <rect
        width="700"
        height="280"
        fill="var(--bg-secondary, #0d1117)"
        rx="12"
      />
      {/* User */}
      <rect
        x="20"
        y="100"
        width="90"
        height="80"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#1f2937"
        strokeWidth="1.5"
      />
      <text
        x="65"
        y="138"
        fill="#6b7280"
        fontSize="20"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        👤
      </text>
      <text
        x="65"
        y="160"
        fill="#6b7280"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        User
      </text>
      {/* Arrow to CDN */}
      <line
        x1="110"
        y1="140"
        x2="164"
        y2="140"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="164,135 176,140 164,145" fill="#4b5563" />
      {/* CDN */}
      <rect
        x="176"
        y="100"
        width="120"
        height="80"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="236"
        y="136"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        CDN
      </text>
      <text
        x="236"
        y="154"
        fill="#4b5563"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        static assets
      </text>
      {/* Arrow to Web Server */}
      <line
        x1="296"
        y1="140"
        x2="350"
        y2="140"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="350,135 362,140 350,145" fill="#4b5563" />
      {/* Web Server */}
      <rect
        x="362"
        y="100"
        width="120"
        height="80"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="422"
        y="136"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Web Server
      </text>
      {/* Arrow to Cache */}
      <line
        x1="482"
        y1="120"
        x2="546"
        y2="100"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="540,95 552,99 546,110" fill="#4b5563" />
      {/* Cache */}
      <rect
        x="552"
        y="60"
        width="120"
        height="65"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="612"
        y="90"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Cache
      </text>
      <text
        x="612"
        y="107"
        fill="#4b5563"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Redis / Memcached
      </text>
      {/* Arrow to DB */}
      <line
        x1="482"
        y1="160"
        x2="546"
        y2="180"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="540,175 552,180 546,191" fill="#4b5563" />
      {/* DB */}
      <rect
        x="552"
        y="160"
        width="120"
        height="65"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="612"
        y="190"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Database
      </text>
      <text
        x="612"
        y="208"
        fill="#4b5563"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Master + Slaves
      </text>
      {/* Labels */}
      <text
        x="236"
        y="205"
        fill="#374151"
        fontSize="9"
        textAnchor="middle"
        fontFamily="monospace"
      >
        edge server
      </text>
      <text
        x="612"
        y="250"
        fill="#374151"
        fontSize="9"
        textAnchor="middle"
        fontFamily="monospace"
      >
        cache miss → query DB
      </text>
    </svg>
  );
}

function DiagramStateless() {
  return (
    <svg
      viewBox="0 0 700 280"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <rect
        width="700"
        height="280"
        fill="var(--bg-secondary, #0d1117)"
        rx="12"
      />
      {/* Users */}
      <rect
        x="20"
        y="100"
        width="100"
        height="80"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#1f2937"
        strokeWidth="1.5"
      />
      <text
        x="70"
        y="138"
        fill="#6b7280"
        fontSize="20"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        👥
      </text>
      <text
        x="70"
        y="158"
        fill="#6b7280"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Any User
      </text>
      {/* Arrow */}
      <line
        x1="120"
        y1="140"
        x2="174"
        y2="140"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="174,135 186,140 174,145" fill="#4b5563" />
      {/* LB */}
      <rect
        x="186"
        y="105"
        width="110"
        height="70"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#4b5563"
        strokeWidth="2"
      />
      <text
        x="241"
        y="138"
        fill="#d1d5db"
        fontSize="11"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Load
      </text>
      <text
        x="241"
        y="156"
        fill="#d1d5db"
        fontSize="11"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Balancer
      </text>
      {/* Arrows to servers */}
      <line
        x1="296"
        y1="128"
        x2="364"
        y2="100"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="358,95 370,99 364,110" fill="#4b5563" />
      <line
        x1="296"
        y1="152"
        x2="364"
        y2="180"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="358,175 370,180 364,191" fill="#4b5563" />
      {/* Server 1 */}
      <rect
        x="370"
        y="65"
        width="130"
        height="60"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="435"
        y="99"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Server 1
      </text>
      {/* Server 2 */}
      <rect
        x="370"
        y="160"
        width="130"
        height="60"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="435"
        y="194"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Server 2
      </text>
      {/* Arrows to shared store */}
      <line
        x1="500"
        y1="95"
        x2="558"
        y2="120"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="552,115 564,120 558,131" fill="#4b5563" />
      <line
        x1="500"
        y1="190"
        x2="558"
        y2="160"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="552,155 564,160 558,171" fill="#4b5563" />
      {/* Shared state */}
      <rect
        x="564"
        y="100"
        width="116"
        height="80"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#6b7280"
        strokeWidth="2"
      />
      <text
        x="622"
        y="137"
        fill="#d1d5db"
        fontSize="11"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Shared
      </text>
      <text
        x="622"
        y="154"
        fill="#d1d5db"
        fontSize="11"
        textAnchor="middle"
        fontFamily="monospace"
      >
        State Store
      </text>
      <text
        x="622"
        y="170"
        fill="#4b5563"
        fontSize="9"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Redis / NoSQL
      </text>
      {/* Label */}
      <text
        x="350"
        y="256"
        fill="#374151"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Any server can handle any request — auto-scaling is easy
      </text>
    </svg>
  );
}

function DiagramMessageQueue() {
  return (
    <svg
      viewBox="0 0 700 240"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <rect
        width="700"
        height="240"
        fill="var(--bg-secondary, #0d1117)"
        rx="12"
      />
      {/* Producer */}
      <rect
        x="30"
        y="80"
        width="140"
        height="80"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="100"
        y="118"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Producer
      </text>
      <text
        x="100"
        y="136"
        fill="#4b5563"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Web Server
      </text>
      {/* Arrow */}
      <line
        x1="170"
        y1="120"
        x2="244"
        y2="120"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="6,4"
      />
      <polygon points="244,115 258,120 244,125" fill="#4b5563" />
      {/* Queue */}
      <rect
        x="258"
        y="70"
        width="184"
        height="100"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#4b5563"
        strokeWidth="2"
      />
      <text
        x="350"
        y="108"
        fill="#d1d5db"
        fontSize="13"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Message Queue
      </text>
      <rect x="276" y="118" width="30" height="28" rx="5" fill="#1a2030" />
      <rect x="312" y="118" width="30" height="28" rx="5" fill="#1a2030" />
      <rect x="348" y="118" width="30" height="28" rx="5" fill="#1a2030" />
      <rect x="384" y="118" width="30" height="28" rx="5" fill="#1a2030" />
      {/* Arrow */}
      <line
        x1="442"
        y1="120"
        x2="516"
        y2="120"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="6,4"
      />
      <polygon points="516,115 530,120 516,125" fill="#4b5563" />
      {/* Consumers */}
      <rect
        x="530"
        y="60"
        width="140"
        height="55"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="600"
        y="91"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Consumer 1
      </text>
      <rect
        x="530"
        y="125"
        width="140"
        height="55"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="600"
        y="156"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Consumer 2
      </text>
      {/* Labels */}
      <text
        x="350"
        y="218"
        fill="#374151"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Producer and consumer scale independently
      </text>
    </svg>
  );
}

function DiagramSharding() {
  return (
    <svg
      viewBox="0 0 700 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <rect
        width="700"
        height="300"
        fill="var(--bg-secondary, #0d1117)"
        rx="12"
      />
      {/* App */}
      <rect
        x="20"
        y="110"
        width="130"
        height="80"
        rx="10"
        fill="var(--bg, #111827)"
        stroke="#374151"
        strokeWidth="1.5"
      />
      <text
        x="85"
        y="148"
        fill="#9ca3af"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Application
      </text>
      <text
        x="85"
        y="165"
        fill="#374151"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        user_id % 4
      </text>
      {/* Arrows */}
      <line
        x1="150"
        y1="125"
        x2="240"
        y2="80"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="234,75 246,79 240,90" fill="#4b5563" />
      <line
        x1="150"
        y1="140"
        x2="240"
        y2="155"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="234,150 246,155 240,166" fill="#4b5563" />
      <line
        x1="150"
        y1="155"
        x2="240"
        y2="210"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="234,205 246,210 240,221" fill="#4b5563" />
      <line
        x1="150"
        y1="160"
        x2="240"
        y2="250"
        stroke="#374151"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <polygon points="234,245 246,250 240,261" fill="#4b5563" />
      {/* Shards */}
      {[
        { y: 48, label: "Shard 0", ids: "0, 4, 8, 12" },
        { y: 123, label: "Shard 1", ids: "1, 5, 9, 13" },
        { y: 178, label: "Shard 2", ids: "2, 6, 10, 14" },
        { y: 228, label: "Shard 3", ids: "3, 7, 11, 15" },
      ].map((shard) => (
        <g key={shard.label}>
          <rect
            x="246"
            y={shard.y}
            width="200"
            height="55"
            rx="10"
            fill="var(--bg, #111827)"
            stroke="#374151"
            strokeWidth="1.5"
          />
          <text
            x="346"
            y={shard.y + 28}
            fill="#9ca3af"
            fontSize="12"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {shard.label}
          </text>
          <text
            x="346"
            y={shard.y + 45}
            fill="#4b5563"
            fontSize="10"
            textAnchor="middle"
            fontFamily="monospace"
          >
            user_ids: {shard.ids}
          </text>
        </g>
      ))}
      {/* Hash label */}
      <text x="430" y="148" fill="#374151" fontSize="10" fontFamily="monospace">
        ← hash function
      </text>
      <text
        x="350"
        y="280"
        fill="#374151"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        Consistent sharding key = even data distribution
      </text>
    </svg>
  );
}

// ── Reusable Section Components ─────────────────────────────────────────────

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 pb-3 border-b border-[var(--border)]">
        {title}
      </h2>
      <div className="space-y-4 text-[var(--text-secondary)] text-sm leading-[1.85]">
        {children}
      </div>
    </section>
  );
}

function Diagram({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption: string;
}) {
  return (
    <figure className="my-8">
      <div className="rounded-xl overflow-hidden border border-[var(--border)]">
        {children}
      </div>
      <figcaption className="mt-2 text-center font-mono text-xs text-[var(--text-muted)]">
        {caption}
      </figcaption>
    </figure>
  );
}

function Callout({
  icon,
  title,
  children,
  variant = "default",
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  variant?: "default" | "warning" | "tip";
}) {
  const border =
    variant === "warning"
      ? "border-l-amber-600"
      : variant === "tip"
        ? "border-l-emerald-600"
        : "border-l-[var(--border-strong)]";

  return (
    <div
      className={`my-6 border border-[var(--border)] border-l-4 ${border} rounded-xl p-5 bg-[var(--bg-secondary)]`}
    >
      <p className="font-semibold text-[var(--text-primary)] text-sm mb-2 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </p>
      <div className="text-[var(--text-secondary)] text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function TableOfContents() {
  const items = [
    { id: "single-server", label: "Single Server Setup" },
    { id: "database", label: "Database" },
    { id: "load-balancer", label: "Load Balancer" },
    { id: "db-replication", label: "Database Replication" },
    { id: "cache-cdn", label: "Cache & CDN" },
    { id: "stateless", label: "Stateless Web Tier" },
    { id: "data-centers", label: "Data Centers" },
    { id: "message-queue", label: "Message Queue" },
    { id: "db-scaling", label: "Database Scaling" },
    { id: "summary", label: "Summary" },
  ];
  return (
    <nav className="sticky top-24 hidden xl:block">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
        On this page
      </p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function ScaleToMillionsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      {/* Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] mb-8">
            <Link
              href="/"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              ~/home
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              blog
            </Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">
              scale-to-millions
            </span>
          </div>

          {/* Tags + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {["System Design", "Backend", "Architecture"].map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--border)]"
              >
                {tag}
              </span>
            ))}
            <span className="text-[var(--border-strong)] text-xs">·</span>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              May 14, 2025
            </span>
            <span className="text-[var(--border-strong)] text-xs">·</span>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              15 min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-5 tracking-tight">
            Scale From Zero To Millions of Users
          </h1>

          <p className="text-[var(--text-secondary)] leading-relaxed text-base max-w-2xl">
            Designing a system that supports millions of users is challenging —
            a journey of continuous refinement. Here we build a system starting
            from a single server and gradually scale it to serve millions,
            learning key techniques along the way.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="xl:grid xl:grid-cols-[1fr_200px] xl:gap-16">
          <article>
            <Section id="single-server" title="Single Server Setup">
              <p>
                A journey of a thousand miles begins with a single step.
                Everything starts on one server — the web app, database, and
                cache all running together.
              </p>
              <Diagram caption="Figure 1 — single server setup">
                <DiagramSingleServer />
              </Diagram>
              <p>
                Users access the site via a domain name. DNS resolves it to an
                IP address, the browser sends an HTTP request, and the server
                returns HTML or JSON. Traffic comes from two sources: a{" "}
                <strong className="text-[var(--text-primary)]">web app</strong>{" "}
                (server-side logic + client HTML/JS) and a{" "}
                <strong className="text-[var(--text-primary)]">
                  mobile app
                </strong>{" "}
                (communicates via HTTP + JSON API).
              </p>
            </Section>

            <Section id="database" title="Database">
              <p>
                As the user base grows, we separate the web tier from the
                database tier so each can scale independently.
              </p>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6 mb-2">
                Relational vs Non-Relational
              </h3>
              <p>
                Relational databases (MySQL, PostgreSQL) store data in tables
                and support SQL joins — the default for 40+ years. NoSQL
                databases (Cassandra, DynamoDB) trade joins for massive scale,
                low latency, and flexible schemas.
              </p>
              <Callout icon="💡" title="When to choose NoSQL" variant="tip">
                <ul className="list-disc pl-4 space-y-1 mt-1">
                  <li>Your app requires super-low latency</li>
                  <li>Data is unstructured or has no relational shape</li>
                  <li>You only need to serialize/deserialize (JSON, YAML)</li>
                  <li>You need to store a massive amount of data</li>
                </ul>
              </Callout>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6 mb-2">
                Vertical vs Horizontal Scaling
              </h3>
              <p>
                <strong className="text-[var(--text-primary)]">
                  Vertical scaling
                </strong>{" "}
                (scale up) adds more CPU/RAM to an existing server — simple, but
                has a hard ceiling and no failover.{" "}
                <strong className="text-[var(--text-primary)]">
                  Horizontal scaling
                </strong>{" "}
                (scale out) adds more servers — more complex, but far more
                suitable for large-scale systems.
              </p>
            </Section>

            <Section id="load-balancer" title="Load Balancer">
              <p>
                A load balancer evenly distributes incoming traffic across web
                servers. Users connect to the load balancer&apos;s public IP;
                servers communicate via private IPs, making them unreachable
                directly from the internet.
              </p>
              <Diagram caption="Figure 4 — load balancer with two web servers">
                <DiagramLoadBalancer />
              </Diagram>
              <Callout icon="✅" title="What this solves" variant="tip">
                If Server 1 goes offline, all traffic routes to Server 2 — no
                downtime. When traffic spikes, just add more servers and the
                load balancer handles the rest automatically.
              </Callout>
            </Section>

            <Section id="db-replication" title="Database Replication">
              <p>
                The master/slave model: a{" "}
                <strong className="text-[var(--text-primary)]">
                  master database
                </strong>{" "}
                handles all writes; one or more{" "}
                <strong className="text-[var(--text-primary)]">
                  slave databases
                </strong>{" "}
                replicate from master and serve reads. Since most apps read far
                more than they write, this dramatically improves throughput.
              </p>
              <Diagram caption="Figure 5 — master DB with multiple slave DBs">
                <DiagramDBReplication />
              </Diagram>
              <p>
                Benefits: better performance (parallel reads), reliability (data
                is replicated across locations), and high availability (if one
                DB goes offline, others serve traffic).
              </p>
            </Section>

            <Section id="cache-cdn" title="Cache & CDN">
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                Cache
              </h3>
              <p>
                A cache stores expensive responses in memory so subsequent
                requests are served faster. The{" "}
                <strong className="text-[var(--text-primary)]">
                  read-through
                </strong>{" "}
                pattern: check cache first — if hit, serve it; if miss, query
                the DB, store in cache, then serve.
              </p>
              <Callout icon="⚠️" title="Cache considerations" variant="warning">
                <ul className="list-disc pl-4 space-y-1 mt-1">
                  <li>Use cache for data read often but modified rarely</li>
                  <li>
                    Set sensible expiry — too short = DB overload, too long =
                    stale data
                  </li>
                  <li>
                    Run multiple cache servers to avoid a single point of
                    failure
                  </li>
                  <li>LRU is the most common eviction policy</li>
                </ul>
              </Callout>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6 mb-2">
                Content Delivery Network (CDN)
              </h3>
              <p>
                A CDN is a network of geographically dispersed servers that
                cache and deliver static content (JS, CSS, images, video). When
                a user requests content, the edge server closest to them
                responds — dramatically reducing latency.
              </p>
              <Diagram caption="Figure 7 — cache + CDN architecture">
                <DiagramCacheCDN />
              </Diagram>
            </Section>

            <Section id="stateless" title="Stateless Web Tier">
              <p>
                To scale horizontally, session state must leave the web servers.
                A{" "}
                <strong className="text-[var(--text-primary)]">stateful</strong>{" "}
                server remembers client data between requests, forcing sticky
                sessions. A{" "}
                <strong className="text-[var(--text-primary)]">
                  stateless
                </strong>{" "}
                server reads session data from a shared store (Redis, NoSQL)
                that any server can access.
              </p>
              <Diagram caption="Figure 13 — stateless architecture">
                <DiagramStateless />
              </Diagram>
              <p>
                With stateless servers, auto-scaling becomes trivial: spin
                servers up or down based on traffic load without worrying about
                session affinity.
              </p>
            </Section>

            <Section id="data-centers" title="Data Centers">
              <p>
                To serve a global audience with low latency, run multiple
                geographically distributed data centers.{" "}
                <strong className="text-[var(--text-primary)]">GeoDNS</strong>{" "}
                routes users to the nearest data center. In a failure, 100% of
                traffic redirects to the healthy data center automatically.
              </p>
              <Callout icon="🌐" title="Key challenges" variant="default">
                <ul className="list-disc pl-4 space-y-1 mt-1">
                  <li>
                    <strong className="text-[var(--text-primary)]">
                      Traffic redirection
                    </strong>{" "}
                    — GeoDNS routes to nearest healthy center
                  </li>
                  <li>
                    <strong className="text-[var(--text-primary)]">
                      Data synchronization
                    </strong>{" "}
                    — async multi-region replication
                  </li>
                  <li>
                    <strong className="text-[var(--text-primary)]">
                      Consistent deployment
                    </strong>{" "}
                    — automated pipelines across all centers
                  </li>
                </ul>
              </Callout>
            </Section>

            <Section id="message-queue" title="Message Queue">
              <p>
                A message queue enables asynchronous communication between
                services.{" "}
                <strong className="text-[var(--text-primary)]">
                  Producers
                </strong>{" "}
                publish messages to the queue;{" "}
                <strong className="text-[var(--text-primary)]">
                  consumers
                </strong>{" "}
                pull and process them independently. This decoupling makes the
                system resilient and independently scalable.
              </p>
              <Diagram caption="Figure 17 — producer → queue → consumer">
                <DiagramMessageQueue />
              </Diagram>
              <p>
                Example: a photo-editing app publishes processing jobs to the
                queue. Worker nodes pick them up asynchronously. When the queue
                grows long, scale up workers; when it empties, scale them down.
              </p>
            </Section>

            <Section id="db-scaling" title="Database Scaling">
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                Vertical Scaling
              </h3>
              <p>
                Add more CPU/RAM/disk to the existing database. AWS RDS supports
                up to 24 TB RAM. But hardware limits exist, it creates a single
                point of failure, and powerful servers are expensive.
              </p>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6 mb-2">
                Horizontal Scaling — Sharding
              </h3>
              <p>
                Sharding splits the database into smaller shards. Each shard
                holds the same schema but a unique subset of data. A hash
                function (e.g.{" "}
                <code className="font-mono text-xs bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                  user_id % 4
                </code>
                ) routes queries to the correct shard.
              </p>
              <Diagram caption="Figure 21 — user data sharded across 4 nodes">
                <DiagramSharding />
              </Diagram>
              <Callout icon="⚠️" title="Sharding challenges" variant="warning">
                <ul className="list-disc pl-4 space-y-1 mt-1">
                  <li>
                    <strong className="text-[var(--text-primary)]">
                      Resharding
                    </strong>{" "}
                    — needed when a shard is exhausted; consistent hashing helps
                  </li>
                  <li>
                    <strong className="text-[var(--text-primary)]">
                      Hotspot problem
                    </strong>{" "}
                    — a single shard may receive disproportionate traffic
                  </li>
                  <li>
                    <strong className="text-[var(--text-primary)]">
                      Join complexity
                    </strong>{" "}
                    — cross-shard joins require denormalization
                  </li>
                </ul>
              </Callout>
            </Section>

            <Section id="summary" title="Summary">
              <p>
                Scaling is an iterative process. Here is the full playbook for
                scaling from a single server to millions of users:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  ["Keep web tier stateless", "Any server handles any request"],
                  [
                    "Build redundancy at every tier",
                    "No single point of failure",
                  ],
                  ["Cache data aggressively", "Reduce DB load and latency"],
                  ["Support multiple data centers", "Geo-routing and failover"],
                  [
                    "Host static assets in CDN",
                    "Serve from the edge, not origin",
                  ],
                  [
                    "Scale data tier by sharding",
                    "Distribute load across nodes",
                  ],
                  ["Use message queues", "Decouple services asynchronously"],
                  [
                    "Monitor and automate",
                    "Observability and CI/CD are non-negotiable",
                  ],
                ].map(([title, desc]) => (
                  <li
                    key={title}
                    className="flex gap-4 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]"
                  >
                    <span className="text-[var(--text-muted)] mt-0.5 font-mono text-sm">
                      →
                    </span>
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] text-sm">
                        {title}
                      </p>
                      <p className="text-[var(--text-muted)] text-xs mt-0.5">
                        {desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Source note */}
              <div className="mt-10 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
                <p className="font-mono text-xs text-[var(--text-muted)] leading-relaxed">
                  Based on concepts from{" "}
                  <em className="text-[var(--text-secondary)]">
                    System Design Interview
                  </em>{" "}
                  by Alex Xu. Part of my ongoing series on backend architecture
                  and distributed systems.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <LikeButton />
                <p className="text-xs text-[var(--text-muted)] sm:text-right">
                  If this post helped, tap the heart after reading.
                </p>
              </div>

              {/* Back to blog */}
              <div className="mt-10 pt-8 border-t border-[var(--border)]">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
                >
                  ← Back to all posts
                </Link>
              </div>
            </Section>
          </article>

          {/* TOC Sidebar */}
          <aside>
            <TableOfContents />
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
