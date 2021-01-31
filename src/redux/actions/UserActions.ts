const DO_LOGIN = "DO_LOGIN";
const DO_LOGOUT = "DO_LOGOUT";

export const doLogin = (user: any) => {
    return {
        type: DO_LOGIN,
        user: user
    }
}
export const doLogout = () => {
    return {
        type: DO_LOGOUT
    }
}
