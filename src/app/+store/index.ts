import { createFeatureSelector, createSelector } from "@ngrx/store";
import { reducer as AuthReducer, IState as IAuthState } from "./auth/reducer";
import { reducer as UserReducer, IState as IUserState } from "./user/reducer";
import { reducer as PostReducer, IState as IPostState } from "./post/reducer";
import { reducer as UploadReducer, IState as IUploadState } from "./upload/reducer";
import * as auth from './auth/selectors';
import * as user from './user/selectors';
import * as upload from './upload/selectors';
import * as post from './post/selectors';

export const reducers = {
    auth: AuthReducer,
    user: UserReducer,
    post: PostReducer,
    upload: UploadReducer

};

export interface IAppState {
    auth: IAuthState;
    user: IUserState;
    post: IPostState;
    upload: IUploadState;
}

/* Auth Selectors */
export const getAuthStore = createFeatureSelector ('auth');
export const getAuthUserSelector = createSelector(getAuthStore, auth.getUser);
export const getAuthErrorMessage = createSelector(getAuthStore, auth.getErrorMessage);
export const getIsAuthenticated = createSelector(getAuthUserSelector, user => !!user );

/* Upload Selectors */
export const getUploadStore = createFeatureSelector('upload');
export const UploadDataSelector = createSelector(getUploadStore, upload.getUploadData);

/* Post Selectors */
export const getPostStore = createFeatureSelector('post');
export const getPostInfoSelector = createSelector(getPostStore, post.getPostInfo);
export const getAllPostsSelector = createSelector(getPostStore, post.getAllPosts);
export const getUserPostsSelector = createSelector(getPostStore, post.getUserPosts);

/** UserSelectors */
export const getUserStore = createFeatureSelector ('user');
export const getRequestedUserSelector = createSelector(getUserStore, user.getRequestedUser);





