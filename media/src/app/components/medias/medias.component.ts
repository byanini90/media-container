import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterData } from '../../api/models/filterData';
import { MediaService } from 'src/app/api/services/media.service';
import { MediaData } from 'src/app/api/models/mediaData';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {

  isLoading: boolean = true;
  medias: MediaData[];
  mediaServiceSubscription: Subscription;

  constructor(public matDialogRef: MatDialogRef<MediasComponent>, @Inject(MAT_DIALOG_DATA) public mediaSelected: MediaData, private mediaService: MediaService) { }

  ngOnInit() {
    this.mediaServiceSubscription = this.mediaService.getAll()
      .subscribe( (data: MediaData[]) => {
        this.isLoading = false;
        console.log((data && data.length > 0) ? `ALL - hay ${data.length} elementos` : 'ALL - no hay elementos');
        this.medias = Array.isArray(data) ? data : [data];
      });
  }

  closeModal() {
    this.mediaServiceSubscription.unsubscribe();
    this.matDialogRef.close();
  }

  filter(filterData: FilterData) {
    this.isLoading = true;
    this.mediaService.filter(filterData).subscribe( (data: MediaData[]) => {
      this.isLoading = false;
      console.log((data && data.length > 0) ? `FILTER - hay ${data.length} elementos` : 'FILTER - no hay elementos');
      this.medias = Array.isArray(data) ? data : [data];
    });
  }

}
