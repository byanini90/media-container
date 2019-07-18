import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MediaData } from './mediaData';
import { MediaState, MediaStore } from './media.store';

@Injectable()
export class MediasQuery extends QueryEntity<MediaState, MediaData> {

  constructor(protected store: MediaStore) {
    super(store);
  }

  getHasMore() {
    return this.getValue().hasMore;
  }

  getPage() {
    return this.getValue().page;
  }

}