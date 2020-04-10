import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { IUser } from 'src/app/core/interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/core/services/helper.service';
import { NavService } from 'src/app/core/services/nav.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() post: IPost;
  private _userData: IUser;
  isUPostPage$: boolean;
  isAuthor$: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private helper: HelperService,
    private navService: NavService
  ) { }

  ngOnInit(): void {
    this._userData = this.helper.getCurrentUser();
    this.isUPostPage$ = this.route.snapshot.parent.url[0].path == 'user';
    if(this._userData) {
      this.isAuthor$ = this._userData.id == this.post.uid;
    }
  }

  deletePost() {
    this.helper.deletePost(this.post);
  }

  getUserPosts(post: IPost) {
    this.helper.getUserPosts(post);
  }

  getPostInfo(id: string) {
    this.navService.getPostInfo(id);
    
  }

  getEditPost(id: string) {
    this.navService.getPostEdit(id);
  }
}
