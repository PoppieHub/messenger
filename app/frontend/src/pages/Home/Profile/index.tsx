import React from 'react';
import {Home} from "../../";
import  {Circle} from 'rc-progress';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {profileCompletionPercentage} from "../../../utils/User";
import Switch from '@mui/material/Switch';
import {Button, UserProfile, Modal, Error} from '../../../components'
import {ChangeProfileForm} from '../../../modules/';

const Profile = () => {
    const {store} = React.useContext(Context);
    const [profilePercent, setProfilePercent] = React.useState<number>(0);
    const [disableToggle, setDisableToggle] = React.useState<boolean>(true);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showUserEdit, setShowUserEdit] = React.useState<boolean>(false);

    const memoizedProfile = React.useMemo(
        () => profileCompletionPercentage(store.getProfile()),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [store.getProfile()]
    );

    React.useEffect(() => {
        setProfilePercent(memoizedProfile);
    },[store.getProfile()]);

    return (
        <Home
            childrenFirst={
                <div className="messenger__sidebar-item">
                    <div className="messenger__sidebar-item-header">
                        <div className="messenger__sidebar-item-header-top">
                            <span>Настройки профиля</span>
                        </div>
                    </div>
                    <div className="messenger__sidebar-profile">
                        <Circle
                            percent={profilePercent}
                            strokeWidth={3}
                            className="messenger__sidebar-profile-progress"
                        />
                        <p className="messenger__sidebar-profile-progressInfo">
                            Профиль заполнен на: {profilePercent.toString().slice(0, 5)}%
                        </p>
                    </div>
                    <div className="messenger__sidebar-profileControl">
                        <div className="messenger__sidebar-profileControl-top">
                            <Switch
                                checked={!disableToggle}
                                onChange={() => setDisableToggle(!disableToggle)}
                                name="special"
                            />
                            <span className="messenger__sidebar-profileControl-top-toggleInfo">
                                Специальные возможности
                            </span>
                        </div>
                        <div className="messenger__sidebar-profileControl-main">
                            <Button
                                customClassName="messenger__sidebar-profileControl-changeProfile"
                                fullWidth={false}
                                text={!disableToggle?'Изменить профиль':''}
                                disable={disableToggle}
                                callback={() => setShowUserEdit(!showUserEdit)}
                            />
                            <Button
                                customClassName="messenger__sidebar-profileControl-deleteProfile"
                                fullWidth={false}
                                text={!disableToggle?'Удалить профиль':''}
                                disable={disableToggle}
                                callback={() => setShowModal(!showModal)}
                            />
                        </div>
                    </div>
                    <Modal
                        active={showModal}
                        title={"Удаление профиля"}
                        hasFunctionButtons={true}
                        onSubmit={() => store.deleteProfileFromAPI()}
                        onClose={() => setShowModal(false)}
                        customClassNameButtonSecond={"messenger__sidebar-profileControl-deleteProfile"}
                    >
                        <div>Вы действительно хотите безвозвратно удалить профиль?</div>
                    </Modal>
                    <Error text={'Пользователь с таким псевдонимом уже существует!'} />
                </div>
            }
            childrenSecond={
                (!showUserEdit &&
                    <div className="messenger__imProfile">
                        {store.getProfile().id && <UserProfile profile={{...store.getProfile()}} selfProfile={true} />}
                    </div>) ||
                <div className="messenger__imProfile">
                    {store.getProfile().id && <ChangeProfileForm
                        cancel={() => setShowUserEdit(false)}
                        profile={store.getProfile()}
                    />}
                </div>
            }
        />
    );
}

export default observer(Profile);