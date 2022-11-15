import React from 'react';
import {Toggle, Messages, UserStatus, DialogInput} from "../../components/";
import {Dialogs} from "../../containers/";
import {fakeChatsListResponse, secondFakeChat} from "./fakeData";

const Home = () => {
    return (
        <section className="home">
            <div className="messenger">
                <div className="messenger__sidebar">
                    <Toggle />
                    <div className="messenger__sidebar-item">
                        <div className="messenger__sidebar-item-header">
                            <div className="messenger__sidebar-item-header-top">
                                <span>Список диалогов</span>
                            </div>
                        </div>
                        <div className="messenger__sidebar-dialogs">
                            <Dialogs chatsList={fakeChatsListResponse()} />
                        </div>
                    </div>
                </div>
                <div className="messenger__dialog">
                    <div className="messenger__dialog-header">
                        <div/>
                        <div className="messenger__dialog-header-info">
                            <p className="messenger__dialog-header-name">testNicknameTest</p>
                            <div className="messenger__dialog-header-status">
                                <UserStatus status={true} />
                            </div>
                        </div>
                        <button className="messenger__dialog-header-more" />
                    </div>
                    <div className="messenger__dialog-messages">
                        <div className="messenger__dialog-messages-container">
                            <Messages messages={secondFakeChat.messages && secondFakeChat.messages} />
                        </div>
                    </div>
                    <div className="messenger__dialog-input">
                        <DialogInput chatId={'3'} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;