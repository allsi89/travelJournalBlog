import { IState } from './reducer';

export const getUploadUrl = (state: IState) => state.uploadedFileUrl;
export const getUserErrorMessage = (state: IState) => state.errorMessage;