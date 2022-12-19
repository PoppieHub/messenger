import React from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Messages as MessagesList} from "../components/";

const Messages:React.FC = () => {
    const {store} = React.useContext(Context);
    const messagesRef = React.useRef<null | HTMLDivElement>(null);

    React.useEffect(() => {
        if (messagesRef.current!) {
           messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
        }
    }, [store.currentDialog.messages]);

    if (store.getCurrentDialog().messages && store.getViewedDialogId() !== null) {
        return (<MessagesList MessagesRef={messagesRef} messages={store.getCurrentDialog().messages} />);
    } else {
        return (<MessagesList />);
    }
};

export default observer(Messages);