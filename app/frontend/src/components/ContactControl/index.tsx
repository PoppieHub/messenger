import React from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {findContactOrReturnNull} from "../../utils/Contact";
import {UserProfileProps} from "../../models/props/UserProfileProps";
import {ContactWithIndex} from "../../models/props/ContactWithIndex";
import {Modal} from "../index";
import './ContactControl.scss';

const ContactControl: React.FC<UserProfileProps> = (props) => {
    const {store} = React.useContext(Context);
    const [findContactWithIndex, setFindContactWithIndex] = React.useState<ContactWithIndex>();
    const [showModalPendingApplication, setShowModalPendingApplication] = React.useState<boolean>(false);
    const [showModalAlreadyContacts, setShowModalAlreadyContacts] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!props.selfProfile && store.getProfile().id !== props.profile.id) {
            setFindContactWithIndex({
                ...findContactWithIndex,
                ...findContactOrReturnNull(props.profile, store.getProfile(), store.getContacts())
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.contacts, props.profile]);

    if (!props.selfProfile &&
        store.getProfile().id !== props.profile.id
    ) {
        if (findContactWithIndex?.contact === null) {
            return (
                <div className="contact__control">
                    <button
                        className="contact__control-button-add"
                        onClick={() => store.addContactFromAPI(props.profile.id)}
                    >Добавить в контакты</button>
                </div>
            );
        } else if (findContactWithIndex?.contact.status) {
            return (
                <div className="contact__control">
                    <span>У вас в контактах</span>
                    <button
                        className="contact__control-button-delete"
                        onClick={() => {
                            setShowModalAlreadyContacts(true);
                        }}
                    >Удалить контакт</button>
                    <Modal
                        active={showModalAlreadyContacts}
                        title={"Удаление контакта"}
                        hasFunctionButtons={true}
                        onSubmit={() => {
                            store.deleteContactFromAPI(findContactWithIndex?.contact!, findContactWithIndex?.index!).then(() =>
                                setShowModalAlreadyContacts(false)
                            );
                        }}
                        onClose={() => setShowModalAlreadyContacts(false)}
                        customClassNameButtonSecond={"messenger__sidebar-profileControl-deleteProfile"}
                    >
                        <div>Вы действительно хотите безвозвратно удалить контакт?</div>
                    </Modal>
                </div>
            );
        } else {
            return (
                <div className="contact__control">
                    {findContactWithIndex?.contact.fromUser.id === store.getProfile().id &&
                        <span>Заявка отправлена</span>
                    }
                    {findContactWithIndex?.contact.toUser.id === store.getProfile().id &&
                        <button
                            className="contact__control-button-accept"
                            onClick={() => store.acceptContactFromAPI(findContactWithIndex?.contact!, findContactWithIndex?.index!)}
                        >Принять заявку</button>
                    }
                    <button
                        className="contact__control-button-delete"
                        onClick={() => {
                            setShowModalPendingApplication(true);
                        }}
                    >Удалить заявку</button>
                    <Modal
                        active={showModalPendingApplication}
                        title={"Удаление заявки"}
                        hasFunctionButtons={true}
                        onSubmit={() => {
                            store.deleteContactFromAPI(findContactWithIndex?.contact!, findContactWithIndex?.index!).then(() =>
                                setShowModalPendingApplication(false)
                            );
                        }}
                        onClose={() => setShowModalPendingApplication(false)}
                        customClassNameButtonSecond={"messenger__sidebar-profileControl-deleteProfile"}
                    >
                        <div>Вы действительно хотите безвозвратно удалить заявку?</div>
                    </Modal>
                </div>
            );
        }
    } else {
        return (<></>);
    }
}

export default observer(ContactControl);