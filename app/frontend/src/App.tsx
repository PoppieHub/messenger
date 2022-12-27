import React, {FC} from 'react';
import Title from "./utils/Title";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Auth, Im, Profile, Contacts} from "./pages";
import {browserRouteAuth, browserRouteContacts, browserRouteIm, browserRouteProfile} from "./routes";
import {Button, Modal} from "./components";

const App: FC = () => {
    const {store} = React.useContext(Context);
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState<boolean>(false);

    Title();

    React.useEffect( () => {
        if (localStorage.getItem(`${process.env.REACT_APP_NAME_TOKEN}`)) {
            store.checkAuth();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect( () => {
        if (store.getAuth() && store.getProfile().verified) {
            navigate(browserRouteIm);
            store.getContactsFromAPI();
        } else if (store.getAuth() && !store.getProfile().verified) {
        } else {
            navigate(browserRouteAuth);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.getAuth(), store.profile.verified]);

    React.useEffect(() => {
        if (store.getProfile() && !store.getProfile().verified) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.profile]);

    if (store.getLoading()) {
        return (
            <section className='global_loading'>
                <div className="loading"></div>
            </section>
        )
    }

    return (
        <>
            <Modal
                active={showModal}
                title={"Пользователь не верифицирован!"}
                hasFunctionButtons={false}
            >
                <div className='modal__children-verification'>
                    <div>Вам необходимо пройти верификацию по почте, чтобы использовать функционал приложения.</div>
                    <Button
                        text={"Обновить"}
                        fullWidth={false}
                        customClassName='button-refresh'
                        callback={
                            () => {store.getProfileFromAPI();}
                        }
                    />
                </div>
            </Modal>
            <Routes>
                <Route path={browserRouteAuth} element={<Auth/>} />
                <Route path={browserRouteIm} element={<Im/>} />
                <Route path={browserRouteProfile} element={<Profile/>} />
                <Route path={browserRouteContacts} element={<Contacts/>} />
            </Routes>
        </>
    );
}

export default observer(App);
