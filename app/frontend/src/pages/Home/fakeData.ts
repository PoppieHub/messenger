import {MessagesListResponse} from "../../models/response/MessagesListResponse";
import {UserListItem} from "../../models/response/UserListItem";
import {ContentListResponse} from "../../models/response/ContentListResponse";
import {MessagesListItem} from "../../models/response/MessagesListItem";
import {ChatsListResponse} from "../../models/response/ChatsListResponse";
import {ChatsListItem} from "../../models/response/ChatsListItem";

export const fakeUserFirst: UserListItem = {
    id: '12',
    email: 'test7@test.com',
    nickname: 'testNicknameTest',
    firstName: 'vcv',
    lastName: 'TestLastName',
    verified: true,
    content: {
        items: [
            {id: '1', link: 'https://sun9-19.userapi.com/impg/z6uhkAgx2KhgretMc8a8YzxasZqxnpoR1xouEw/edMDxXBLi4Y.jpg?size=1241x932&quality=96&sign=9c9ce6c17bb3106fc647cbc1ca2c854a&type=album', avatar: true},
            {id: '2', link: 'https://lelolobi.com/wp-content/uploads/2021/11/Test-Logo-Small-Black-transparent-1-1.png', avatar: true}
        ]
    },
    hideEmail: false
}

export const fakeUserSecond: UserListItem = {
    id: '13',
    email: 'dvdv@dsfdsvd.fsf',
    nickname: 'vdfvfdvfdvd',
    firstName: 'TestSecondName',
    lastName: 'TestLastName2',
    verified: true,
    content: {
        items: [
            {id: '1', link: 'https://lelolobi.com/wp-content/uploads/2021/11/Test-Logo-Small-Black-transparent-1-1.png', avatar: true},
            {id: '2', link: 'https://sun9-19.userapi.com/impg/z6uhkAgx2KhgretMc8a8YzxasZqxnpoR1xouEw/edMDxXBLi4Y.jpg?size=1241x932&quality=96&sign=9c9ce6c17bb3106fc647cbc1ca2c854a&type=album', avatar: true}
        ]
    },
    hideEmail: true
};

export const fakeUserThird: UserListItem = {
    id: '14',
    email: 'xczc@vxcv.fsf',
    nickname: '323r23',
    firstName: '',
    lastName: 'TestLastName3',
    verified: true,
    content: {
        items: [
            {id: '1', link: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/4d/Wojak.png/200px-Wojak.png', avatar: true},
            {id: '2', link: 'https://sun9-19.userapi.com/impg/z6uhkAgx2KhgretMc8a8YzxasZqxnpoR1xouEw/edMDxXBLi4Y.jpg?size=1241x932&quality=96&sign=9c9ce6c17bb3106fc647cbc1ca2c854a&type=album', avatar: true}
        ]
    },
    hideEmail: false
};

export const contentList: ContentListResponse = {
    items: [
        {
            id:'4',
            link: 'https://upload.wikimedia.org/wikipedia/en/9/96/Meme_Man_on_transparent_background.webp',
            avatar: false
        },
        {
            id:'5',
            link: 'https://i.pinimg.com/originals/68/a7/cd/68a7cd011d98c6e6599dfe3a769465e5.jpg',
            avatar: false
        },
        {
            id:'6',
            link: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/4d/Wojak.png/200px-Wojak.png',
            avatar: false
        },
        {
            id:'7',
            link: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/4d/Wojak.png/200px-Wojak.gif',
            avatar: false
        }
    ]
};

export const firstMessage: MessagesListItem = {
    id: '1',
    user: fakeUserFirst,
    read: {
        items: [
            {
                id: '2',
                user: fakeUserThird
            }
        ]
    },
    reply: {
        items: []
    },
    body_message: {
        content: contentList,
        message: 'Тестовое сообщение 1!',
        replyMessage: {
            items: []
        }
    },
    created_at: new Date().getTime(),
};

export const secondMessage: MessagesListItem = {
    id: '2',
    user: fakeUserSecond,
    read: {
        items: [
            {
                id: '1',
                user: fakeUserFirst
            }
        ]
    },
    reply: {
        items: [firstMessage]
    },
    body_message: {
        content: contentList,
        message: 'Тестовое сообщение 2!',
        replyMessage: {
            items: [
                {id: firstMessage.id}
            ]
        }
    },
    created_at: new Date().getTime()-100000000,
    updated_at: new Date().getTime()-10000000,
};

export const fakeFirstMessageListResponse = ():MessagesListResponse => {
    return (
        {
            items: [
                firstMessage,
                secondMessage
            ]
        }
    );
};

export const fakeSecondMessageListResponse = ():MessagesListResponse => {
    return (
        {
            items: [
                secondMessage,
                firstMessage
            ]
        }
    );
};

export const firstFakeChat: ChatsListItem = {
    id: '1',
    name: 'First Test Chat',
    description: 'Fake description',
    multiChat: false,
    content: contentList,
    membership: {
        items: [
            {id: '1', notification: false, usersListItem: fakeUserFirst},
            {id: '2', notification: false, usersListItem: fakeUserThird}
        ]
    },
    messages: fakeFirstMessageListResponse(),
    lastMessage: secondMessage,
    unreadMessageCounter: 0
};

export const secondFakeChat: ChatsListItem = {
    id: '2',
    name: 'Second Test Chat',
    description: 'Fake description - second',
    multiChat: false,
    content: {
        items: [
            {id: '1', link: 'https://lelolobi.com/wp-content/uploads/2021/11/Test-Logo-Small-Black-transparent-1-1.png', avatar: true},
            {id: '2', link: 'https://sun9-19.userapi.com/impg/z6uhkAgx2KhgretMc8a8YzxasZqxnpoR1xouEw/edMDxXBLi4Y.jpg?size=1241x932&quality=96&sign=9c9ce6c17bb3106fc647cbc1ca2c854a&type=album', avatar: true}
        ]
    },
    membership: {
        items: [
            {id: '1', notification: false, usersListItem: fakeUserSecond},
            {id: '2', notification: false, usersListItem: fakeUserFirst}
        ]
    },
    messages: fakeSecondMessageListResponse(),
    lastMessage: firstMessage,
    unreadMessageCounter: 0
};

export const thirdFakeChat: ChatsListItem = {
    id: '3',
    name: 'Third Test Chat',
    description: 'Fake description - third',
    multiChat: false,
    content: {
        items: [
            {id: '2', link: 'https://sun9-19.userapi.com/impg/z6uhkAgx2KhgretMc8a8YzxasZqxnpoR1xouEw/edMDxXBLi4Y.jpg?size=1241x932&quality=96&sign=9c9ce6c17bb3106fc647cbc1ca2c854a&type=album', avatar: true}
        ]
    },
    membership: {
        items: [
            {id: '1', notification: false, usersListItem: fakeUserThird},
            {id: '2', notification: false, usersListItem: fakeUserFirst}
        ]
    },
    unreadMessageCounter: 0
};

export const fakeChatsListResponse = ():ChatsListResponse => {
    return (
        {items: [firstFakeChat, secondFakeChat, thirdFakeChat]}
    );
}
