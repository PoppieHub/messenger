import {MessagesListResponse} from "../../models/response/MessagesListResponse";
import {UserListItem} from "../../models/response/UserListItem";
import {ContentListResponse} from "../../models/response/ContentListResponse";
import {MessagesListItem} from "../../models/response/MessagesListItem";

export const fakeMessageListResponse = ():MessagesListResponse => {
    let userFirst: UserListItem = {
        id: '12',
        email: 'test7@test.com',
        nickname: 'testNicknameTest',
        firstName: '',
        lastName: 'TestLastName',
        verified: true,
        content: {
            items: [
                {id: '1', link: 'https://sun9-19.userapi.com/impg/z6uhkAgx2KhgretMc8a8YzxasZqxnpoR1xouEw/edMDxXBLi4Y.jpg?size=1241x932&quality=96&sign=9c9ce6c17bb3106fc647cbc1ca2c854a&type=album', avatar: true},
                {id: '2', link: 'https://lelolobi.com/wp-content/uploads/2021/11/Test-Logo-Small-Black-transparent-1-1.png', avatar: true}
            ]
        },
        hideEmail: false
    };

    let userSecond: UserListItem = {
        id: '13',
        email: 'dvdv@dsfdsvd.fsf',
        nickname: 'vdfvfdvfdvd',
        firstName: 'TestSecondName',
        lastName: 'TestSecondName',
        verified: true,
        content: {
            items: [
                {id: '1', link: 'https://lelolobi.com/wp-content/uploads/2021/11/Test-Logo-Small-Black-transparent-1-1.png', avatar: true},
                {id: '2', link: 'https://sun9-19.userapi.com/impg/z6uhkAgx2KhgretMc8a8YzxasZqxnpoR1xouEw/edMDxXBLi4Y.jpg?size=1241x932&quality=96&sign=9c9ce6c17bb3106fc647cbc1ca2c854a&type=album', avatar: true}
            ]
        },
        hideEmail: true
    };

    let contentList: ContentListResponse = {
        items: [
            {
                id:'4',
                link: 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=100&q=60&w=100'
            },
            {
                id:'5',
                link: 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=200&q=60&w=200'
            },
            {
                id:'6',
                link: 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=300&q=60&w=300'
            }
        ]
    };

    let firstMessage: MessagesListItem = {
        id: '1',
        user: userFirst,
        read: {
            items: []
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

    let secondMessage: MessagesListItem = {
        id: '2',
        user: userSecond,
        read: {
            items: [
                {
                    id: '1',
                    user: userFirst
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
        created_at: new Date().getTime()-1000000,
        updated_at: new Date().getTime()-500000,
    };

    return (
        {
            items: [
                firstMessage,
                secondMessage
            ]
        }
    );
}

export default fakeMessageListResponse();