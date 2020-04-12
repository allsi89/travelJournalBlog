import { IState } from './reducer';

export const getErrorMessage = (state: IState) => state.errorMessage;
export const getRequestedUser = (state: IState) => state.requestedUser;