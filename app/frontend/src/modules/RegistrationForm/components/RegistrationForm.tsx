import React, {useState} from 'react';
import {Context} from "../../../index";
import {useForm, Controller, SubmitHandler, useFormState} from 'react-hook-form';
import SignUpRequest from "../../../models/request/SignUpRequest";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {emailValidation, nicknameValidation, passwordValidation, confirmPassword} from '../../validation';
import {AuthProps} from "../../../models/props/AuthProps";
import Button from "../../../components/Button";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import styles from '../../Form.module.scss';

const RegistrationForm: React.FC<AuthProps> = (props) => {
    const {store} = React.useContext(Context);
    const {handleSubmit, control, watch} = useForm<SignUpRequest>();
    const {errors} = useFormState({control});
    const [data] = useState({
            login: 'login'
        }
    );

    const onSubmit: SubmitHandler<SignUpRequest> = (data) => {
        store.setIsError(false);
        store.signUp(data);
        if (props.updateInfo) {
            props.updateInfo(true);
        }
    };

    return (
        <div className={styles.authForm}>
            <Typography variant="h4" component="div" className={styles.authFormTitle}>
                Зарегистрируйтесь
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div" className={styles.authFormSubtitle}>
                Чтобы получить функционал приложения
            </Typography>

            <form className={styles.authForm__form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="email"
                    rules={emailValidation}
                    render={({ field }) => (
                        <TextField
                            label="Эл. адрес"
                            InputProps={{
                                endAdornment: (
                                    <MailOutlineIcon className={styles.formIcon}/>
                                ),
                            }}
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
                            InputProps={{
                                endAdornment: (
                                    <AlternateEmailOutlinedIcon className={styles.formIcon}/>
                                ),
                            }}
                            onChange={(e) => field.onChange(e)}
                            value={field.value || ''}
                            fullWidth={ true }
                            size="small"
                            margin="normal"
                            type="text"
                            error={!!errors.nickname?.message}
                            helperText={errors.nickname?.message}
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
                            InputProps={{
                                endAdornment: (
                                    <VpnKeyOutlinedIcon className={styles.formIcon}/>
                                ),
                            }}
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
                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={confirmPassword(watch('password'), watch('confirmPassword'))}
                    render={({ field }) => (
                        <TextField
                            label="Повторите пароль"
                            InputProps={{
                                endAdornment: (
                                    <VpnKeyOutlinedIcon className={styles.formIcon}/>
                                ),
                            }}
                            onChange={(e) => field.onChange(e)}
                            value={field.value || ''}
                            fullWidth={ true }
                            size="small"
                            margin="normal"
                            type="password"
                            helperText={errors.confirmPassword?.message}
                            error={!!errors.confirmPassword?.message}
                        />
                    )}
                />
                <Button text={'Регистрация'} />
            </form>

            <div className={styles.authForm__footer}>
                <Typography variant="subtitle1" component="span" className={styles.link}
                            onClick = {() => {
                                store.setIsError(false);
                                if (props.updateInfo) {
                                    props.updateInfo(false);
                                }
                                props.updateData(data.login);
                            }}>
                    Войти
                </Typography>
            </div>
        </div>
    );
}

export default RegistrationForm;