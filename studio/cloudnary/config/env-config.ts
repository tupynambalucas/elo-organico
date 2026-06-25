import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { CloudinaryConfig } from '../clodnary.interface.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadCloudinaryConfig(): CloudinaryConfig {
  const envPath = path.resolve(__dirname, '../.env');
  if (fs.existsSync(envPath) === true) {
    dotenv.config({ path: envPath });
  } else {
    const rootEnvPath = path.resolve(__dirname, '../../../../.env.dev');
    if (fs.existsSync(rootEnvPath) === true) {
      dotenv.config({ path: rootEnvPath });
    } else {
      dotenv.config();
    }
  }

  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (cloudinaryUrl === undefined || cloudinaryUrl === '') {
    throw new Error('Configuration Error: CLOUDINARY_URL is missing.');
  }

  let cloudName =
    process.env.VITE_CLOUDINARY_CLOUD_NAME ??
    process.env.CLOUDINARY_CLOUD_NAME ??
    process.env.CLOUDNARY_CLOUD_NAME;
  if (cloudName === undefined || cloudName === '') {
    try {
      const parsedUrl = new URL(cloudinaryUrl);
      cloudName = parsedUrl.hostname;
    } catch {
      const match = /@([^?#/\s]+)/.exec(cloudinaryUrl);
      if (match !== null) {
        cloudName = match[1];
      }
    }
  }

  if (cloudName === undefined || cloudName === '') {
    throw new Error('Configuration Error: Could not determine Cloudinary Cloud Name.');
  }

  return {
    cloudName,
    cloudinaryUrl,
  };
}
