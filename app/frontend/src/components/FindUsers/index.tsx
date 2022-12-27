import React from 'react';
import {Users} from "../index";
import {InputBase} from "@mui/material";
import {FindUsersProps} from "../../models/props/FindUsersProps";
import "./FindUsers.scss";

const FindUsers: React.FC<FindUsersProps> = ({users, onSearch, inputValue}) => {
    return (
        <div className="users">
            <div className="users-item-search">
                <div className="users-item-search-form">
                    <InputBase
                        className="users-item-search-form-input"
                        placeholder="Поиск пользователя"
                        inputProps={{ 'aria-label': 'Поиск поьзователя по email или nickname' }}
                        onChange={e => (onSearch && onSearch(e.target.value))}
                        value={inputValue}
                    />
                </div>
            </div>
            <Users users={users} />
        </div>
    );
}

export default FindUsers;