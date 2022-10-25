import React from 'react';
import {Context} from "../../../index";
import {useForm, Controller, SubmitHandler, useFormState} from 'react-hook-form';
import ForgotPasswordRequest from "../../../models/request/ForgotPasswordRequest";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {emailValidation, nicknameValidation} from  '../validation';
import styles from '../Auth.module.scss';
import {AuthProps} from "../../../models/AuthProps";

const ForgotPassword: React.FC<AuthProps> = (props) => {
    const {store} = React.useContext(Context);
    const {handleSubmit, control} = useForm<ForgotPasswordRequest>();
    const {errors} = useFormState({control});
    const [data] = React.useState({
            registration: 'registration',
            login: 'login'
        }
    );

    const onSubmit: SubmitHandler<ForgotPasswordRequest> = (data) => {
        store.setIsError(false);
        store.forgotPassword(data);
        if (props.updateInfo) {
            props.updateInfo(true);
        }
    };

    return (
        <div className={styles.authForm}>
            <Typography variant="h4" component="div" className={styles.authFormTitle}>
                Восстановление
            </Typography>
            <form className={styles.authForm__form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="email"
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
                            error={!!errors.email?.message}
                            helperText={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="nickname"
                    rules={nicknameValidation}
                    render={({ field }) => (
                        <TextField
                            label="Псевдоним"
                            onChange={(e) => field.onChange(e)}
                            value={field.value || ''}
                            fullWidth={ true }
                            size="small"
                            margin="normal"
                            type="text"
                            helperText={errors.nickname?.message}
                            error={!!errors.nickname?.message}
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
                    Восстановить
                </Button>
            </form>
            <div className={styles.authForm__footer}>
                <Typography variant="subtitle1" component="span" className={styles.link}
                            onClick = {() => {
                                if (props.updateInfo) {
                                    props.updateInfo(false);
                                }
                                props.updateData(data.login);
                                store.setIsError(false)
                            }}>
                    Войти
                </Typography>
                <Typography variant="subtitle1" component="span" className={styles.link}
                            onClick = {() => {
                                if (props.updateInfo) {
                                    props.updateInfo(false);
                                }
                                props.updateData(data.registration);
                                store.setIsError(false);
                            }}>
                    Зарегистрироваться
                </Typography>
            </div>
        </div>
    );
};

export default ForgotPassword;