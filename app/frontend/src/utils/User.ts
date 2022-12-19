import {UserListItem} from "../models/response/UserListItem";

export const getUserName = (user: UserListItem): string => {
    if (user.firstName && user.lastName) {
        return `${user.firstName} ${user.lastName}`;
    }

    return user.firstName || user.lastName || user.nickname;
}

const normalFakeModelProfile = (): UserListItem => {
    return ({
        id: '0',
        email: 'test@test.com',
        nickname: 'nicknameTest',
        firstName: 'firstNameTest',
        lastName: 'lastNameTest',
        verified: true,
        hideEmail: false,
        content: {
            items: [
                {
                    id: '0',
                    link: 'string',
                    avatar: true,
                }
            ]
        }
    });
}

export const profileCompletionPercentage = (profile: UserListItem): number => {
    const maxPointer: number = Object.keys(normalFakeModelProfile()).length + 1;
    let pointer: number = 0;

    Object.values(profile).forEach((item) => {
        if (typeof item !== null && typeof item !== undefined) {
            pointer++;
        }
    });

    if (profile.content && profile.content?.items.length > 0) {
        pointer++;
    }

    return (pointer === 0)? 0: pointer / maxPointer * 100;
}