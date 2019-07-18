import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterData } from '../../../api/models/filterData';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  disabled: boolean = false;

  filterData: FilterData;

  @Output() filter: EventEmitter<FilterData>;
  @Output() closeModal?: EventEmitter<void> = new EventEmitter();

  constructor() {
    this.filter = new EventEmitter();
  }

  ngOnInit() {
    this.initFilter();
  }

  changedFilter(field?: string) {
    const {isAuthor, site, type} = this.filterData;
    this.initFilter();
    switch (field) {
      case 'autor':
        this.filterData.isAuthor = isAuthor;
        break;
      case 'site':
        this.filterData.site = site;
        break;
      case 'type':
        this.filterData.type = type;
        break;
      default:
        break;
    }
    this.filter.emit(this.filterData);
  }

  initFilter() {
    this.filterData = {
      isAuthor: false,
      site: 'todos',
      type: 'todos'
    };
  }

  onNoClick(): void {
    this.filter.unsubscribe();
    this.closeModal.emit();
  }

}
