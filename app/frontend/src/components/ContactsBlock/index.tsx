import React from 'react';
import {Contacts} from "../index";
import {ContactsBlockProps} from "../../models/props/ContactsBlockProps";
import "./ContactsBlock.scss";
const ContactsBlock: React.FC<ContactsBlockProps> = (props) => {

    return (
        <>
            {(props.addRequestList.items.length > 0 &&
                <div className="contacts__block">
                    <div className="contacts__block-header">
                        <div className="contacts__block-header-top">
                            <span>Входящие заявки</span>
                        </div>
                    </div>
                    <Contacts
                        contacts={props.addRequestList}
                        addRequest={true}
                        currentUser={props.currentUser}
                    />
                </div>
            )}
            {(props.sentRequestList.items.length > 0 &&
                <div className="contacts__block">
                    <div className="contacts__block-header">
                        <div className="contacts__block-header-top">
                            <span>Исходящие заявки</span>
                        </div>
                    </div>
                    <Contacts
                        contacts={props.sentRequestList}
                        sentRequest={true}
                        currentUser={props.currentUser}
                    />
                </div>
            )}
            {(props.allAcceptedList.items.length > 0 &&
                <div className="contacts__block">
                    <div className="contacts__block-header">
                        <div className="contacts__block-header-top">
                            <span>Все контакты</span>
                        </div>
                    </div>
                    <Contacts
                        contacts={props.allAcceptedList}
                        allAccepted={true}
                        currentUser={props.currentUser}
                    />
                </div>
            )}
        </>
    );
}

export default ContactsBlock;