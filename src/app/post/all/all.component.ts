import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/core/models/post.model';
import { Subscription } from 'rxjs';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  @Input()
  sort: string;
  @Input()
  checked: Boolean 
  @Output()
  change: EventEmitter<MatRadioChange>
  postList: Post[];
  postListSub: Subscription;



  constructor(
    private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
  }

  ngOnInit(): void {
    console.log('Im here')
    this.postList = this.route.snapshot.data['postList'];

    //  this.postService.fetchPosts()
    //  .subscribe((data) => {
    //   this.postList = data;
    //  });
    //  this.postListSub = this.postService.postListChanged.subscribe((data) => {
    //    this.postList = data;
    //  })
  }

  onChange(mrChange: MatRadioChange) {
    this[mrChange.value]();
    let mrButton: MatRadioButton = mrChange.source;
 } 
 

  sortByDate() {
    this.postList.sort((a, b) => b.createdOn.getTime() - a.createdOn.getTime())
  }
  sortByLikes() {
    this.postList.sort((a, b) => b.likes - a.likes);
  }

  sortByDislikes() {
    this.postList.sort((a, b) => b.dislikes - a.dislikes);
  }

  getItemInfo(postId: string) {
    this.router.navigate(['post/info/', postId]);
  }

}
