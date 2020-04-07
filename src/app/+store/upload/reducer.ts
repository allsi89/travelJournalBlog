import { Actions, ActionTypes, UploadFileSuccess } from './actions';

export interface IState {
    uploadedFileUrl: string;
    errorMessage: string;
}

const initialState: IState = {
    uploadedFileUrl: null,
    errorMessage: null
}

export function reducer(state = initialState, action: Actions): IState {
    switch(action.type) {
        case ActionTypes.UploadFileSuccess: {
            const url = (action as  UploadFileSuccess).payload;
            return {...state, uploadedFileUrl: url};
        }
    }
    return state;
}