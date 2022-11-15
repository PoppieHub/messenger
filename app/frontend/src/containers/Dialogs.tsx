import React from "react";
import {Dialogs as DialogList} from "../components/";
import {DialogsProps} from "../models/props/DialogsProps";
import {getOtherUserForNotMultiChat} from "../utils/Membership";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getUserName} from "../utils/User";

const Dialogs:React.FC<DialogsProps> = ({chatsList}) => {
    const {store} = React.useContext(Context);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [sort, setSort] = React.useState(Array.from(chatsList.items));

    const onChangeInput = (value: string = '') => {
        setSort(
            chatsList.items.filter(
                (dialog) => (
                    (dialog.multiChat)? dialog.name.toLowerCase().indexOf(value.toLowerCase()):
                        getUserName(
                            dialog.membership?
                                getOtherUserForNotMultiChat(store, dialog.membership):
                                store.getProfile()
                        ).toLowerCase().indexOf(value.toLowerCase()) >= 0
                )
            ),
        );

        setInputValue(value);
    };

    return <DialogList
        chatsList={{items: sort}}
        onSearch={onChangeInput}
        inputValue={inputValue}
    />;
};

export default observer(Dialogs);