import React from 'react';
import {UserItemProps} from "../../models/props/UserItemProps";
import classNames from "classnames";
import {getUserName} from "../../utils/User";
import {Avatar, Name} from "../index";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import './UserItem.scss';

const UserItem: React.FC<UserItemProps> = (props) => {
    const {store} = React.useContext(Context);

    if (props.profile.id) {
        return (
            <div
                className={classNames('users__item', {
                    'users__item--online' : true,
                    'users__item--active':
                        store.getViewedUserProfileId() === props.profile.id
                })}
                onClick={() => {

                    if (store.getViewedUserProfileId() === props.profile.id) {
                        store.setViewedUserProfileId(null);
                    } else {
                        store.setViewedUserProfile({
                            ...store.getViewedUserProfile(),
                            ...props.profile
                        });
                        store.setViewedUserProfileId(props.profile.id);
                    }
                }}
            >
                <div className="users__item--avatar">
                    <Avatar
                        contentList={props.profile.content}
                        alt={getUserName(props.profile)}
                        stringForFirstCharacter={getUserName(props.profile)}
                        stringForGenerateColor={props.profile.id}
                    />
                </div>
                <div className="users__item-info">
                    <div className="users__item-info-top">
                        <p className='users__item-name'>
                            <Name user={props.profile} multiChat={false} />
                        </p>
                    </div>
                    <div className='users__item-info-bottom'>
                        <p>{props.profile.nickname}</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<></>);
    }
}

export default observer(UserItem);