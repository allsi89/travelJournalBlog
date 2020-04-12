import {
    Actions,
    ActionTypes,
    AllPostsSuccess,
    UserPostsSuccess,
    PostInfoSuccess
} from './actions';
import { IPost } from 'src/app/core/interfaces/post';

export interface IState {
    errorMessage: string;
    postDetail: IPost;
    postList: IPost[];
    userPostList: IPost[];
}

const initialState: IState = {
    errorMessage: null,
    postDetail: null,
    postList: null,
    userPostList: null,
}

export function reducer(state = initialState, action: Actions): IState {
    switch (action.type) {
        case ActionTypes.CreatePostSuccess: {
            return { ...state };
        }
        case ActionTypes.PostInfoSuccess: {
            const post = (action as PostInfoSuccess).payload.post;
            return { ...state, postDetail: post };
        }
        case ActionTypes.GetAllPostsSuccess: {
            const posts = (action as AllPostsSuccess).payload;
            return { ...state, postList: posts }
        }
        case ActionTypes.GetUserPostsSuccess: {
            const posts = (action as UserPostsSuccess).payload.posts;
            return { ...state, userPostList: posts }
        }
        case ActionTypes.DeletePostSuccess: {
            return { ...state };
        }
    }
    return state;
}