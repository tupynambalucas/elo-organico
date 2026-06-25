# Cloudflare R2 Asset Migration & CDN Deployment Plan

This document establishes the architecture design, integration codebase, and deployment procedures to transition the static asset management of **Elo Orgânico** from Cloudinary to Cloudflare R2, employing a professional custom domain strategy and a development-first execution pipeline.

---

## 1. Architectural & Domain Strategy

To establish a production-grade static asset CDN, we deploy a hybrid strategy optimized for instant local testing and highly optimized edge-delivery in cloud environments:

```mermaid
graph TD
    direction TD

    subgraph LocalDev["Phase 1: Local Development (Instant, Domain-Free)"]
        LocalHost["Host Computer (localhost:5173)"]
        S3_API["Direct S3 API endpoint (*.r2.cloudflarestorage.com)"]
        R2_DevURL["Temporary Public URL (*.r2.dev)"]
    end

    subgraph PublicCloud["Phase 2: Cloud CDN (Secure, High Performance)"]
        CustomDomain["Custom Domain (e.g., assets.elo-organico.link)"]
        CF_DNS["Cloudflare DNS (Proxy & SSL)"]
        R2Bucket[("Cloudflare R2 Bucket (10GB Free Storage)")]
    end

    subgraph Clients["Downstream Client Apps"]
        ViteApp["Vite App (Instance / Portal)"]
        Docusaurus["Docusaurus Knowledge Base"]
    end

    LocalHost -->|Upload/Download S3 API| S3_API
    S3_API --> R2Bucket
    R2_DevURL -->|Resolve Assets (Dev Mode)*| LocalHost

    CustomDomain -->|Nameserver Delegation| CF_DNS
    CF_DNS -->|Public Domain CNAME Routing| R2Bucket

    R2Bucket -->|Deploy Assets via Edge CDN| Clients
    Clients -->|Production/Staging Resolution| CustomDomain
    Clients -->|Development Resolution| LocalHost
```

### Domain Strategy Progression

1.  **Phase 1: Development & Local Testing (No Domain Required)**:
    - **Asset Synchronization**: Upload and download assets directly from the local machine using the AWS S3 SDK pointed to Cloudflare R2's private API endpoint (`https://${CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`). This requires only credentials (R2 Access Keys), with zero domain configuration.
    - **Local Resolution**: Client applications resolve and stream assets directly from the local monorepo source files (`@elo-organico/studio/src/...`) in development mode (`isDev === true`).
    - **R2 Direct Resolution (Optional)**: If cloud asset testing is needed during dev, developers can enable the default, temporary R2 public bucket URL (`*.r2.dev`) on the Cloudflare bucket dashboard.
2.  **Phase 2: Staging & Production (Professional Custom Domain)**:
    - **Custom Zone Acquisition**: Purchase a cheap, professional domain directly via Cloudflare Registrar (e.g., `elo-organico.link` or similar) for wholesale pricing ($2 to $12 per year). This registers the domain instantly with zero verification delays.
    - **Edge Caching**: Map a custom subdomain (e.g., `assets.elo-organico.link`) to the R2 bucket. This routes all traffic through Cloudflare's Edge CDN, unlocking universal SSL and edge caching rules.
    - **Read Cost Mitigation**: Edge caching drastically minimizes R2 Class B read operations, ensuring that the monorepo fits comfortably within the 10GB/month free R2 tier.

---

## 2. Infrastructure Setup & Progression

### Step 1: Cloudflare R2 Bucket Creation (Phase 1)

1. Log in to the Cloudflare Dashboard and navigate to **R2 Object Storage**.
2. Click **Create Bucket**, name it `elo-organico-assets`, and select **Automatic** location preference.
3. Scroll to the **S3 API** section on the R2 homepage and click **Manage R2 API Tokens**.
4. Click **Create API Token** with the following permissions:
   - **Token Name**: `elo-organico-studio-dev`
   - **Permissions**: `Edit` (allows read, write, and list operations).
   - **Bucket Scope**: Limit to `elo-organico-assets` for maximum security.
5. Copy the generated **Access Key ID**, **Secret Access Key**, and **Account ID** to your local environment configuration.

### Step 2: Custom Domain Mapping (Phase 2)

Once ready for staging and production testing, purchase and map the custom domain:

1. In the Cloudflare Dashboard, purchase your domain (e.g., `elo-organico.link`) via **Domain Registration > Register Domains**.
2. Once the domain zone is active in your Cloudflare account, navigate back to your R2 Bucket (`elo-organico-assets`).
3. Select the **Settings** tab, scroll to **Custom Domains**, and click **Connect Domain**.
4. Enter `assets.elo-organico.link` (replacing `elo-organico.link` with your actual domain) and click **Continue**. Cloudflare automatically adds the appropriate CNAME record and provisions an SSL certificate.
5. Navigate to **Caching > Cache Rules** inside the domain's dashboard and click **Create Rule**:
   - **Condition**: URI Path `starts with` `/studio/`.
   - **Edge TTL**: Override with `1 month` or `1 year`.
   - **Browser TTL**: Override with `1 year`.

---

## 3. Environment Variables

Create or update the `.env` file at the root or within the `studio/` workspace directory. Do not commit credentials to source control.

```bash
# Cloudflare R2 Credentials (S3 API Compatibility)
CLOUDFLARE_R2_ACCOUNT_ID=your_cloudflare_account_id_hex
CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key_id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
CLOUDFLARE_R2_BUCKET_NAME=elo-organico-assets

# Edge CDN Custom Subdomain (Only active in Phase 2)
# In Phase 1, leave this empty, use *.r2.dev, or let apps fall back to local streaming.
VITE_CLOUDFLARE_R2_PUBLIC_URL=assets.elo-organico.link
```

---

## 4. Codebase Transition

This section details the TypeScript implementations required to replace the existing Cloudinary synchronization structure with the S3-compatible Cloudflare R2 integration.

### A. Dependency Cleanup & Installation

Navigate to the `studio` package and run the command to install S3 client utilities and automatic MIME-type detection.

```bash
pnpm --filter @elo-organico/studio remove cloudinary axios @types/glob
pnpm --filter @elo-organico/studio add @aws-sdk/client-s3 mime-types
pnpm --filter @elo-organico/studio add -D @types/mime-types
```

### B. Package Configuration (`studio/package.json`)

Modify the scripts to target the new R2 synchronization implementation:

```json
"scripts": {
  "assets:push": "tsx r2/push.ts",
  "assets:pull": "tsx r2/pull.ts"
}
```

### C. Updating the Manifest (`studio/assets-manifest.json`)

Rename the configuration property from `cloudnary` to `r2` to maintain semantic clarity:

```json
{
  "r2": {
    "assets": {
      "push": ["/images", "/three", "/raw"],
      "pull": ["/images", "/three", "/raw"],
      "build": ["/three", "/images"]
    }
  }
}
```

### D. TypeScript Interface & Types (`studio/r2/r2.interface.ts`)

Define explicit types and abstract interfaces for file discovery, upload services, and manifest schemas:

```typescript
export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl: string;
}

export interface R2Manifest {
  r2: {
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
  uploadAsset(filePath: string, key: string): Promise<void>;
}

export interface IAssetSearchService {
  listAssets(prefix: string): Promise<string[]>;
}

export interface IAssetDownloaderService {
  downloadAsset(key: string, destinationPath: string): Promise<void>;
}
```

### E. Configuration Loader (`studio/r2/config/env-config.ts`)

Retrieve and validate the R2 credentials. The configuration checks for both a local `.env` and root `.env.dev`:

```typescript
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { R2Config } from '../r2.interface.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadR2Config(): R2Config {
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

  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
  const publicUrl =
    process.env.VITE_CLOUDFLARE_R2_PUBLIC_URL ?? process.env.CLOUDFLARE_R2_PUBLIC_URL;

  if (
    accountId === undefined ||
    accountId === '' ||
    accessKeyId === undefined ||
    accessKeyId === '' ||
    secretAccessKey === undefined ||
    secretAccessKey === '' ||
    bucketName === undefined ||
    bucketName === ''
  ) {
    throw new Error('Configuration Error: Missing Cloudflare R2 environment variables.');
  }

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    publicUrl: publicUrl ?? '',
  };
}
```

### F. R2 Services (`studio/r2/services/r2-storage.service.ts`)

This service manages communication with Cloudflare R2 via `@aws-sdk/client-s3`. It utilizes `mime-types` to determine the proper `Content-Type` for uploads, preventing browser load errors for `.glb` (gltf-binary), `.hdr` (vnd.radiance), images, and fonts.

```typescript
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import type { Readable } from 'stream';
import type {
  IAssetUploaderService,
  IAssetSearchService,
  IAssetDownloaderService,
  R2Config,
} from '../r2.interface.js';

export class R2StorageService
  implements IAssetUploaderService, IAssetSearchService, IAssetDownloaderService
{
  private s3Client: S3Client;
  private bucketName: string;

  constructor(config: R2Config) {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
    this.bucketName = config.bucketName;
  }

  async uploadAsset(filePath: string, key: string): Promise<void> {
    const fileBuffer = fs.readFileSync(filePath);
    const contentType = mime.lookup(filePath) || 'application/octet-stream';

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
  }

  async listAssets(prefix: string): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: prefix,
    });

    const response = await this.s3Client.send(command);
    return (
      response.Contents?.map((item) => item.Key).filter(
        (key): key is string => key !== undefined,
      ) ?? []
    );
  }

  async downloadAsset(key: string, destinationPath: string): Promise<void> {
    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    const stream = response.Body as Readable;
    const writer = fs.createWriteStream(destinationPath);
    stream.pipe(writer);

    return new Promise<void>((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }
}
```

### G. Sync Orchestrator (`studio/r2/application/sync.orchestrator.ts`)

Coordinate files discovered locally and in R2:

```typescript
import path from 'path';
import type {
  IAssetDiscoveryService,
  IAssetUploaderService,
  IAssetDownloaderService,
  IAssetSearchService,
  R2Manifest,
} from '../r2.interface.js';

export class AssetSyncOrchestrator {
  constructor(
    private discoveryService: IAssetDiscoveryService,
    private uploaderService: IAssetUploaderService,
    private downloaderService: IAssetDownloaderService,
    private searchService: IAssetSearchService,
  ) {}

  async push(studioDir: string, manifest: R2Manifest): Promise<void> {
    console.info('Starting Cloudflare R2 push synchronization...');

    const pushFolders = manifest.r2.assets.push;
    console.info(`Found ${pushFolders.length} folders to synchronize:`, pushFolders);

    for (const folder of pushFolders) {
      const files = await this.discoveryService.discoverAssets(studioDir, folder);
      console.info(`Folder ${folder}: Found ${files.length} local assets to sync.`);

      for (const file of files) {
        const filePath = path.join(studioDir, file);

        let keyPath = file;
        if (file.startsWith('src/') === true) {
          keyPath = file.substring(4);
        }

        const key = `studio/${keyPath}`;
        console.info(`Uploading ${file} to R2 with key: ${key}...`);

        try {
          await this.uploaderService.uploadAsset(filePath, key);
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : String(error);
          console.error(`Failed to upload ${file}:`, message);
        }
      }
    }
    console.info('R2 Push synchronization completed.');
  }

  async pull(studioDir: string, manifest: R2Manifest): Promise<void> {
    console.info('Starting Cloudflare R2 pull synchronization...');

    const pullFolders = manifest.r2.assets.pull;
    console.info(`Found ${pullFolders.length} folders to download:`, pullFolders);

    for (const folder of pullFolders) {
      const cleanFolder = folder.replace(/^\//, '');
      const folderPrefix = `studio/${cleanFolder}`;

      console.info(`Querying Cloudflare R2 objects for prefix: ${folderPrefix}...`);
      try {
        const objectKeys = await this.searchService.listAssets(folderPrefix);
        console.info(`Folder ${folder}: Found ${objectKeys.length} assets on Cloudflare R2.`);

        for (const key of objectKeys) {
          const relativePath = key.substring(7);
          const destinationPath = path.join(studioDir, 'src', relativePath);

          console.info(`Downloading key: ${key} -> ${destinationPath}`);
          try {
            await this.downloaderService.downloadAsset(key, destinationPath);
          } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(`Failed to download ${key}:`, message);
          }
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Failed to list/sync prefix ${folderPrefix}:`, message);
      }
    }
    console.info('R2 Pull synchronization completed.');
  }
}
```

---

## 5. Client Applications & CDN Integration

Adapt the static resource compilation of Vite (Community Shop app) and Webpack (Docusaurus) to use the custom domain.

### A. Vite Integration (`instance/apps/web/plugins/studioAssets.ts`)

Modify the custom plugin to resolve URLs dynamically based on the configuration:

```typescript
import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

interface StudioManifest {
  r2: {
    assets: {
      push: string[];
      pull: string[];
      build: string[];
    };
  };
}

export function studioAssetsPlugin(): Plugin {
  let isDev = false;
  let buildFolders: string[] = [];
  let publicUrl = ''; // Falls back to local streaming if blank in dev

  try {
    const manifestPath = require.resolve('@elo-organico/studio/assets-manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as StudioManifest;
    buildFolders = manifest.r2.assets.build;
  } catch {
    console.warn(
      'Vite plugin warning: @elo-organico/studio/assets-manifest.json not found or could not be loaded.',
    );
  }

  return {
    name: 'vite-plugin-studio-assets',
    enforce: 'pre',
    configResolved(config) {
      isDev = config.command === 'serve';
      const envPublicUrl = config.env.VITE_CLOUDFLARE_R2_PUBLIC_URL as string | undefined;
      if (envPublicUrl !== undefined && envPublicUrl !== '') {
        publicUrl = envPublicUrl;
      } else {
        const processEnvPublicUrl =
          process.env.VITE_CLOUDFLARE_R2_PUBLIC_URL ?? process.env.CLOUDFLARE_R2_PUBLIC_URL;
        if (processEnvPublicUrl !== undefined && processEnvPublicUrl !== '') {
          publicUrl = processEnvPublicUrl;
        }
      }
    },
    resolveId(source) {
      if (isDev === false && source.startsWith('@elo-organico/studio/') === true) {
        const subPath = source.replace(/^@elo-organico\/studio\//, '');
        const firstSegment = subPath.split('/')[0];
        const folderKey = `/${firstSegment}`;

        if (buildFolders.includes(folderKey) === true) {
          return `\0${source}`;
        }
      }
      return null;
    },
    load(id) {
      if (id.startsWith('\0@elo-organico/studio/') === true) {
        const cleanSource = id.replace(/^\0/, '');
        const subPath = cleanSource.replace(/^@elo-organico\/studio\//, '');

        if (publicUrl === '') {
          throw new Error('Deployment Error: VITE_CLOUDFLARE_R2_PUBLIC_URL is not set.');
        }

        return `export default "https://${publicUrl}/studio/${subPath}";`;
      }
      return null;
    },
  };
}
```

---

## 6. Migration Blueprint & Execution Plan

### Phase 1: Local Development & Functional R2 Testing (Immediate)

This phase establishes full functional compatibility using credentials, requiring no domain purchase or public PRs.

1. **Bucket Creation**: Create the `elo-organico-assets` R2 bucket and generate Access keys on the Cloudflare dashboard.
2. **Local Environment Config**: Populate the `.env` at root or in `studio/` with the Cloudflare credentials (`CLOUDFLARE_R2_ACCOUNT_ID`, etc.). Leave `VITE_CLOUDFLARE_R2_PUBLIC_URL` blank for now to use local streaming during development.
3. **Refactor Codebase**:
   - Install the S3 SDK and MIME utilities.
   - Deploy R2 sync command implementations under `studio/r2/`.
4. **Push & Pull Testing**:
   - Run `pnpm --filter @elo-organico/studio assets:push` to push local assets up to the R2 bucket.
   - Run `pnpm --filter @elo-organico/studio assets:pull` to pull assets down.
   - Verify that all files match perfectly and mime-types are assigned correctly inside the R2 bucket file list.
5. **Vite Local Verification**: Run the local dev server (`pnpm instance:dev`) and verify client applications render the static models/graphics successfully via local filesystem streaming (`isDev === true`).

### Phase 2: Domain Acquisition & Secure Cloud Routing (Post-Acquisition)

This phase moves downstream application builds to pull directly from the secure Edge CDN.

1. **Domain Registration**: Buy a cheap domain (e.g., `elo-organico.link` or similar) directly through Cloudflare Registrar.
2. **Bucket Mapping**: Bind the subdomain `assets.elo-organico.link` as a **Custom Domain** on the R2 bucket settings.
3. **CDN Optimization**: Create the `/studio/*` Cache Rule inside the Cloudflare domain panel.
4. **Build Deployment Configuration**:
   - Add `VITE_CLOUDFLARE_R2_PUBLIC_URL=assets.elo-organico.link` to staging/production `.env` files.
5. **Staging Verification**:
   - Run a production build of the web applications:
     ```bash
     pnpm build
     ```
   - Deploy the build to local staging/VM containers.
   - Inspect network request logs in the browser console. Confirm that all static assets are loaded from `https://assets.elo-organico.link/studio/...` and that the headers return `CF-Cache-Status: HIT`.

---

## 7. Verification & Clean-Up

Once both phases are fully implemented and verified:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Verify type safety across all packages, confirm clean builds, and delete the deprecated `studio/cloudnary` directory and [.github/workflows/dns-register.yml](file:///D:/projects/elo-organico/.github/workflows/dns-register.yml) from source control.
