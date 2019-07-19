import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterData } from '../../api/models/filterData';
import { MediaService } from 'src/app/api/services/media.service';
import { MediaData } from 'src/app/api/models/mediaData';
import { Observable } from 'rxjs';
import { MediasQuery } from '../../api/models/media.query';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {

  medias$: Observable<MediaData[]>;
  isLoading$: Observable<boolean>;

  countMedias: number = 1;

  constructor(public matDialogRef: MatDialogRef<MediasComponent>,
              @Inject(MAT_DIALOG_DATA) public mediaSelected: MediaData,
              private mediaService: MediaService,
              private mediaQuery: MediasQuery) { }

  ngOnInit() {
    this.fetchMedias();
    this.medias$ = this.mediaQuery.selectAll();
    this.isLoading$ = this.mediaQuery.selectLoading();
    this.mediaQuery.selectLoading().subscribe(res => {
      if (!res) {
        this.countMedias = this.mediaQuery.getCount();
      }
    });
  }

  private fetchMedias(isFilter: boolean = false, filterData?: FilterData) {
    if (!isFilter && this.mediaQuery.getHasMore()) {
      this.countMedias = 1;
      this.mediaService.get(this.mediaQuery.getPage());
    } else if (isFilter) {
      this.countMedias = 1;
      this.mediaService.getFilter(filterData);
    }
  }

  closeModal() {
    this.matDialogRef.close();
  }

  filter(filterData: FilterData) {
    this.fetchMedias(true, filterData);
  }

  onScroll() {
    this.fetchMedias();
  }

}
