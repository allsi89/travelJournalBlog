import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { IUser } from 'src/app/core/interfaces/user';
import { IAppState } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { LikePost } from 'src/app/+store/post/actions';
import { HelperService } from 'src/app/core/services/helper.service';
import { NavService } from 'src/app/core/services/nav.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  @Input() post: IPost;
  userData$: IUser;

  constructor(
    private store: Store<IAppState>,
    private helper: HelperService,
    private navService: NavService
  ) { }

  ngOnInit(): void {
    this.userData$ = this.helper.getCurrentUser();
  }

  deletePost() {
    this.helper.deletePost(this.post);
  }

  getUserPosts() {
    this.helper.getUserPosts(this.post);
  }

  getPostInfo(id: string) {
    this.navService.getPostInfo(id);
  }

  getEditPost(id: string) {
    this.navService.getPostEdit(id);
  }

  likePost() {
    this.store.dispatch(new LikePost({ post: this.post, id: this.userData$.id }));
  }
}
