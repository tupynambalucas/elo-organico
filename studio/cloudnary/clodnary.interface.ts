export interface CloudinaryConfig {
  cloudName: string;
  cloudinaryUrl: string;
}

export interface CloudinaryManifest {
  cloudnary: {
    assets: {
      push: string[];
      pull: string[];
      build: string[];
    };
  };
}

export interface IAssetDiscoveryService {
  discoverAssets(studioDir: string, folder: string): Promise<string[]>;
}

export interface IAssetUploaderService {
  uploadAsset(filePath: string, publicId: string, isRaw: boolean): Promise<string>;
}

export interface IAssetSearchService {
  listAssets(
    folderPrefix: string,
  ): Promise<Array<{ publicId: string; format?: string; resourceType: string }>>;
}

export interface IAssetDownloaderService {
  downloadAsset(url: string, destinationPath: string): Promise<void>;
}
