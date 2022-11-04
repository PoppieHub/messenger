export const browserRouteAuth = '/auth';
export const browserRouteHome = '/im/';

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
    return baseUrl() + 'user/profile/';
}

export const changeProfile = () => {
    return baseUrl() + 'user/changeProfile/';
}

export const uploadAvatar = () => {
    return baseUrl() + 'user/uploadAvatar/';
}

export const findUsers = () => {
    return baseUrl() + 'user/find';
}

export const deleteUser = () => {
    return baseUrl() + 'user/delete';
}
/* User API> */

/* <Contact API */
export const getContacts = () => {
    return baseUrl() + 'user/getContacts/';
}

export const addContact = (otherUserId: string) => {
    return baseUrl() + 'user/addContact/' + otherUserId;
}

export const acceptContact = (contactId: string) => {
    return baseUrl() + 'user/acceptContact/' + contactId;
}

export const deleteContact = (contactId: string) => {
    return baseUrl() + 'user/delete_contact/' + contactId;
}
/* Contact API> */

/* <ReadMessage API */
export const deleteReadMessages = () => {
    return baseUrl() + 'readMessage/remove';
}

export const addReadMessage = () => {
    return baseUrl() + 'readMessage/add';
}
/* ReadMessage API> */

/* <Message API */
export const deleteMessages = () => {
    return baseUrl() + 'message/remove';
}

export const addMessage = () => {
    return baseUrl() + 'message/addMessage';
}

export const updateMessage = () => {
    return baseUrl() + 'message/updateMessage';
}

export const searchMessage = () => {
    return baseUrl() + 'message/searchMessage';
}
/* Message API> */

/* <Membership API */
export const addMembershipForMultiChat = (userId: string, chatId: string) => {
    return baseUrl() + `membership/add/userId/${userId}/chatId/${chatId}`;
}

export const updateNotification = (chatId: string, notification: boolean) => {
    return baseUrl() + `membership/update/chatId/${chatId}/notification/${notification}`;
}

export const deleteMembership = (membershipId: string) => {
    return baseUrl() + `membership/remove/${membershipId}`;
}
/* Membership API> */

/* <Content API */
export const deleteContent = (contentId: string) => {
    return baseUrl() + `content/remove/${contentId}`;
}

export const uploadImage = () => {
    return baseUrl() + 'content/upload/image';
}

export const uploadFile = () => {
    return baseUrl() + 'content/upload/file';
}
/* Content API> */

/* <Chat API */
export const getChats = () => {
    return baseUrl() + 'chats/';
}

export const newMultiChat = () => {
    return baseUrl() + 'chats/newMultiChat';
}

export const updateMultiChat = () => {
    return baseUrl() + 'chats/updateMultiChat';
}

export const uploadAvatarForChat = (chatId: string) => {
    return baseUrl() + `chats/uploadAvatar/${chatId}`;
}

export const getChatOrNew = (otherUserId: string) => {
    return baseUrl() + `chats/getChat/otherUser/${otherUserId}`;
}

export const deleteChat = (chatId: string) => {
    return baseUrl() + `chats/remove/{chatId}`;
}
/* Chat API> */