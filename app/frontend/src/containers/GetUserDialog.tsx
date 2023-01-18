import React from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {GetUserDialog as GetUserDialogComponent} from "../components";
import {UserProfileProps} from "../models/props/UserProfileProps";
import {browserRouteIm} from "../routes";
import {useNavigate} from "react-router-dom";

const GetUserDialog: React.FC<UserProfileProps> = (props) => {
    const {store} = React.useContext(Context);
    const navigate = useNavigate();

    const handleOnClick = () => {
        store.getDialogOrNewFromAPI(props.profile).then((chat) => {
            if (chat) {
                store.setCurrentDialog({
                    ...store.getCurrentDialog(),
                    ...chat
                });
                store.setViewedDialogId(chat.id);
                navigate(browserRouteIm);
            }
        });
    }

    if (!props.selfProfile) {
        return (
            <GetUserDialogComponent callback={handleOnClick} />
        );
    } else {
        return (<></>);
    }
}

export default observer(GetUserDialog);