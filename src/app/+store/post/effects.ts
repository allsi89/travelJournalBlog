import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    ActionTypes,
    CreatePost, CreatePostSuccess, CreatePostFailed,
    AllPosts, AllPostsSuccess, AllPostsFailed,
    UserPosts, UserPostsSuccess, UserPostsFailed,
    DeletePost, DeletePostSuccess, DeletePostFailed,
    LikePost, LikePostSuccess, LikePostFailed, PostInfo, PostInfoSuccess, PostInfoFailed
} from './actions';
import { Router } from '@angular/router';
import { map, switchMap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/post/service/post.service';

@Injectable({
    providedIn: 'root'
})
export class PostEffects {
    constructor(
        private actions$: Actions,
        private postService: PostService,
        private snackbar: MatSnackBar,
        private router: Router
    ) { }

    /** Create Post */
    @Effect() createPost$ = this.actions$.pipe(
        ofType<CreatePost>(ActionTypes.CreatePost),
        map(action => action.payload),
        switchMap(data => {
            return this.postService
                .createPost(data)
                .then((id) => {
                    return new CreatePostSuccess(id);
                })
                .catch(err => {
                    this.snackbar.open(err.message, 'Undo', {
                        duration: 3000
                    });
                    return new CreatePostFailed(err);
                })
        })
    );

    /** Get Post Info */
    @Effect() postInfo$ = this.actions$.pipe(
        ofType<PostInfo>(ActionTypes.PostInfo),
        map(data => data.payload.id),
        switchMap(id => {
          return this.postService.fetchPostById(id)
          .pipe(
            map(post => {
               this.router.navigate(['post/info', post.id])
               return new PostInfoSuccess(post)
            }),
            catchError(err => [new PostInfoFailed({ error: err })])
          );
        })
      );

    /** Get All Posts */
    @Effect() getAllPosts$ = this.actions$.pipe(
            ofType<AllPosts>(ActionTypes.GetAllPosts),
            switchMap(() => {
                return this.postService.fetchPosts().pipe(
                    map(posts => {
                        return new AllPostsSuccess(posts);
                    }),
                    catchError(err => {
                        this.snackbar.open(err.message, 'Undo', {
                            duration: 3000
                        });
                        return [new AllPostsFailed(err)];
                    })
                );
            })
        );

    /** Get All Posts By Specific User */
    @Effect() getUserPosts$ = this.actions$.pipe(
        ofType<UserPosts>(ActionTypes.GetUserPosts),
        map(data => data.payload),
        switchMap((user) => {
            return this.postService.fetchUserPosts(user).pipe(
                map(posts => {
                    this.router.navigate(['user/posts']);
                    return new UserPostsSuccess(posts);
                }),
                catchError(err => {
                    this.snackbar.open(err.message, 'Undo', {
                        duration: 3000
                    });
                    return [new UserPostsFailed(err)];
                })
            );
        })
    );

    /** Delete Post */
    @Effect() deletePost$ = this.actions$.pipe(
        ofType<DeletePost>(ActionTypes.DeletePost),
        map(data => data.payload),
        switchMap(post => {
            return this.postService.deletePost(post)
                .then(() => {
                    this.router.navigate(['user/posts']);
                    return new DeletePostSuccess();
                })
                .catch(err => [new DeletePostFailed(err)]);
        })
    );

    /** Like Post */
    @Effect() likePost$ = this.actions$.pipe(
        ofType<LikePost>(ActionTypes.LikePost),
        map(data => data.payload),
        switchMap(({ post, id }) => {
            return this.postService.likePost(post, id)
                .then(() => {
                    this.router.navigate(['post/info', post.id])
                    return new LikePostSuccess();
                })
                .catch(err => [new LikePostFailed(err)]);
        })
    );

}