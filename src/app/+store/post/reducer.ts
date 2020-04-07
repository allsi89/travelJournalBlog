import { Actions, ActionTypes, CreatePostSuccess,  DeletePost, LikePost } from './actions';
import { IPost } from 'src/app/core/interfaces/post';
import { IUser } from 'src/app/core/interfaces/user';

export interface IState {
    errorMessage: string;
    postList: IPost[];
    userPostList: IPost[];
    userByPosts: IUser;
}

const initialState: IState = {
    errorMessage: null,
    postList: null,
    userPostList: null,
    userByPosts: null
}

export function reducer(state = initialState, action: Actions): IState {
    switch (action.type) {
        case ActionTypes.CreatePostSuccess: {
            const id = (action as CreatePostSuccess).payload;
            return { ...state };
        }
        case ActionTypes.GetAllPostsSuccess: {
            const posts = action.payload;
            return { ...state, postList: posts }
        }
        case ActionTypes.GetUserPosts: {
            const user = action.payload;
            return { ...state, userByPosts: user }
        }
        case ActionTypes.GetUserPostsSuccess: {
            const posts = action.payload;
            return { ...state, userPostList: posts }
        }
        case ActionTypes.DeletePost: {
            const data = (action as DeletePost).payload;
            return { ...state };
        }
        case ActionTypes.LikePost: {
            const data = (action as LikePost).payload;
            return { ...state };
        }
    }
    return state;
}