import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MediaData } from '../../api/models/mediaData';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  @Input() media: MediaData;
  @Input() mediaSelected: boolean = false;

  @Output() closeModal?: EventEmitter<void> = new EventEmitter();

  show: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
