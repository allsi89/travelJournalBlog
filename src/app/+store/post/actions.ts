import { IAction } from 'src/app/core/interfaces/action';
import { IPost } from 'src/app/core/interfaces/post';

export const ActionTypes = {
  CreatePost: "[POST] Create Post",
  CreatePostSuccess: "[POST] Create Post Success",
  CreatePostFailed: "[POST] Create Post Failed",
  PostInfo: "[POST] Get Post Info",
  PostInfoSuccess: "[POST] Get Post Info Success",
  PostInfoFailed: "[POST] Get Post Info Failed",
  GetAllPosts: "[POST] Get All Posts",
  GetAllPostsSuccess: "[POST] Get All Posts Success",
  GetAllPostsFailed: "[POST] Get All Posts Failed",
  GetUserPosts: "[POST] Get User Posts",
  GetUserPostsSuccess: "[POST] Get User Posts Success",
  GetUserPostsFailed: "[POST] Get User Posts Failed",
  DeletePost: "[POST] Delete Post",
  DeletePostSuccess: "[POST] Delete Post Success",
  DeletePostFailed: "[POST] Delete Post Failed",
  LikePost: "[POST] Like Post",
  LikePostSuccess: "[POST] Like PostSuccess",
  LikePostFailed: "[POST] Like Post Failed",
  SetUserByPosts: "[POST] Set User By Posts",
};

/** Create Post */
export class CreatePost implements IAction<IPost> {
  type = ActionTypes.CreatePost;
  constructor(public payload: IPost) { }
}

export class CreatePostSuccess implements IAction<null> {
  type = ActionTypes.CreatePostSuccess;
  constructor(public payload: null = null) { }
}

export class CreatePostFailed implements IAction<{ error: any }> {
  type = ActionTypes.CreatePostFailed;
  constructor(public payload: { error: any }) { }
}

/** Get Post Info */
export class PostInfo implements IAction<{ userId: string, id: string }> {
  type = ActionTypes.PostInfo;
  constructor(public payload: { userId: string, id: string }) { }
}

export class PostInfoSuccess implements IAction<{post: IPost}> {
  type = ActionTypes.PostInfoSuccess;
  constructor(public payload: {post: IPost}) { }
}

export class PostInfoFailed implements IAction<{ error: any }> {
  type = ActionTypes.PostInfoFailed;
  constructor(public payload: { error: any }) { }
}

/** Get All Posts */
export class AllPosts implements IAction<null> {
  type = ActionTypes.GetAllPosts;
  constructor(public payload: null = null) { }
}

export class AllPostsSuccess implements IAction<IPost[]> {
  type = ActionTypes.GetAllPostsSuccess;
  constructor(public payload: IPost[]) { }
}

export class AllPostsFailed implements IAction<{ error: any }> {
  type = ActionTypes.GetAllPostsFailed;
  constructor(public payload: { error: any }) { }
}

/** Get All Posts By Specific User*/
export class UserPosts implements IAction<string> {
  type = ActionTypes.GetUserPosts;
  constructor(public payload: string) { }
}

export class UserPostsSuccess implements IAction<{ posts: IPost[]}> {
  type = ActionTypes.GetUserPostsSuccess;
  constructor(public payload: { posts: IPost[]}) { }
}

export class UserPostsFailed implements IAction<{ error: any }> {
  type = ActionTypes.GetUserPostsFailed;
  constructor(public payload: { error: any }) { }
}

/** Delete Post */
export class DeletePost implements IAction<IPost> {
  type = ActionTypes.DeletePost;
  constructor(public payload: IPost) { }
}

export class DeletePostSuccess implements IAction<null> {
  type = ActionTypes.DeletePostSuccess;
  constructor(public payload: null = null) { }
}

export class DeletePostFailed implements IAction<{ error: any }> {
  type = ActionTypes.DeletePostFailed;
  constructor(public payload: { error: any }) { }
}

/** Like Post */
export class LikePost implements IAction<{ post: IPost, id: string }> {
  type = ActionTypes.LikePost;
  constructor(public payload: { post: IPost, id: string }) { }
}

export class LikePostSuccess implements IAction<null> {
  type = ActionTypes.LikePostSuccess;
  constructor(public payload: null = null) { }
}

export class LikePostFailed implements IAction<{ error: any }> {
  type = ActionTypes.LikePostFailed;
  constructor(public payload: { error: any }) { }
}

export type Actions =
  CreatePost
  |
  CreatePostSuccess
  |
  CreatePostFailed
  |
  AllPosts
  |
  AllPostsSuccess
  |
  AllPostsFailed
  |
  UserPosts
  |
  UserPostsSuccess
  |
  UserPostsFailed
  |
  DeletePost
  |
  DeletePostSuccess
  |
  DeletePostFailed
  |
  LikePost
  |
  LikePostSuccess
  |
  LikePostFailed;


