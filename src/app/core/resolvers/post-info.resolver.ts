import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from "@angular/router"
import { PostService } from '../../post/service/post.service';
import { map, take } from 'rxjs/operators';
import { IPost } from '../interfaces/post';


@Injectable()
export class PostInfoResolver implements Resolve<IPost> {
    constructor(
        private postService: PostService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.postService
        .fetchPostById(route.paramMap.get('id'))
        .pipe(take(1), map((post: IPost) => post))
    }
    
}