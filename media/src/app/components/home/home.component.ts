import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MediasComponent } from '../medias/medias.component';
import { MediaData } from '../../api/models/mediaData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mediaSelected: MediaData;

  constructor(public matDialog: MatDialog) { }

  ngOnInit() {
  }

  openMediaModel(): void {
    const mediaModalRef = this.matDialog.open(MediasComponent, {
      width: '95%',
      height: '100%',
      maxWidth: '100%',
      data: {mediaSelected: this.mediaSelected}
    });

    mediaModalRef.afterClosed().subscribe(mediaSelected => {
      this.mediaSelected = mediaSelected;
      console.log(mediaSelected);
    });
  }

}
