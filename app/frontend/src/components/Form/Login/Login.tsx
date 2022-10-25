import React from 'react';
import {Context} from "../../../index";
import {useForm, Controller, SubmitHandler, useFormState} from 'react-hook-form';
import SignInRequest from "../../../models/request/SignInRequest";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {emailValidation, passwordValidation} from  '../validation';
import {AuthProps} from "../../../models/AuthProps";
import styles from '../Auth.module.scss';

const Login: React.FC<AuthProps> = (updateData) => {
    const {store} = React.useContext(Context);
    const {handleSubmit, control} = useForm<SignInRequest>();
    const {errors} = useFormState({control});
    const [data] = React.useState({
            registration: 'registration',
            forgot: 'forgot'
        }
    );

    const onSubmit: SubmitHandler<SignInRequest> = (data) => {
        store.setIsError(false);
        store.signIn(data);
    };

    return (
        <div className={styles.authForm}>
            <Typography variant="h4" component="div" className={styles.authFormTitle}>
                Войдите
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div" className={styles.authFormSubtitle}>
                Чтобы получить доступ
            </Typography>
            <form className={styles.authForm__form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="username"
                    rules={emailValidation}
                    render={({ field }) => (
                        <TextField
                            label="Эл. адрес"
                            onChange={(e) => field.onChange(e)}
                            value={field.value || ''}
                            fullWidth={ true }
                            size="small"
                            margin="normal"
                            type="email"
                            error={!!errors.username?.message}
                            helperText={errors.username?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={passwordValidation}
                    render={({ field }) => (
                        <TextField
                            label="Пароль"
                            onChange={(e) => field.onChange(e)}
                            value={field.value || ''}
                            fullWidth={ true }
                            size="small"
                            margin="normal"
                            type="password"
                            helperText={errors.password?.message}
                            error={!!errors.password?.message}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth={ true }
                    disableElevation={ true }
                    className={styles.btn}
                >
                    Войти
                </Button>
            </form>
            <div className={styles.authForm__footer}>
                <Typography variant="subtitle1" component="span" className={styles.link}
                            onClick = {() => {
                                store.setIsError(false);
                                updateData.updateData(data.registration);
                            }}>
                    Зарегистрироваться
                </Typography>
                <Typography variant="subtitle1" component="span" className={styles.link}
                            onClick = {() => {
                                store.setIsError(false);
                                updateData.updateData(data.forgot);
                            }}>
                    Забыли пароль?
                </Typography>
            </div>
        </div>
    );
};

export default Login;