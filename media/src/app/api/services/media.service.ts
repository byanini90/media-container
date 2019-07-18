import { Injectable } from '@angular/core';
import { MediaData } from '../models/mediaData';
import { Observable } from 'rxjs';
import { FilterData } from '../models/filterData';
import { HttpClient } from '@angular/common/http';
import { InMemoryDb } from './InMemoryDb';

@Injectable()
export class MediaService {

  private mediasUrl = 'api/medias';  // URL to web api

  constructor(private http: HttpClient, private inMemoryDb: InMemoryDb) { }

  getAll(): Observable<MediaData[]> {
    return this.http.get<MediaData[]>(`${this.mediasUrl}`);
  }

  filter(filterData: FilterData) {
    let {isAuthor, site, type} = filterData;
    const author = (!isAuthor) ? '' : this.inMemoryDb.getUser();
    site = (site === 'todos') ? '' : site;
    type = (type === 'todos') ? '' : type;
    return this.http.get<MediaData[]>(`${this.mediasUrl}/?author_id=${author}&site=${site}&type=${type}`);
  }
}
