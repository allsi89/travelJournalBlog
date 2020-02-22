import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  postId: string;
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) { }

  ngOnInit() {
    console.log("In info")
    this.post = this.route.snapshot.data['post'];
  }
  likePost() {

  }

  dislikePost() {

  }

}
