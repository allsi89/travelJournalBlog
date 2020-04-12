import { Actions, ActionTypes, UserByIdSuccess } from './actions';
import { IUser } from 'src/app/core/interfaces/user';

export interface IState {
    errorMessage: string;
    requestedUser: IUser;
}

const initialState: IState = {
    errorMessage: null,
    requestedUser: null
}

export function reducer(state = initialState, action: Actions): IState {
    switch (action.type) {
        case ActionTypes.UserByIdSuccess: {
            const requestedUser = (action as UserByIdSuccess).payload;
            return { ...state, requestedUser };
        }
    }
    return state;
}