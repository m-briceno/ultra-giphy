import { Component, Input, OnInit } from '@angular/core';
import { Giph } from '../../models/giph';

@Component({
  selector: 'app-giphy-grid',
  templateUrl: './giphy-grid.component.html',
  styleUrls: ['./giphy-grid.component.scss']
})
export class GiphyGridComponent implements OnInit {

  @Input() loading: boolean;
  @Input() giphies: Giph[];

  constructor() { }

  ngOnInit(): void {
  }

}
