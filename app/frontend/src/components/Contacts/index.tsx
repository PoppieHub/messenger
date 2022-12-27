import React from 'react';
import {ContactsProps} from "../../models/props/ContactsProps";
import {ContactItem} from "../index";
import "./Contacts.scss";

const Contacts: React.FC<ContactsProps> = (props) => {

    return (
        <div className='contacts-container'>
            {props.contacts.items.map((item, index) => (
                <ContactItem
                    key={item.id}
                    contact={item}
                    index={index}
                    currentUser={props.currentUser}
                    addRequest={props.addRequest}
                    sentRequest={props.sentRequest}
                    allAccepted={props.allAccepted}
                />
            ))}
        </div>
    );
}

export default Contacts;