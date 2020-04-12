import { IAction } from 'src/app/core/interfaces/action';
import { IUser } from 'src/app/core/interfaces/user';


export const ActionTypes = {
    CreateUser: "[USER] Create User",
    CreateUserSuccess: "[USER] Create User Success",
    CreateUserFailed: "[USER] Create User Failed",
    UserById: "[USER] Get User By Id",
    UserByIdSuccess: "[USER] Get User By Id Success",
    UserByIdFailed: "[USER] Get User By Id Failed",
  };

  /** Get User By Id */
  export class UserById implements IAction<string> {
    type = ActionTypes.UserById;
    constructor(public payload: string) { }
  }
  
  export class UserByIdSuccess implements IAction<IUser> {
    type = ActionTypes.UserByIdSuccess;
    constructor(public payload: IUser) { }
  }
  
  export class UserByIdFailed implements IAction<{ error: any }> {
    type = ActionTypes.UserByIdFailed;
    constructor(public payload: { error: any }) { }
  }

  export type Actions = 
  UserById 
  | 
  UserByIdSuccess 
  | 
  UserByIdFailed ;
  