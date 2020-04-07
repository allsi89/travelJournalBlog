import { IState } from "./reducer";

export const getUser = (state: IState) => state.user;
export const getErrorMessage = (state: IState) => state.errorMessage;