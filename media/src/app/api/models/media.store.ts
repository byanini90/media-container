import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { MediaData } from './mediaData';

export interface MediaState extends EntityState<MediaData> {
  hasMore: boolean;
  page: number;
}

const initialState: MediaState = {
  hasMore: true,
  page: 1
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'medias' })
export class MediaStore extends EntityStore<MediaState, MediaData> {

  constructor() {
    super(initialState);
  }

  updatePage(page: { hasMore: boolean, page: number }) {
    this.update(state => ({
        hasMore: page.hasMore,
        page: page.page
    }));
  }

}

