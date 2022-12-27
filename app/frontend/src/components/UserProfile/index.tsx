import React from "react";
import {UserProfileProps} from "../../models/props/UserProfileProps";
import {Avatar, Name, UserStatus, ContactControl} from "../index";
import {getUserName} from "../../utils/User";
import {ContentListResponse} from "../../models/response/ContentListResponse";
import './UserProfile.scss';

const UserProfile: React.FC<UserProfileProps> = (props) => {
    const [contents, setContents] = React.useState<ContentListResponse>({items: []});

    React.useEffect(() => {
        if (props.profile.content) {
            setContents(
                {
                    ...contents,
                    ...props.profile.content
                }
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    return (
        <div className="profile">
            <div className="profile__header">
                <div className="profile__header-wrapper">
                    <Avatar
                        contentList={contents}
                        alt={getUserName(props.profile)}
                        stringForFirstCharacter={getUserName(props.profile)}
                        stringForGenerateColor={props.profile.id}
                        shortAvatar={false}
                        selfProfile={props.selfProfile}
                    />
                    <div className="profile__header-infoName">
                        <div className="profile__header-infoName-wrap">
                            <p>Пользователь: </p>
                            <Name user={props.profile} />
                        </div>
                        <UserStatus status={true} />
                    </div>
                </div>
            </div>
            <div className="profile__body">
                <ContactControl profile={props.profile} selfProfile={props.selfProfile} />
                <div className="profile__body-profile">
                    {
                        ((props.profile.hideEmail === false ||
                        props.profile.hideEmail === undefined) &&
                        <div className="profile__body-profile-field">
                            <div className="profile__body-profile-field-wrapper">
                                <span>Email:</span>
                                <span className="profile__body-profile-field-bold">{props.profile.email}</span>
                            </div>
                        </div>
                        ) ||
                        <div className="profile__body-profile-field--green">
                            <span className="profile__body-profile-field--green">Email был скрыт</span>
                        </div>
                    }
                    <div className="profile__body-profile-field">
                        <div className="profile__body-profile-field-wrapper">
                            <span>Nickname:</span>
                            <span className="profile__body-profile-field-bold">{props.profile.nickname}</span>
                        </div>
                    </div>
                    {(props.profile.firstName! &&
                        <div className="profile__body-profile-field">
                            <div className="profile__body-profile-field-wrapper">
                                <span>Имя:</span>
                                <span className="profile__body-profile-field-bold">{props.profile.firstName}</span>
                            </div>
                        </div>
                    )}
                    {(props.profile.lastName! &&
                        <div className="profile__body-profile-field">
                            <div className="profile__body-profile-field-wrapper">
                                <span>Фамилия:</span>
                                <span className="profile__body-profile-field-bold">{props.profile.lastName}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;