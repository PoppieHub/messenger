import React from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {EmptySelectedUser, UserProfile} from "../components";

const Contact:React.FC = () => {
    const {store} = React.useContext(Context);

    if (store.getViewedUserProfileId()
        && store.getViewedUserProfile()) {
        return (
            <UserProfile
                profile={store.getViewedUserProfile()}
                selfProfile={false}
            />
        );
    } else {
        return (<EmptySelectedUser />);
    }
};

export default observer(Contact);