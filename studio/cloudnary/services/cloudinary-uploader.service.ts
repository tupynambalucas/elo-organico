import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import type { IAssetUploaderService, IAssetSearchService } from '../clodnary.interface.js';

interface CloudinarySearchResult {
  resources: Array<{
    public_id: string;
    format?: string;
    resource_type: string;
  }>;
}

export class CloudinaryAssetUploaderService implements IAssetUploaderService, IAssetSearchService {
  constructor(cloudinaryUrl: string) {
    const match = /^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/.exec(cloudinaryUrl);
    if (match !== null) {
      const [, apiKey, apiSecret, cloudName] = match;
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });
    } else {
      cloudinary.config({
        secure: true,
      });
    }
  }

  async uploadAsset(filePath: string, publicId: string, isRaw: boolean): Promise<string> {
    const resourceType = isRaw === true ? 'raw' : 'image';
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;

    if (fileSize > 10 * 1024 * 1024) {
      const result = (await cloudinary.uploader.upload_large(filePath, {
        public_id: publicId,
        resource_type: resourceType,
        chunk_size: 6000000,
        overwrite: true,
        invalidate: true,
      })) as any;
      return result.secure_url;
    }

    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: resourceType,
      overwrite: true,
      invalidate: true,
    });
    return result.secure_url;
  }

  async listAssets(
    folderPrefix: string,
  ): Promise<Array<{ publicId: string; format?: string; resourceType: string }>> {
    const result = (await cloudinary.search
      .expression(`folder:${folderPrefix}`)
      .max_results(500)
      .execute()) as CloudinarySearchResult;

    return result.resources.map((res) => ({
      publicId: res.public_id,
      format: res.format,
      resourceType: res.resource_type,
    }));
  }
}
