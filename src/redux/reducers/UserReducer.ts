export interface UserReduxState {
    isLoggedIn: boolean,
    email: string | undefined,
    id: string | undefined
}

const intialState: UserReduxState = {
    isLoggedIn : false,
    email: undefined,
    id:   undefined
}

const makeUserLogin = (state:UserReduxState, user:any) => {
    return {...state, isLoggedIn: true, email: user?.email, id: user?.id};
}
const makeUserLogout = (state:UserReduxState) => {
    return {...state, isLoggedIn: false, email: undefined, id: undefined};
}
export default ((state:UserReduxState=intialState, action?:{type:string, user?:any}) => {
    let actions:{[key:string] : Function} = {
        "DO_LOGIN" : makeUserLogin,
        "DO_LOGOUT": makeUserLogout
    };
    return action && action.type in actions ? actions[action.type](state, action?.user) : state;
});