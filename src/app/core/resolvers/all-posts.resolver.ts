import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class AllPostsResolver implements Resolve<Post[]> {
  
    constructor(
      private postService: PostsService
    ) {}
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log("****Resolver******")
      return this.postService.fetchPosts()
      .pipe(take(1), map((postList: Post[])=> postList));
      // return this.postService.postListChanged;
    }
  
  }