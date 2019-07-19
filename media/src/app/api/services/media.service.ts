import { Injectable } from '@angular/core';
import { MediaData } from '../models/mediaData';
import { Observable } from 'rxjs';
import { FilterData } from '../models/filterData';
import { HttpClient } from '@angular/common/http';
import { InMemoryDb } from '../models/inMemoryDb';
import { MediaStore } from '../models/media.store';
import { transaction } from '@datorama/akita';

@Injectable()
export class MediaService {

  private mediasUrl = 'api/medias';  // URL to web api

  constructor(private http: HttpClient, private inMemoryDb: InMemoryDb, private mediaStore: MediaStore) { }

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

  get(page: number) {
    this.mediaStore.setLoading(true);
    this.getMedias({ page });
  }

  getFilter(filterData: FilterData) {
    this.mediaStore.setLoading(true);
    this.getFilterMedias(filterData);
  }

  @transaction()
  private updateMedias(res) {
    const nextPage = res.currentPage + 1;
    this.mediaStore.add(res.data);
    this.mediaStore.updatePage({ hasMore: res.hasMore, page: nextPage });
    this.mediaStore.setLoading(false);
  }

  getData(params = { page: 1 }) {
    const perPage = 10;
    const offset = (params.page - 1) * perPage;
    this.getAll().subscribe(res => {
      const paginatedItems = res.slice(offset, offset + perPage);
      const hasMore = offset + perPage !== res.length;
      this.updateMedias( {
        currentPage: params.page,
        hasMore,
        perPage: perPage,
        total: res.length,
        lastPage: Math.ceil(res.length / perPage),
        data: paginatedItems
      });
    });
  }

  getFilterData(filterdata: FilterData, params = { page: 1 }) {
    this.mediaStore.remove();
    const perPage = 10;
    const offset = (params.page - 1) * perPage;
    this.filter(filterdata).subscribe(res => {
      const paginatedItems = res.slice(offset, offset + perPage);
      const hasMore = offset + perPage !== res.length;
      this.updateMedias( {
        currentPage: params.page,
        hasMore,
        perPage: perPage,
        total: res.length,
        lastPage: Math.ceil(res.length / perPage),
        data: paginatedItems
      });
    });
  }

  getMedias(params?) {
    return this.getData(params);
  }

  getFilterMedias(filterdata: FilterData) {
    return this.getFilterData(filterdata);
  }

}
