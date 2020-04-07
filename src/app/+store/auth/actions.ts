import { IAction } from 'src/app/core/interfaces/action';

export const ActionTypes = {
  Register: "[AUTH] Register",
  RegisterSuccess: "[AUTH] Register Success",
  RegisterFailed: "[AUTH] Register Failed",
  Login: "[AUTH] Login",
  LoginSuccess: "[AUTH] Login Success",
  LoginFailed: "[AUTH] Login Failed",
  Logout: "[AUTH] Logout",
  LogoutSuccess: "[AUTH] LogoutSuccess",
  LogoutFailed: "[AUTH] LogoutFailed",
  SetUser: "[AUTH] Set User"
};

/** Register */
export class Register implements IAction<{ email: string, password: string, username: string }> {
  type = ActionTypes.Register;
  constructor(public payload: { email: string, password: string, username: string }) { }
}

export class RegisterSuccess implements IAction<null> {
  type = ActionTypes.RegisterSuccess;
  constructor(public payload: null = null) { }
}

export class RegisterFailed implements IAction<{ error: any }> {
  type = ActionTypes.RegisterFailed;
  constructor(public payload: { error: any }) { }
}

/** Login */
export class Login implements IAction<{ email: string, password: string }> {
  type = ActionTypes.Login;
  constructor(public payload: { email: string, password: string }) { }
}

export class LoginSuccess implements IAction<{ userId: string, username: string }> {
  type = ActionTypes.LoginSuccess;
  constructor(public payload: { userId: string, username: string }) { }
}

export class LoginFailed implements IAction<{ error: any }> {
  type = ActionTypes.LoginFailed;
  constructor(public payload: { error: any }) { }
}

/** Logout */
export class Logout implements IAction<null> {
  type = ActionTypes.Logout;
  constructor(public payload: null = null) { }
}

export class LogoutSuccess implements IAction<null> {
  type = ActionTypes.LogoutSuccess;
  constructor(public payload: null = null) { }
}

export class LogoutFailed implements IAction<{ error: any }> {
  type = ActionTypes.LogoutFailed;
  constructor(public payload: { error: any }) { }
}

/** Set logged in user */
export class SetUser implements IAction<{ userId: string, username: string }> {
  type = ActionTypes.SetUser;
  constructor(public payload: { userId: string, username: string }) { }
}

export type Actions =
  Register
  | RegisterSuccess
  | RegisterFailed
  | Login
  | LoginSuccess
  | LoginFailed
  | Logout
  | LoginSuccess
  | LoginFailed
  | SetUser ;