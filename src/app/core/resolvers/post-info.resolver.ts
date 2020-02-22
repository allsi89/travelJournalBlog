import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from "@angular/router"
import { PostsService } from '../services/posts.service';
import { map, take } from 'rxjs/operators';
import { Post } from '../models/post.model';


@Injectable()
export class PostInfoResolver implements Resolve<Post> {
    constructor(
        private postService: PostsService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.postService
        .fetchPostById(route.paramMap.get('id'))
        .pipe(take(1), map((post: Post) => post))
    }
    
}