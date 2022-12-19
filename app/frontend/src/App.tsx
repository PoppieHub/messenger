import React, {FC} from 'react';
import Title from "./utils/Title";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Auth, Im, Profile, Contacts} from "./pages";
import {browserRouteAuth, browserRouteContacts, browserRouteIm, browserRouteProfile} from "./routes";

const App: FC = () => {
    const {store} = React.useContext(Context);
    const navigate = useNavigate();

    Title();

    React.useEffect( () => {
        if (localStorage.getItem(`${process.env.REACT_APP_NAME_TOKEN}`)) {
            store.checkAuth();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect( () => {
        (store.getAuth())? navigate(browserRouteIm): navigate(browserRouteAuth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.getAuth()]);

    if (store.getLoading()) {
        return (
            <section className='global_loading'>
                <div className="loading"></div>
            </section>
        )
    }

    return (
      <Routes>
          <Route path={browserRouteAuth} element={<Auth/>} />
          <Route path={browserRouteIm} element={<Im/>} />
          <Route path={browserRouteProfile} element={<Profile/>} />
          <Route path={browserRouteContacts} element={<Contacts/>} />
      </Routes>
    );
}

export default observer(App);
