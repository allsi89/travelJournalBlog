import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
    ActionTypes,
    CreatePost, CreatePostSuccess, CreatePostFailed,
    AllPosts, AllPostsSuccess, AllPostsFailed,
    UserPosts, UserPostsSuccess, UserPostsFailed,
    DeletePost, DeletePostSuccess, DeletePostFailed,
    LikePost, LikePostSuccess, LikePostFailed,
    PostInfo, PostInfoSuccess, PostInfoFailed,
} from './actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/post/service/post.service';
import { Navigator } from 'src/app/core/services/navigator.service';

@Injectable({
    providedIn: 'root'
})
export class PostEffects {
    constructor(
        private actions$: Actions,
        private postService: PostService,
        private snackbar: MatSnackBar,
        private navigator: Navigator
    ) { }

    /** Create Post */
    @Effect() createPost$ = this.actions$.pipe(
        ofType<CreatePost>(ActionTypes.CreatePost),
        map(action => action.payload),
        switchMap((post) => {
            return this.postService
                .createPost(post)
                .then(() => {
                    this.snackbar.open('Successfully Created!', 'Close', {
                        duration: 4000
                    });
                    return new CreatePostSuccess();
                })
                .catch(err => {
                    this.snackbar.open(err.message, 'Close', {
                        duration: 4000
                    });
                    return new CreatePostFailed({ error: err });
                })
        })
    );

    /** Get Post Info */
    @Effect() postInfo$ = this.actions$.pipe(
        ofType<PostInfo>(ActionTypes.PostInfo),
        map(data => data.payload),
        switchMap(({ userId, id }) => {
            return this.postService.fetchPostById(userId, id)
                .pipe(
                    map(post => {
                        return new PostInfoSuccess({post});
                    }),
                    catchError(err => {
                        this.navigator.postList();
                        return [new PostInfoFailed({ error: err })];
                    })
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
                    this.snackbar.open(err.message, 'Close', {
                        duration: 3000
                    });
                    this.navigator.home()
                    return [new AllPostsFailed({ error: err })];
                })
            );
        })
    );

    /** Get All Posts By Specific User */
    @Effect() getUserPosts$ = this.actions$.pipe(
        ofType<UserPosts>(ActionTypes.GetUserPosts),
        map(data => data.payload),
        switchMap(userId => {
            return this.postService.fetchUserPosts(userId).pipe(
                map(posts => {
                    return new UserPostsSuccess({ posts });
                }),
                catchError(err => {
                    this.snackbar.open(err.message + ' from get User Posts', 'Close', {
                        duration: 3000
                    });
                    return [new UserPostsFailed({ error: err })];
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

                    // this.navigator.myJournal()
                    return new DeletePostSuccess();
                })
                .catch(err => {
                    this.snackbar.open(err.message, 'Close', {
                        duration: 3000
                    });
                    return [new DeletePostFailed({ error: err })]
                });
        })
    );

    /** Like Post */
    @Effect() likePost$ = this.actions$.pipe(
        ofType<LikePost>(ActionTypes.LikePost),
        map(data => data.payload),
        switchMap(({ post, id }) => {
            return this.postService.likePost(post, id)
                .then(() => {
                    return new LikePostSuccess();
                })
                .catch(err => [new LikePostFailed({ error: err })]);
        })
    );
}