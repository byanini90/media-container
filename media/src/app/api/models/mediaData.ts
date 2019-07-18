import { AutorData } from './autorData';
import { ThumbnailData } from './thumbnailData';

export interface MediaData {
    id: number;
    uuid: string;
    type: string;
    name: string;
    created: number;
    changed: number;
    author: AutorData;
    width?: number;
    height?: number;
    thumbnail?: ThumbnailData;
    url: string;
    license: string;
    site: string;
}
