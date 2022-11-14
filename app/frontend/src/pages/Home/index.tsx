import React from 'react';
import {Dialogs, Toggle, Message, UserStatus, DialogInput} from "../../components/";
import {fakeChatsListResponse, fakeSecondMessageListResponse} from "./fakeData";
import {IconButton, InputBase, Paper} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
                        <div className="messenger__sidebar-item-search">
                            <Paper component="form">
                                <InputBase
                                    className='messenger__sidebar-item-search-form-input'
                                    placeholder="Поиск диалога"
                                    inputProps={{ 'aria-label': 'Поиск диалога' }}
                                />
                                <IconButton
                                    type="button"
                                    className='messenger__sidebar-item-search-form-button'
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
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
                            {fakeSecondMessageListResponse().items.map((item) => <Message message={item} key={item.id}/>)}
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