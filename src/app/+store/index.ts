import { createFeatureSelector, createSelector } from "@ngrx/store";
import { reducer as AuthReducer, IState as IAuthState } from "./auth/reducer";
import { reducer as PostReducer, IState as IPostState } from "./post/reducer";
import { reducer as UploadReducer, IState as IUploadState } from "./upload/reducer";
import * as auth from './auth/selectors';
import * as upload from './upload/selectors';
import * as post from './post/selectors';

export const reducers = {
    auth: AuthReducer,
    post: PostReducer,
    upload: UploadReducer
};

export interface IAppState {
    auth: IAuthState;
    post: IPostState;
    upload: IUploadState;
}

/* Auth Selectors */
export const getAuthStore = createFeatureSelector ('auth');
export const getAuthUser = createSelector(getAuthStore, auth.getUser);
export const getAuthErrorMessage = createSelector(getAuthStore, auth.getErrorMessage);
export const getIsAuthenticated = createSelector(getAuthUser, user => !!user );

/* Upload Selectors */
export const getUploadStore = createFeatureSelector('upload');
export const getUploadUrl = createSelector(getUploadStore, upload.getUploadUrl);

/* Post Selectors */
export const getPostStore = createFeatureSelector('post');
export const getAllPostsSelector = createSelector(getPostStore, post.getAllPosts);
export const getUserPostsSelector = createSelector(getPostStore, post.getUserPosts);
export const getUserByPostsSelector = createSelector(getPostStore, post.getUserByPosts);






