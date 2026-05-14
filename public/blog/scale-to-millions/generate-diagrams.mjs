#!/usr/bin/env node
// Run: node generate-diagrams.mjs
// Output: public/blog/scale-to-millions/*.svg
// Then rename .svg -> .png or use as <img src="*.svg" />

import fs from "fs";
import path from "path";

const outDir = "./public/blog/scale-to-millions";
fs.mkdirSync(outDir, { recursive: true });

const diagrams = {
  "fig1-single-server.svg": `<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
  <rect width="700" height="340" fill="#030712"/>
  <!-- User -->
  <rect x="40" y="130" width="100" height="80" rx="10" fill="#1f2937" stroke="#374151" stroke-width="1.5"/>
  <text x="90" y="168" fill="#9ca3af" font-size="12" text-anchor="middle">🌐</text>
  <text x="90" y="185" fill="#6b7280" font-size="11" text-anchor="middle">User / Browser</text>
  <!-- Arrow -->
  <line x1="140" y1="170" x2="240" y2="170" stroke="#374151" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="240,165 252,170 240,175" fill="#4b5563"/>
  <!-- Server box -->
  <rect x="252" y="80" width="196" height="180" rx="14" fill="#111827" stroke="#374151" stroke-width="1.5"/>
  <text x="350" y="108" fill="#4b5563" font-size="10" text-anchor="middle" letter-spacing="2">SINGLE SERVER</text>
  <rect x="272" y="120" width="156" height="36" rx="8" fill="#1f2937"/>
  <text x="350" y="143" fill="#9ca3af" font-size="11" text-anchor="middle">Web App</text>
  <rect x="272" y="164" width="156" height="36" rx="8" fill="#1f2937"/>
  <text x="350" y="187" fill="#9ca3af" font-size="11" text-anchor="middle">Database</text>
  <rect x="272" y="208" width="156" height="36" rx="8" fill="#1f2937"/>
  <text x="350" y="231" fill="#9ca3af" font-size="11" text-anchor="middle">Cache</text>
  <!-- DNS -->
  <rect x="490" y="60" width="160" height="60" rx="10" fill="#111827" stroke="#374151" stroke-width="1"/>
  <text x="570" y="87" fill="#6b7280" font-size="11" text-anchor="middle">DNS</text>
  <text x="570" y="107" fill="#4b5563" font-size="10" text-anchor="middle">api.mysite.com</text>
  <!-- IP label -->
  <text x="350" y="296" fill="#374151" font-size="10" text-anchor="middle">15.125.23.214</text>
</svg>`,

  "fig2-request-flow.svg": `<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
  <rect width="700" height="280" fill="#030712"/>
  <!-- Step boxes -->
  <g>
    <rect x="30" y="100" width="130" height="80" rx="10" fill="#111827" stroke="#374151" stroke-width="1.5"/>
    <text x="95" y="138" fill="#9ca3af" font-size="20" text-anchor="middle">👤</text>
    <text x="95" y="158" fill="#6b7280" font-size="11" text-anchor="middle">1. Browser</text>

    <line x1="160" y1="140" x2="210" y2="140" stroke="#374151" stroke-width="1.5" stroke-dasharray="5,3"/>
    <polygon points="210,135 222,140 210,145" fill="#4b5563"/>

    <rect x="222" y="100" width="120" height="80" rx="10" fill="#111827" stroke="#374151" stroke-width="1.5"/>
    <text x="282" y="135" fill="#6b7280" font-size="10" text-anchor="middle">2. DNS</text>
    <text x="282" y="153" fill="#4b5563" font-size="10" text-anchor="middle">resolve IP</text>

    <line x1="342" y1="140" x2="392" y2="140" stroke="#374151" stroke-width="1.5" stroke-dasharray="5,3"/>
    <polygon points="392,135 404,140 392,145" fill="#4b5563"/>

    <rect x="404" y="100" width="120" height="80" rx="10" fill="#111827" stroke="#374151" stroke-width="1.5"/>
    <text x="464" y="135" fill="#6b7280" font-size="10" text-anchor="middle">3. HTTP</text>
    <text x="464" y="153" fill="#4b5563" font-size="10" text-anchor="middle">request</text>

    <line x1="524" y1="140" x2="574" y2="140" stroke="#374151" stroke-width="1.5" stroke-dasharray="5,3"/>
    <polygon points="574,135 586,140 574,145" fill="#4b5563"/>

    <rect x="586" y="100" width="84" height="80" rx="10" fill="#111827" stroke="#374151" stroke-width="1.5"/>
    <text x="628" y="135" fill="#6b7280" font-size="10" text-anchor="middle">4. Server</text>
    <text x="628" y="153" fill="#4b5563" font-size="10" text-anchor="middle">response</text>
  </g>
</svg>`,

  "fig4-load-balancer.svg": `<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
  <rect width="700" height="340" fill="#030712"/>
  <!-- Users -->
  <rect x="20" y="120" width="100" height="70" rx="10" fill="#1f2937" stroke="#374151" stroke-width="1.5"/>
  <text x="70" y="152" fill="#9ca3af" font-size="18" text-anchor="middle">👥</text>
  <text x="70" y="172" fill="#6b7280" font-size="11" text-anchor="middle">Users</text>
  <!-- Arrow to LB -->
  <line x1="120" y1="155" x2="215" y2="155" stroke="#374151" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="215,150 227,155 215,160" fill="#4b5563"/>
  <!-- Load Balancer -->
  <rect x="227" y="110" width="130" height="90" rx="12" fill="#111827" stroke="#4b5563" stroke-width="2"/>
  <text x="292" y="148" fill="#9ca3af" font-size="12" text-anchor="middle">Load</text>
  <text x="292" y="168" fill="#9ca3af" font-size="12" text-anchor="middle">Balancer</text>
  <text x="292" y="188" fill="#374151" font-size="10" text-anchor="middle">Public IP</text>
  <!-- Arrows to servers -->
  <line x1="357" y1="135" x2="450" y2="110" stroke="#374151" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="444,106 456,108 450,120" fill="#4b5563"/>
  <line x1="357" y1="175" x2="450" y2="210" stroke="#374151" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="444,205 456,211 450,222" fill="#4b5563"/>
  <!-- Server 1 -->
  <rect x="456" y="60" width="130" height="80" rx="10" fill="#111827" stroke="#374151" stroke-width="1.5"/>
  <text x="521" y="95" fill="#9ca3af" font-size="11" text-anchor="middle">Server 1</text>
  <text x="521" y="112" fill="#4b5563" font-size="10" text-anchor="middle">Private IP</text>
  <!-- Server 2 -->
  <rect x="456" y="190" width="130" height="80" rx="10" fill="#111827" stroke="#374151" stroke-width="1.5"/>
  <text x="521" y="225" fill="#9ca3af" font-size="11" text-anchor="middle">Server 2</text>
  <text x="521" y="242" fill="#4b5563" font-size="10" text-anchor="middle">Private IP</text>
  <!-- Labels -->
  <text x="350" y="310" fill="#374151" font-size="10" text-anchor="middle">Failover + horizontal scaling enabled</text>
</svg>`,

  "fig5-db-replication.svg": `<svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
  <rect width="700" height="380" fill="#030712"/>
  <!-- Web Servers -->
  <rect x="250" y="20" width="200" height="70" rx="10" fill="#111827" stroke="#374151" stroke-width="1.5"/>
  <text x="350" y="60" fill="#9ca3af" font-size="12" text-anchor="middle">Web Servers</text>
  <!-- Arrows down -->
  <line x1="290" y1="90" x2="180" y2="160" stroke="#374151" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="176,156 185,165 194,158" fill="#4b5563"/>
  <line x1="400" y1="90" x2="490" y2="160" stroke="#374151" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="484,156 494,158 490,168" fill="#4b5563"/>
  <!-- Master DB -->
  <rect x="110" y="165" width="160" height="80" rx="10" fill="#1f2937" stroke="#6b7280" stroke-width="2"/>
  <text x="190" y="201" fill="#d1d5db" font-size="12" text-anchor="middle">Master DB</text>
  <text x="190" y="220" fill="#6b7280" font-size="10" text-anchor="middle">writes only</text>
  <!-- Slave DBs -->
  <rect x="420" y="165" width="130" height="70" rx="10" fill="#111827" stroke="#374151" stroke-width="1.5"/>
  <text x="485" y="198" fill="#9ca3af" font-size="11" text-anchor="middle">Slave DB 1</text>
  <text x="485" y="215" fill="#4b5563" font-size="10" text-anchor="middle">reads</text>
  <rect x="420" y="250" width="130" height="70" rx="10" fill="#111827" stroke="#374151" stroke-width="1.5"/>
  <text x="485" y="283" fill="#9ca3af" font-size="11" text-anchor="middle">Slave DB 2</text>
  <text x="485" y="300" fill="#4b5563" font-size="10" text-anchor="middle">reads</text>
  <!-- Replication arrows -->
  <line x1="270" y1="205" x2="420" y2="200" stroke="#4b5563" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="414,195 426,200 414,205" fill="#374151"/>
  <line x1="270" y1="215" x2="420" y2="285" stroke="#4b5563" stroke-width="1.5" stroke-dasharray="4,3"/>
  <polygon points="414,280 426,285 414,290" fill="#374151"/>
  <text x="350" y="360" fill="#374151" font-size="10" text-anchor="middle">DB Replication — better perf, reliability, high availability</text>
</svg>`,

  "fig-hero.svg": `<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
  <rect width="1200" height="600" fill="#030712"/>
  <!-- Grid pattern -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111827" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="600" fill="url(#grid)"/>
  <!-- Title -->
  <text x="600" y="120" fill="#1f2937" font-size="64" font-weight="bold" text-anchor="middle" letter-spacing="-2">0 → 1,000,000</text>
  <text x="600" y="175" fill="#4b5563" font-size="24" text-anchor="middle" letter-spacing="4">USERS</text>
  <!-- Flow: User → LB → Servers → DB/Cache → CDN -->
  <!-- User cluster -->
  <circle cx="80" cy="320" r="40" fill="#111827" stroke="#374151" stroke-width="2"/>
  <text x="80" y="325" fill="#6b7280" font-size="24" text-anchor="middle">👥</text>
  <text x="80" y="380" fill="#4b5563" font-size="12" text-anchor="middle">Users</text>
  <!-- Arrow -->
  <line x1="125" y1="320" x2="215" y2="320" stroke="#374151" stroke-width="2" stroke-dasharray="8,4"/>
  <polygon points="215,314 230,320 215,326" fill="#4b5563"/>
  <!-- CDN -->
  <rect x="230" y="285" width="120" height="70" rx="12" fill="#111827" stroke="#4b5563" stroke-width="1.5"/>
  <text x="290" y="316" fill="#9ca3af" font-size="13" text-anchor="middle">CDN</text>
  <text x="290" y="334" fill="#4b5563" font-size="10" text-anchor="middle">static assets</text>
  <!-- Arrow -->
  <line x1="350" y1="320" x2="430" y2="320" stroke="#374151" stroke-width="2" stroke-dasharray="8,4"/>
  <polygon points="430,314 445,320 430,326" fill="#4b5563"/>
  <!-- Load Balancer -->
  <rect x="445" y="285" width="120" height="70" rx="12" fill="#1f2937" stroke="#6b7280" stroke-width="2"/>
  <text x="505" y="316" fill="#d1d5db" font-size="13" text-anchor="middle">Load</text>
  <text x="505" y="333" fill="#d1d5db" font-size="13" text-anchor="middle">Balancer</text>
  <!-- Arrow -->
  <line x1="565" y1="290" x2="640" y2="245" stroke="#374151" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="635,240 647,244 641,255" fill="#4b5563"/>
  <line x1="565" y1="350" x2="640" y2="390" stroke="#374151" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="635,384 647,390 641,402" fill="#4b5563"/>
  <!-- Web servers -->
  <rect x="647" y="200" width="120" height="60" rx="10" fill="#111827" stroke="#374151" stroke-width="1.5"/>
  <text x="707" y="235" fill="#9ca3af" font-size="12" text-anchor="middle">Web Server 1</text>
  <rect x="647" y="380" width="120" height="60" rx="10" fill="#111827" stroke="#374151" stroke-width="1.5"/>
  <text x="707" y="415" fill="#9ca3af" font-size="12" text-anchor="middle">Web Server 2</text>
  <!-- Arrows to DB/Cache -->
  <line x1="767" y1="230" x2="840" y2="270" stroke="#374151" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="834,266 846,270 840,282" fill="#4b5563"/>
  <line x1="767" y1="410" x2="840" y2="370" stroke="#374151" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="834,364 846,370 840,382" fill="#4b5563"/>
  <!-- Cache -->
  <rect x="846" y="250" width="120" height="60" rx="10" fill="#111827" stroke="#374151" stroke-width="1.5"/>
  <text x="906" y="285" fill="#9ca3af" font-size="12" text-anchor="middle">Cache (Redis)</text>
  <!-- Arrow to Master DB -->
  <line x1="966" y1="280" x2="1030" y2="280" stroke="#374151" stroke-width="1.5" stroke-dasharray="6,3"/>
  <polygon points="1030,275 1042,280 1030,285" fill="#4b5563"/>
  <!-- Master DB -->
  <rect x="1042" y="240" width="130" height="80" rx="12" fill="#1f2937" stroke="#6b7280" stroke-width="2"/>
  <text x="1107" y="278" fill="#d1d5db" font-size="13" text-anchor="middle">Master DB</text>
  <text x="1107" y="296" fill="#6b7280" font-size="10" text-anchor="middle">+ Slave DBs</text>
  <!-- Bottom label -->
  <text x="600" y="555" fill="#1f2937" font-size="13" text-anchor="middle" letter-spacing="3">SYSTEM DESIGN ARCHITECTURE OVERVIEW</text>
</svg>`,
};

for (const [filename, content] of Object.entries(diagrams)) {
  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✓ Created: ${filePath}`);
}

console.log("\n✅ All diagrams generated!");
console.log(`📁 Location: ${outDir}/`);
console.log(
  "\nIn your blog post, reference them as:\n  src='/blog/scale-to-millions/fig1-single-server.svg'"
);
