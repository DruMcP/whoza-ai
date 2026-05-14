const sharp = require('sharp');
const fs = require('fs');

const icons = [
  'public/assets/icons/katie-icon.png',
  'public/assets/icons/mark-icon.png',
  'public/assets/icons/claire-icon.png',
  'public/assets/icons/rex-icon.png'
];

async function convert() {
  for (const icon of icons) {
    const webp = icon.replace('.png', '.webp');
    await sharp(icon)
      .webp({ quality: 85, effort: 6 })
      .toFile(webp);
    const origSize = fs.statSync(icon).size;
    const webpSize = fs.statSync(webp).size;
    const savings = ((origSize - webpSize) / origSize * 100).toFixed(1);
    console.log(`${icon} → ${webp} (${savings}% smaller)`);
  }
}

convert().catch(console.error);
