import React from "react";
import {AvatarProps} from "../../models/props/AvatarProps";
import { generateAvatarByNickname } from "../../utils/helpers";
import {Carousel} from "../index";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {ContentListItem} from "../../models/response/ContentListItem";
import {v4 as uuidv4} from "uuid";
import './Avatar.scss';

const Avatar: React.FC<AvatarProps> = ({
       contentList,
       alt,
       stringForGenerateColor,
       stringForFirstCharacter,
       shortAvatar = true,
       selfProfile = false,
       chat,
}) => {
    const {store} = React.useContext(Context);
    const [collection, setCollection] = React.useState<React.ReactNode | React.ReactNode[]>(null);

    const {colors} = generateAvatarByNickname(stringForGenerateColor);
    const firstChar = stringForFirstCharacter[0].toUpperCase();

    React.useEffect(() => {
        if (!shortAvatar && contentList?.items.length!) {
            if (selfProfile) {
                setCollection(
                    contentList.items.map((item, index) => {
                        return (
                            <div
                                className="avatar__block-item"
                                key={uuidv4()}
                            >
                                <img
                                    key={index}
                                    className='avatar'
                                    src={process.env.REACT_APP_BACKEND_URL + '/' + item.link}
                                    alt={'Avatar ' + alt}
                                />
                                <div
                                    key={uuidv4()}
                                    className="avatar__block-delete"
                                    onClick={() => deleteHandler(item, index)}
                                />
                            </div>
                        );
                    })
                );
            } else {
                setCollection(
                    contentList.items.map((item, index) => {
                        return (
                            <div
                                className="avatar__block-item"
                                key={uuidv4()}
                            >
                                <img
                                    key={index}
                                    className='avatar'
                                    src={process.env.REACT_APP_BACKEND_URL + '/' + item.link}
                                    alt={'Avatar ' + alt}
                                />
                            </div>
                        );
                    })
                );
            }
        }
    }, [contentList]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file: File = e.target.files[0];
            e.target.value = '';

            return store.uploadAvatar(file);
        }
    }

    const deleteHandler = (data: ContentListItem, index: number) => {
        if (chat && chat.id) {
            return store.deleteChatAvatarFromAPI(data, index, chat);
        } else {
            return store.deleteUserAvatarFromAPI(data, index);
        }
    }

    if (shortAvatar) {
        if (contentList && contentList.items && contentList.items.length > 0) {
            return (
                <img
                    className='avatar'
                    src={process.env.REACT_APP_BACKEND_URL + '/' + contentList.items[0].link}
                    alt={'Avatar ' + alt}
                />
            );
        } else {
            return (
                <div
                    style={{background: `linear-gradient(135deg, ${colors.color} 0%, ${colors.colorLighten} 96.52%)`}}
                    className='avatar avatar--symbol'
                >
                    {firstChar}
                </div>
            );
        }
    } else {
        if (selfProfile) {
            if (contentList?.items.length && collection) {
                return (
                    <div className="avatar__block">
                        <Carousel width={210} >
                            {collection}
                        </Carousel>
                        {(contentList.items.length < 5 &&
                            <div className='avatar__uploader'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => changeHandler(e)}
                                />
                            </div>
                        )}
                    </div>
                );
            } else {
                return (
                    <div className="avatar__block">
                        <div
                            style={{background: `linear-gradient(135deg, ${colors.color} 0%, ${colors.colorLighten} 96.52%)`}}
                            className='avatar avatar--symbol'>
                            {firstChar}
                        </div>
                        <div className='avatar__uploader'>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => changeHandler(e)}
                            />
                        </div>
                    </div>
                );
            }
        } else {
            if (contentList && collection) {
                if (contentList.items.length === 1) {
                    return (
                        <img
                            className='avatar'
                            src={process.env.REACT_APP_BACKEND_URL + '/' + contentList.items[0].link}
                            alt={'Avatar ' + alt}
                        />
                    );
                } else {
                    return (
                        <Carousel width={210} >
                            {collection}
                        </Carousel>
                    );
                }
            } else {
                return (
                    <div
                        style={{background: `linear-gradient(135deg, ${colors.color} 0%, ${colors.colorLighten} 96.52%)`}}
                        className='avatar avatar--symbol'>
                        {firstChar}
                    </div>
                );
            }
        }
    }
}

export default observer(Avatar);
