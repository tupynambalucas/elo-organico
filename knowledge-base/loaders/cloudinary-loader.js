const path = require('path');
const fs = require('fs');

module.exports = function (source) {
  const urlParams = new URLSearchParams(this.resourceQuery);
  const original = urlParams.get('original');

  if (!original) {
    return source;
  }

  // original is e.g. "@elo-organico/studio/images/farmer.jpg"
  const subPath = original.replace(/^@elo-organico\/studio\//, '');
  const firstSegment = subPath.split('/')[0];
  const folderKey = `/${firstSegment}`;

  // Load manifest
  const manifestPath = require.resolve('@elo-organico/studio/assets-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const buildFolders = manifest.cloudnary.assets.build;

  const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || 'elo-organico';

  if (buildFolders.includes(folderKey)) {
    const ext = path.extname(subPath).toLowerCase();
    const isImage = [
      '.jpg',
      '.jpeg',
      '.png',
      '.webp',
      '.svg',
      '.gif',
      '.tiff',
      '.bmp',
      '.ico',
    ].includes(ext);
    const isRaw = !isImage;
    const deliveryPath = isRaw ? 'raw/upload' : 'image/upload';

    const url = `https://res.cloudinary.com/${cloudName}/${deliveryPath}/studio/${subPath}`;
    return `module.exports = ${JSON.stringify(url)};`;
  }

  return source;
};
