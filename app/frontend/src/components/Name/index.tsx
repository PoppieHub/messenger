import React from "react";
import {getUserName} from "../../utils/User";
import {NameProps} from "../../models/props/NameProps";
import "./Name.scss";

const Name: React.FC<NameProps> = ({chatName, multiChat, user}) => {

    if (chatName && chatName.length > 0 && multiChat) {
        return (
            <>{chatName}</>
        );
    } else if (multiChat === false && user) {
        return (
            <>{getUserName(user)}</>
        );
    } else {
        if (user) {
            return (
                <div className='message__name'>
                    {(user.firstName)
                        ?<p className='message__name--normalName'>{user.firstName}</p>
                        :<p className='message__name--nickname'>{user.nickname}</p>
                    }
                </div>
            );
        } else {
            return (<></>);
        }
    }
}

export default Name;
