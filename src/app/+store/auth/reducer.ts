import { ActionTypes, LoginSuccess, SetUser } from "./actions";
import { Actions } from "./actions";

export interface IState {
    user: {userId: string, username: string};
    errorMessage: string;
}

const initialState: IState = {
    user: null,
    errorMessage: null
};

export function reducer(state = initialState, action: Actions) : IState {
    switch(action.type) {
        case ActionTypes.SetUser: {
            const user = (action as SetUser).payload;
            return {...state, user };
        }
        case ActionTypes.LoginSuccess: {
            const user = (action as LoginSuccess).payload;
            return { ...state, user };
        }
        case ActionTypes.LogoutSuccess: {
            return initialState;
        }
        case ActionTypes.RegisterSuccess: {
            return {... state};
        }
    }
    return state;
}