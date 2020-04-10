import { IState } from './reducer';

export const getUploadData = (state: IState) => state.uploadedFileData;
export const getUserErrorMessage = (state: IState) => state.errorMessage;