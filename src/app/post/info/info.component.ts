import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/core/interfaces/post';
import { IAppState, getPostInfoSelector } from 'src/app/+store';
import { Store, ActionsSubject } from '@ngrx/store';
import { PostInfo, ActionTypes } from 'src/app/+store/post/actions';
import { Observable } from 'rxjs';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-post-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  post: Observable<IPost>;
  loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private actionSubject: ActionsSubject
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new PostInfo({ id }));
    this.actionSubject.pipe(
      ofType(ActionTypes.PostInfoSuccess)
    ).subscribe(() => {
      this.post = this.store.select(getPostInfoSelector);
      this.post.subscribe;
      this.loaded = true;
    })
  }
}
