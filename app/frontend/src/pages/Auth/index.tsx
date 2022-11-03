import React from "react";
import {LoginForm, PasswordForm, RegistrationForm} from "../../modules/"
import {Error, AlertBubble} from "../../components";

const Auth: React.FC = () => {
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
            <section className='auth'>
                <AlertBubble text={'Проверьте почту, чтобы подтвердить активацию аккаунта.'} state={info} updateInfo={updateInfo} />
                <Error text='Пользователь с таким адресом электронной почты или псевдонимом уже существует. Ошибка валидации.' />
                <RegistrationForm updateData={updateData} updateInfo={updateInfo} />
            </section>
        );
    }
    if (data.current === 'forgot') {

        return (
            <section className='auth'>
                <AlertBubble text={'Проверьте почту, чтобы продолжить сброс пароля.'} state={info} updateInfo={updateInfo} />
                <Error text='Пользователь с таким адресом электронной почты или псевдонимом не существует. Ошибка валидации.' />
                <PasswordForm updateData={updateData} updateInfo={updateInfo} />
            </section>
        );
    }
    return (
        <section className='auth'>
            <Error text='Некорректно введены данные.' />
            <LoginForm updateData={updateData}/>
        </section>
    );
}

export default Auth;
