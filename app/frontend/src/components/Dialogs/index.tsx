import React from 'react';
import {DialogsProps} from "../../models/props/DialogsProps";
import { ChatsListItem } from '../../models/response/ChatsListItem';
import {DialogItem} from "../index";
import {InputBase} from "@mui/material";
import "./Dialogs.scss";

const Dialogs: React.FC<DialogsProps> = ({chatsList, onSearch, inputValue}) => {
    return (
        <div className="dialogs">
            <div className="dialogs-item-search">
                <div className="dialogs-item-search-form">
                    <InputBase
                        className="dialogs-item-search-form-input"
                        placeholder="Поиск диалога"
                        inputProps={{ 'aria-label': 'Поиск диалога' }}
                        onChange={e => (onSearch && onSearch(e.target.value))}
                        value={inputValue}
                    />
                </div>
            </div>
            {
                //Сортировка по времени
                (chatsList.items && chatsList.items.length > 0 && chatsList.items.sort((firstItem: ChatsListItem, secondItem: ChatsListItem):any => {
                    if (firstItem.lastMessage?.createdAt! && secondItem.lastMessage?.createdAt!) {
                        return (
                                secondItem.lastMessage.createdAt -
                                firstItem.lastMessage.createdAt
                        );
                    } else {
                        return (
                            (firstItem.lastMessage?.createdAt!)?
                                firstItem.id - secondItem.id:
                                secondItem.id - firstItem.id
                        );
                    }
                }).map((item) =>
                    <DialogItem key={item.id} chat={item} />
                )) || (
                        <div className="dialogs-item">
                            <span className="dialogs-item-title">Список диалогов пуст</span>
                            <div className="dialogs-item--noData" />
                        </div>
                )
            }
        </div>
    );
}

export default Dialogs;