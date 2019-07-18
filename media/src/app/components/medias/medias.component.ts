import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterData } from '../../api/models/filterData';
import { MediaService } from 'src/app/api/services/media.service';
import { MediaData } from 'src/app/api/models/mediaData';
import { Subscription, Observable } from 'rxjs';
import { MediasQuery } from '../../api/models/media.query';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {

  isLoading: boolean = true;
  medias: MediaData[];
  mediaServiceSubscription: Subscription;

  medias$: Observable<MediaData[]>;
  isLoading$: Observable<boolean>;

  constructor(public matDialogRef: MatDialogRef<MediasComponent>,
              @Inject(MAT_DIALOG_DATA) public mediaSelected: MediaData,
              private mediaService: MediaService,
              private mediaQuery: MediasQuery) { }

  ngOnInit() {
    this.fetchMedias();
    this.mediaQuery.selectAll().subscribe(res => {
      console.log(res);
    });
    this.medias$ = this.mediaQuery.selectAll();
    this.isLoading$ = this.mediaQuery.selectLoading();
  }

  private fetchMedias() {
    if (this.mediaQuery.getHasMore()) {
      this.mediaService.get(this.mediaQuery.getPage());
    }
  }

  closeModal() {
    if (this.mediaServiceSubscription) {
      this.mediaServiceSubscription.unsubscribe();
    }
    this.matDialogRef.close();
  }

  filter(filterData: FilterData) {
    this.mediaService.filter(filterData).subscribe( (data: MediaData[]) => {
      this.isLoading = false;
      console.log((data && data.length > 0) ? `FILTER - hay ${data.length} elementos` : 'FILTER - no hay elementos');
      this.medias = Array.isArray(data) ? data : [data];
    });
  }

  onScroll() {
    this.fetchMedias();
  }

}
