import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { searchGiphies, setQueryToSearch } from '../../store/actions/giphy.actions';
import { AppState } from '../../store/interfaces/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userInput: string = "";
  // Left the form code which was a choice of implementation but in my opinion its an overkill
  // searchForm: FormGroup;
  constructor(private store: Store<AppState>) {
    /* this.searchForm = new FormGroup({
      userInput: new FormControl()
    }); */
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dispatchQueryActions();
  }

  onClear() {
    this.userInput = "";
    this.dispatchQueryActions();
  }

  private dispatchQueryActions() {
    this.store.dispatch(setQueryToSearch({query: this.userInput}));
    this.store.dispatch(searchGiphies());
  }
}
