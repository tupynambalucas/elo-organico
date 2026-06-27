const fs = require('fs');

module.exports = function (source) {
  const urlParams = new URLSearchParams(this.resourceQuery);
  const original = urlParams.get('original');

  if (original === null || original === undefined) {
    return source;
  }

  // Example: "@elo-organico/studio/images/farmer.jpg" -> "images/farmer.jpg"
  const subPath = original.replace(/^@elo-organico\/studio\//, '');
  const firstSegment = subPath.split('/')[0];
  const folderKey = `/${firstSegment}`;

  // Load assets manifest
  const manifestPath = require.resolve('@elo-organico/studio/assets-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const buildFolders = manifest.bucket.assets.docs;

  const bucketUrl = process.env.BUCKET_URL;

  if (buildFolders.includes(folderKey) === true) {
    if (bucketUrl === undefined || bucketUrl === '') {
      throw new Error(
        `[Bucket Loader] BUCKET_URL environment variable is not defined for production build. Required for asset path: ${original}`,
      );
    }

    const url = `${bucketUrl.replace(/\/$/, '')}/${subPath}`;
    return `module.exports = ${JSON.stringify(url)};`;
  }

  return source;
};
