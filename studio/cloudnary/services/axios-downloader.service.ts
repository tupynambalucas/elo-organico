import fs from 'fs';
import path from 'path';
import axios from 'axios';
import type { Readable } from 'stream';
import type { IAssetDownloaderService } from '../clodnary.interface.js';

export class AxiosAssetDownloaderService implements IAssetDownloaderService {
  async downloadAsset(url: string, destinationPath: string): Promise<void> {
    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

    const response = await axios.get<Readable>(url, { responseType: 'stream' });
    const stream = response.data;
    const writer = fs.createWriteStream(destinationPath);
    stream.pipe(writer);

    return new Promise<void>((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }
}
