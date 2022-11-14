import React from "react";
import {UserStatusProps} from "../../models/props/UserStatusProps";
import './UserStatus.scss';
import classNames from "classnames";

const UserStatus: React.FC<UserStatusProps> = (props) => {
    return (
        <span className={
            classNames('status', {"status--online": props.status})
        }>
            {(props.status)? 'в сети': 'не в сети'}
        </span>
    );
}

export default UserStatus;