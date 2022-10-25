import React, {FC} from 'react';
import Header from "../Header/Header";
import Title from "../../utils/Title";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {AuthPage} from "../../pages/auth-page";

const App: FC = () => {
    const {store} = React.useContext(Context);

    Title();

    React.useEffect( () => {
        if (localStorage.getItem(`${process.env.REACT_APP_NAME_TOKEN}`)) {
            store.checkAuth();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!store.getAuth()) {
        return (
            <AuthPage />
        );
    }

    if (store.getLoading()) {
        return (
            <main>
                <div>Загрузка...</div>
            </main>
        )
    }

    return (
      <main>
          <Header />
      </main>
    );
}

export default observer(App);
