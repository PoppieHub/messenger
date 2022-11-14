import React from 'react';
import {DialogsProps} from "../../models/props/DialogsProps";
import { ChatsListItem } from '../../models/response/ChatsListItem';
import {DialogItem} from "../index";
import styles from "./Dialogs.module.scss";

const Dialogs: React.FC<DialogsProps> = ({chatsList}) => {
    return (
        <div className={styles.dialogs}>
            {
                //Сортировка по времени
                chatsList.items.sort((firstItem: ChatsListItem,secondItem: ChatsListItem):any => {
                    if (firstItem.lastMessage && secondItem.lastMessage &&
                        firstItem.messages && firstItem.messages.items.length > 0 &&
                        secondItem.messages && secondItem.messages.items.length > 0
                    ) {
                        return secondItem.lastMessage.created_at - firstItem.lastMessage.created_at;
                    } else {
                        return (firstItem.messages && firstItem.messages.items.length > 0)?
                            Number(firstItem.id) - Number(secondItem.id):
                            Number(secondItem.id) - Number(firstItem.id);
                    }
                }).map((item) =>
                    <DialogItem key={item.id} chat={item} />
                )
            }
        </div>
    );
}

export default Dialogs;