import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { loadCloudinaryConfig } from './config/env-config.js';
import { GlobAssetDiscoveryService } from './services/glob-discovery.service.js';
import { CloudinaryAssetUploaderService } from './services/cloudinary-uploader.service.js';
import { AxiosAssetDownloaderService } from './services/axios-downloader.service.js';
import { AssetSyncOrchestrator } from './application/sync.orchestrator.js';
import type { CloudinaryManifest } from './clodnary.interface.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const studioDir = path.resolve(__dirname, '..');
const manifestPath = path.resolve(studioDir, 'assets-manifest.json');

async function runPull(): Promise<void> {
  try {
    if (fs.existsSync(manifestPath) === false) {
      throw new Error(`Manifest not found at ${manifestPath}`);
    }
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent) as CloudinaryManifest;

    const config = loadCloudinaryConfig();
    const discovery = new GlobAssetDiscoveryService();
    const cloudService = new CloudinaryAssetUploaderService(config.cloudinaryUrl);
    const downloader = new AxiosAssetDownloaderService();

    const orchestrator = new AssetSyncOrchestrator(
      discovery,
      cloudService,
      downloader,
      cloudService,
    );
    await orchestrator.pull(studioDir, manifest, config.cloudName);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Fatal error during pull:', message);
    process.exit(1);
  }
}

void runPull();
