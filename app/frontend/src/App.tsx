import React, {FC} from 'react';
import Title from "./utils/Title";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Auth, Home} from "./pages";
import {browserRouteAuth, browserRouteHome} from "./routes";

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
        (store.getAuth())? navigate(browserRouteHome): navigate(browserRouteAuth);
    }, [store.getAuth()]);

    if (store.getLoading()) {
        return (
            <section>
                <div>Загрузка...</div>
            </section>
        )
    }

    return (
      <Routes>
          <Route path={browserRouteAuth} element={<Auth />} />
          <Route path={browserRouteHome} element={<Home />} />
      </Routes>
    );
}

export default observer(App);
