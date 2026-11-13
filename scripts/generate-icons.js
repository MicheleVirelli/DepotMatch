const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Modern SVG logo for DepotMatch: Shopping basket with price tag / barcode / trend arrow
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Background rounded rect -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />

  <!-- Accent glow border -->
  <rect x="8" y="8" width="496" height="496" rx="104" fill="none" stroke="url(#accentGrad)" stroke-width="4" stroke-opacity="0.4" />

  <!-- Shopping Cart / Scanner Base -->
  <g filter="url(#shadow)" transform="translate(40, 40)">
    <!-- Cart / Bag Basket Outline -->
    <path d="M 66 120 L 366 120 L 336 290 C 333 308, 318 322, 300 322 L 132 322 C 114 322, 99 308, 96 290 Z" 
          fill="url(#accentGrad)" />
    
    <!-- Basket Handles / Arc -->
    <path d="M 146 120 C 146 65, 286 65, 286 120" 
          fill="none" stroke="#ffffff" stroke-width="22" stroke-linecap="round" />

    <!-- Comparison Chart / Price trend bars inside basket -->
    <rect x="136" y="210" width="28" height="70" rx="8" fill="#ffffff" fill-opacity="0.95" />
    <rect x="180" y="170" width="28" height="110" rx="8" fill="#ffffff" fill-opacity="0.95" />
    <rect x="224" y="230" width="28" height="50" rx="8" fill="#ffffff" fill-opacity="0.95" />
    <rect x="268" y="150" width="28" height="130" rx="8" fill="url(#goldGrad)" />

    <!-- Trend line going up -->
    <path d="M 150 195 L 194 155 L 238 215 L 282 135" 
          fill="none" stroke="#fbbf24" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Trend arrow tip -->
    <polygon points="282,120 296,142 270,142" fill="#fbbf24" />
  </g>
</svg>
`;

fs.writeFileSync(path.join(iconsDir, 'icon.svg'), svgContent.trim());

async function run() {
  const svgBuffer = Buffer.from(svgContent);

  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(iconsDir, 'icon-192x192.png'));

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, 'icon-512x512.png'));

  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(iconsDir, 'apple-touch-icon.png'));

  console.log('Icons generated successfully!');
}

run().catch(console.error);
