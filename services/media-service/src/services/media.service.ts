import { env } from '../config/env.js';

export class MediaService {
  buildMediaLink(filename: string) {
    return `${env.mediaBaseUrl}/${filename}`;
  }
}
