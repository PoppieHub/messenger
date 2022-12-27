import React from 'react';
import {Home} from "../../";
import {FindUsers, Contacts as ContactsContainer, Contact} from "../../../containers";

const Contacts = () => {

    return (
        <Home
            childrenFirst={
                <div className="messenger__sidebar-item">
                    <div className="messenger__sidebar-item-header">
                        <div className="messenger__sidebar-item-header-top">
                            <span>Список контактов</span>
                        </div>
                    </div>
                    <div className="messenger__sidebar-users">
                        <FindUsers />
                    </div>
                    <div className="messenger__sidebar-contacts" >
                        <ContactsContainer />
                    </div>
                </div>
            }
            childrenSecond={
                <div className="messenger__contact-profile">
                    <Contact />
                </div>
            }
        />
    );
}

export default Contacts;