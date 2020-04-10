import { Actions, ActionTypes, CreatePostSuccess, AllPostsSuccess, UserPostsSuccess, UserPosts, PostInfoSuccess, SetUserByPosts, DeletePostSuccess } from './actions';
import { IPost } from 'src/app/core/interfaces/post';
import { IUser } from 'src/app/core/interfaces/user';

export interface IState {
    errorMessage: string;
    postDetail: IPost;
    createdPostId: string;
    postList: IPost[];
    userPostList: IPost[];
    userByPosts: IUser;
}

const initialState: IState = {
    errorMessage: null,
    postDetail: null,
    createdPostId: null,
    postList: null,
    userPostList: null,
    userByPosts: null
}

export function reducer(state = initialState, action: Actions): IState {
    switch (action.type) {
        case ActionTypes.CreatePostSuccess: {
            const data = (action as CreatePostSuccess).payload;
            return { ...state, createdPostId: data.id };
        }
        case ActionTypes.PostInfoSuccess: {
            const post = (action as PostInfoSuccess).payload;
            return { ...state, postDetail: post };
        }
        case ActionTypes.GetAllPostsSuccess: {
            const posts = (action as AllPostsSuccess).payload;
            return { ...state, postList: posts }
        }
        case ActionTypes.GetUserPosts: {
            const user = (action as UserPosts).payload;
            return { ...state, userByPosts: user }
        }
        case ActionTypes.GetUserPostsSuccess: {
            const posts = (action as UserPostsSuccess).payload;
            return { ...state, userPostList: posts }
        }
        case ActionTypes.DeletePostSuccess: {
            return { ...state};
        }
        case ActionTypes.SetUserByPosts: {
            const user = (action as SetUserByPosts).payload;
            return { ...state, userByPosts: { ...user, email: null } };
        }
        // case ActionTypes.LikePostSuccess: {
        //     const post = (action as LikePostSuccess).payload;
        //     return { ...state };
        // }
    }
    return state;
}