import React from "react";
import {FindUsers as FindUsersList} from "../components/";
import {UsersListResponse} from "../models/response/UsersListResponse";
import {UserService} from "../services";

const FindUsers:React.FC = (props) => {
    const [usersList, setUsersList] = React.useState<UsersListResponse>({items: []});
    const [inputValue, setInputValue] = React.useState<string>('');

    const onChangeInput = (value: string = '') => {
        if (value.length !== 0) {
            (async function() {
                await UserService.FindUsers({searchValue: value}).then((res: any) => {
                    if (res.status === 200) {
                        setUsersList({
                            ...usersList,
                            items: res.data.items
                        });
                    }
                });
            })()
        } else {
            setUsersList({items: []});
        }

        setInputValue(value);
    };

    return <FindUsersList
        users={usersList}
        onSearch={onChangeInput}
        inputValue={inputValue}
    />;

};

export default FindUsers;