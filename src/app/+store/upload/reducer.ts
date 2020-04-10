import { Actions, ActionTypes, UploadFileSuccess } from './actions';

export interface IState {
    uploadedFileData: {url: string, name: string};
    errorMessage: string;
}

const initialState: IState = {
    uploadedFileData: null,
    errorMessage: null
}

export function reducer(state = initialState, action: Actions): IState {
    switch(action.type) {
        case ActionTypes.UploadFileSuccess: {
            const {url, name} = (action as  UploadFileSuccess).payload;
            return {...state, uploadedFileData: {url, name}};
        }
    }
    return state;
}