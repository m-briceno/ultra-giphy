import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Giph } from '../../models/giph';

@Component({
  selector: 'app-giphy-grid',
  templateUrl: './giphy-grid.component.html',
  styleUrls: ['./giphy-grid.component.scss']
})
export class GiphyGridComponent implements OnInit {

  @Input() loading: boolean;
  @Input() currentPage: number;
  @Input() giphies: Giph[];

  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  @Output() previous: EventEmitter<void> = new EventEmitter<void>();
  @Output() last: EventEmitter<void> = new EventEmitter<void>();
  @Output() first: EventEmitter<void> = new EventEmitter<void>();

  private pageSize = environment.pagesize;

  constructor() { }

  ngOnInit(): void {
  }

  slicePage(): Giph[] {
    const start = this.currentPage * this.pageSize;
    return this.giphies.slice(start, start + this.pageSize);
  }

}
