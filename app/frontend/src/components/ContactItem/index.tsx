import React from 'react';
import classNames from "classnames";
import {ContactItemProps} from "../../models/props/ContactItemProps";
import {Modal, UserItem} from "../index";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import './ContactItem.scss';

const ContactItem: React.FC<ContactItemProps> = (props) => {
    const {store} = React.useContext(Context);
    const [showModalOnRequest, setShowModalOnRequest] = React.useState<boolean>(false);
    const [showModalOnSent, setShowModalOnSent] = React.useState<boolean>(false);
    const [showModalOnAll, setShowModalOnAll] = React.useState<boolean>(false);

    if (props.addRequest) {
        return (
            <div className={classNames("contacts__item", "contacts__item-add-requests")}>
                {(props.currentUser.id === props.contact.toUser.id &&
                        <UserItem profile={props.contact.fromUser} />
                    ) ||
                    <UserItem profile={props.contact.toUser} />
                }
                <div className="contacts__item-control">
                    <button className={classNames("contacts__item-control-button",
                        "contacts__item-control-button-accept")}
                        onClick={() => store.acceptContactFromAPI(props.contact, props.index)}
                    />
                    <button className={classNames("contacts__item-control-button",
                        "contacts__item-control-button-delete")}
                        onClick={() => {
                            setShowModalOnRequest(true);
                        }}
                    />
                    <Modal
                        active={showModalOnRequest}
                        title={"Удаление входящей заявки"}
                        hasFunctionButtons={true}
                        onSubmit={() => {
                            store.deleteContactFromAPI(props.contact, props.index).then(() =>
                                setShowModalOnRequest(false)
                            );
                        }}
                        onClose={() => setShowModalOnRequest(false)}
                        customClassNameButtonSecond={"messenger__sidebar-profileControl-deleteProfile"}
                    >
                        <div>Вы действительно хотите безвозвратно удалить заявку?</div>
                    </Modal>
                </div>
            </div>
        );
    } else if (props.sentRequest) {
        return (
            <div className={classNames("contacts__item", "contacts__item-sent-requests")}>
                {(props.currentUser.id === props.contact.toUser.id &&
                        <UserItem profile={props.contact.fromUser} />
                    ) ||
                    <UserItem profile={props.contact.toUser} />
                }
                <div className="contacts__item-control">
                    <button className={classNames("contacts__item-control-button",
                        "contacts__item-control-button-delete")}
                        onClick={() => {
                            setShowModalOnSent(true);
                        }}
                    />
                    <Modal
                        active={showModalOnSent}
                        title={"Удаление исходящей заявки"}
                        hasFunctionButtons={true}
                        onSubmit={() => {
                            store.deleteContactFromAPI(props.contact, props.index).then(() =>
                                setShowModalOnSent(false)
                            );
                        }}
                        onClose={() => setShowModalOnSent(false)}
                        customClassNameButtonSecond={"messenger__sidebar-profileControl-deleteProfile"}
                    >
                        <div>Вы действительно хотите безвозвратно удалить заявку?</div>
                    </Modal>
                </div>
            </div>
        );
    } else {
        return (
            <div className={classNames("contacts__item", "contacts__item-all-accepted")}>
                {(props.currentUser.id === props.contact.toUser.id &&
                        <UserItem profile={props.contact.fromUser} />
                    ) ||
                    <UserItem profile={props.contact.toUser} />
                }
                <div className="contacts__item-control">
                    <button className={classNames("contacts__item-control-button",
                        "contacts__item-control-button-delete")}
                        onClick={() => {
                            setShowModalOnAll(true);
                        }}
                    />
                </div>
                <Modal
                    active={showModalOnAll}
                    title={"Удаление контакта"}
                    hasFunctionButtons={true}
                    onSubmit={() => {
                        store.deleteContactFromAPI(props.contact, props.index).then(() =>
                            setShowModalOnAll(false)
                        );
                    }}
                    onClose={() => setShowModalOnAll(false)}
                    customClassNameButtonSecond={"messenger__sidebar-profileControl-deleteProfile"}
                >
                    <div>Вы действительно хотите безвозвратно удалить контакт?</div>
                </Modal>
            </div>
        );
    }
}

export default observer(ContactItem);