import path from 'path';
import type {
  IAssetDiscoveryService,
  IAssetUploaderService,
  IAssetDownloaderService,
  IAssetSearchService,
  CloudinaryManifest,
} from '../clodnary.interface.js';

export class AssetSyncOrchestrator {
  constructor(
    private discoveryService: IAssetDiscoveryService,
    private uploaderService: IAssetUploaderService,
    private downloaderService: IAssetDownloaderService,
    private searchService: IAssetSearchService,
  ) {}

  async push(studioDir: string, manifest: CloudinaryManifest): Promise<void> {
    console.info('Starting Cloudinary push synchronization...');

    const pushFolders = manifest.cloudnary.assets.push;
    console.info(`Found ${pushFolders.length} folders to synchronize:`, pushFolders);

    for (const folder of pushFolders) {
      const files = await this.discoveryService.discoverAssets(studioDir, folder);
      console.info(`Folder ${folder}: Found ${files.length} assets to synchronize.`);

      for (const file of files) {
        const filePath = path.join(studioDir, file);

        let publicIdPath = file;
        if (file.startsWith('src/') === true) {
          publicIdPath = file.substring(4);
        }

        const ext = path.extname(file).toLowerCase();
        const isImage =
          ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.tiff', '.bmp', '.ico'].includes(
            ext,
          ) === true;
        const isRaw = isImage === false;

        let publicId = `studio/${publicIdPath}`;
        if (isRaw === false) {
          const parsed = path.parse(publicIdPath);
          publicId = `studio/${parsed.dir === '' ? '' : parsed.dir + '/'}${parsed.name}`;
        }

        console.info(`Uploading ${file} as public ID: ${publicId} (isRaw: ${isRaw})...`);
        try {
          await this.uploaderService.uploadAsset(filePath, publicId, isRaw);
        } catch (error: unknown) {
          let message = '';
          if (error instanceof Error) {
            message = error.message;
          } else if (typeof error === 'object' && error !== null) {
            message = JSON.stringify(error);
          } else {
            message = String(error);
          }
          console.error(`Failed to upload ${file}:`, message);
        }
      }
    }
    console.info('Push synchronization completed.');
  }

  async pull(studioDir: string, manifest: CloudinaryManifest, cloudName: string): Promise<void> {
    console.info('Starting Cloudinary pull synchronization...');

    const pullFolders = manifest.cloudnary.assets.pull;
    console.info(`Found ${pullFolders.length} folders to download:`, pullFolders);

    for (const folder of pullFolders) {
      const cleanFolder = folder.replace(/^\//, '');
      const folderPrefix = `studio/${cleanFolder}`;

      console.info(`Querying Cloudinary files for folder: ${folderPrefix}...`);
      try {
        const assets = await this.searchService.listAssets(folderPrefix);
        console.info(`Folder ${folder}: Found ${assets.length} assets on Cloudinary.`);

        for (const asset of assets) {
          let publicIdWithExt = asset.publicId;
          if (asset.resourceType !== 'raw' && asset.format !== undefined) {
            const ext = `.${asset.format}`;
            if (publicIdWithExt.toLowerCase().endsWith(ext.toLowerCase()) === false) {
              publicIdWithExt = `${publicIdWithExt}${ext}`;
            }
          }

          // remove 'studio/' prefix (7 characters)
          const relativePath = publicIdWithExt.substring(7);
          const destinationPath = path.join(studioDir, 'src', relativePath);

          const deliveryPath = asset.resourceType === 'raw' ? 'raw/upload' : 'image/upload';
          const url = `https://res.cloudinary.com/${cloudName}/${deliveryPath}/${publicIdWithExt}`;

          console.info(`Downloading: ${url} -> ${destinationPath}`);
          try {
            await this.downloaderService.downloadAsset(url, destinationPath);
          } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(`Failed to download ${relativePath}:`, message);
          }
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Failed to list/sync folder ${folderPrefix}:`, message);
      }
    }
    console.info('Pull synchronization completed.');
  }
}
