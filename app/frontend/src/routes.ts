export const baseUrl = () => {
    return `${process.env.REACT_APP_BACKEND_URL + '/api/v1/'}`;
}

export const exceptionUrl = () => {
    return baseUrl() + 'auth/';
}

/* <Security API */
export const signUp = () => {
    return baseUrl() + 'auth/signUp';
}

export const signIn = () => {
    return baseUrl() + 'auth/login';
}

export const logout = () => {
    return baseUrl() + 'auth/logout';
}

export const forgotPassword = () => {
    return baseUrl() + 'auth/forgot_password/';
}

export const refreshToken = () => {
    return baseUrl() + 'auth/refresh';
}

/* Security API> */

/* <User API */
export const profile = () => {
    return baseUrl() + 'user/profile';
}
/* User API> */