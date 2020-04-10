import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { IAppState, getAllPostsSelector } from 'src/app/+store';
import { Store, ActionsSubject } from '@ngrx/store';
import { AllPosts, ActionTypes } from 'src/app/+store/post/actions';
import { Observable } from 'rxjs';
import { ofType } from '@ngrx/effects';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  postList$: Observable<IPost[]>;
  buttonName: string = 'Table View';
  cardView: boolean = true;
  loaded: boolean = false;

  constructor(
    private store: Store<IAppState>,
    private actionSubject: ActionsSubject
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new AllPosts());
    this.actionSubject.pipe(
      ofType(ActionTypes.GetAllPostsSuccess)
    ).subscribe(() => {
      this.postList$ = this.store.select(getAllPostsSelector);
      this.postList$.subscribe;
      this.loaded = true;
    })
  }

  toggle() {
    this.cardView = !this.cardView;
    if (this.cardView) {
      this.buttonName = 'Table View';
    } else {
      this.buttonName = 'Default View';
    }
  }
}
