import React from 'react';
import {UsersProps} from "../../models/props/UsersProps";
import {UserItem} from "../index";
import "./Users.scss";

const Users: React.FC<UsersProps> = (props) => {

    if (props.users && props.users.items.length > 0) {
        return (
            <div className='users-container'>
                {props.users.items.map((item) => (<UserItem key={item.id} profile={item}/>))}
            </div>
        );
    } else {
        return (<></>);
    }
}

export default Users;