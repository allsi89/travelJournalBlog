import { IState } from './reducer';

export const getErrorMessage = (state: IState) => state.errorMessage;
export const getPostInfo = (state: IState) => state.postDetail;
export const getAllPosts = (state: IState) => state.postList;
export const getUserPosts = (state: IState) => state.userPostList;