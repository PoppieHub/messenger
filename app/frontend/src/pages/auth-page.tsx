import React from "react";
import Login from "../components/Form/Login/Login";
import Header from "../components/Header/Header";
import Registration from "../components/Form/Registration/Registration";
import Error from "../components/Error/Error";
import ForgotPassword from "../components/Form/ForgotPassword/ForgotPassword";
import Alert from "../components/Alert/Alert";

export const AuthPage: React.FC = () => {
    const [info, setInfo] = React.useState(false);
    const [data, setData] = React.useState({
            current: 'login'
        }
    );

    const updateData = (value: string) => {
        setData({ current: value });
    }

    const updateInfo = (value: boolean) => {
        setInfo(value);
    }

    if (data.current === 'registration') {

        return (
            <main>
                <Header />
                <Alert text={'Проверьте почту, чтобы подтвердить активацию аккаунта'} state={info} updateInfo={updateInfo} />
                <Error text='Пользователь с таким адресом электронной почты или псевдонимом уже существует. Ошибка валидации.' />
                <Registration updateData={updateData} updateInfo={updateInfo} />
            </main>
        );
    }
    if (data.current === 'forgot') {

        return (
            <main>
                <Header />
                <Alert text={'Проверьте почту, продолжить сброс пароля'} state={info} updateInfo={updateInfo} />
                <Error text='Пользователь с таким адресом электронной почты или псевдонимом не существует. Ошибка валидации.' />
                <ForgotPassword updateData={updateData} updateInfo={updateInfo} />
            </main>
        );
    }
    return (
        <main>
            <Header />
            <Error text='Некорректно введены данные' />
            <Login updateData={updateData}/>
        </main>
    );
}