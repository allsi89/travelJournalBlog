import { IState } from './reducer';

export const getErrorMessage = (state: IState) => state.errorMessage;
export const getAllPosts = (state: IState) => state.postList;
export const getUserPosts = (state: IState) => state.userPostList;
export const getUserByPosts = (state: IState) => state.userByPosts;