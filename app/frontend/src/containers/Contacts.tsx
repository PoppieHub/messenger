import React from "react";
import {ContactsBlock} from "../components/";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {ContactListResponse} from "../models/response/ContactListResponse";

const Contacts:React.FC = (props) => {
    const {store} = React.useContext(Context);
    const [flag, setFlag] = React.useState<boolean>(false);

    const [addRequests, setAddRequests] = React.useState<ContactListResponse>(),
          [sentRequests, setSentRequests] = React.useState<ContactListResponse>(),
          [allRequests, setAllRequests] = React.useState<ContactListResponse>();

    React.useEffect(() => {
        if (!flag && store.getChats().items === undefined) {
            store.getChatsFromAPI().then();
        } else {
            setFlag(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {

        let tempAddRequests = {items: []} as ContactListResponse,
            tempSentRequests = {items: []} as ContactListResponse,
            tempAllRequests = {items: []} as ContactListResponse;

        if (store.getContacts() && store.getContacts().items) {
            store.getContacts().items.forEach((item, index) => {
                if (item.toUser.id === store.getProfile().id && !item.status) {
                    tempAddRequests.items[index] = item;
                } else if (item.fromUser.id === store.getProfile().id && !item.status) {
                    tempSentRequests.items[index] = item;
                } else {
                    tempAllRequests.items[index] = item;
                }
            });
        }

        setAddRequests({
            ...addRequests,
            ...tempAddRequests
        });
        setSentRequests({
            ...sentRequests,
            ...tempSentRequests
        });
        setAllRequests({
            ...allRequests,
            ...tempAllRequests
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.contacts]);


    return (
        <ContactsBlock
            currentUser={store.getProfile()}
            addRequestList={addRequests || {items: []}}
            sentRequestList={sentRequests || {items: []}}
            allAcceptedList={allRequests || {items: []}}
        />
    );

};

export default observer(Contacts);