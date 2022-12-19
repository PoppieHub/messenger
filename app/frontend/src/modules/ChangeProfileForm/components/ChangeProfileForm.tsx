import React from 'react';
import ProfileRequest from "../../../models/request/ProfileRequest";
import {UserListItem} from "../../../models/response/UserListItem";
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {
    nicknameChangeValidation,
    firstNameChangeValidation,
    lastNameChangeValidation,
    passwordChangeValidation,
    confirmChangePassword,
} from '../../validation';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import Button from "../../../components/Button";
import Switch from '@mui/material/Switch';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import styles from "../../Form.module.scss";
import "./ChangeProfileForm.scss";

const ChangeProfileForm = ({profile, cancel}: {profile: UserListItem, cancel: () => void}) => {
    const {store} = React.useContext(Context);
    const {handleSubmit, control, watch} = useForm<ProfileRequest>();
    const {errors} = useFormState({control});
    const [switchEmail, setSwitchEmail] = React.useState<boolean>(false);
    const [fieldDefaultNickName, setFieldDefaultNickName] = React.useState<string>(profile.nickname);
    const [fieldDefaultFirstName, setFieldDefaultFirstName] = React.useState<string>(profile.firstName || '');
    const [fieldDefaultLastName, setFieldDefaultLastName] = React.useState<string>(profile.lastName || '');

    React.useEffect(() => {
        profile.hideEmail && setSwitchEmail(profile.hideEmail);
    }, [profile]);

    const onSubmit: SubmitHandler<ProfileRequest> = (data) => {
        if (data.firstName === profile.firstName) {
            delete data.firstName;
        }
        if (data.lastName === profile.lastName) {
            delete data.lastName;
        }
        if (data.nickname?.length === 0 || data.nickname === profile.nickname) {
            delete data.nickname;
        }
        if (data.hideEmail === profile.hideEmail) {
            delete data.hideEmail;
        }
        if (data.password?.length === 0 || data.confirmPassword?.length === 0) {
            delete data.password;
            delete data.confirmPassword;
        }
        if (JSON.stringify(data) === '{}') {
            return cancel();
        } else {
            return store.updateProfileFromAPI(data);
        }
    };

    return (
        <div className='changeProfile'>
            <Typography className='changeProfile__title' variant="h4" component="div">
                Изменение профиля
            </Typography>

            <form className='changeProfile__form' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="nickname"
                    defaultValue={fieldDefaultNickName}
                    rules={nicknameChangeValidation}
                    render={({ field }) => (
                        <TextField
                            label="Псевдоним"
                            className="changeProfile__form-field"
                            InputProps={{
                                endAdornment: (
                                    <AlternateEmailOutlinedIcon className={styles.formIcon}/>
                                ),
                            }}
                            onChange={(e) => {
                                field.onChange(e);
                                setFieldDefaultNickName(field.value || '');
                            }}
                            value={field.value || fieldDefaultNickName}
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
                    name="firstName"
                    defaultValue={fieldDefaultFirstName}
                    rules={firstNameChangeValidation}
                    render={({ field }) => (
                        <TextField
                            label="Имя"
                            InputProps={{
                                endAdornment: (
                                    <BadgeOutlinedIcon className={styles.formIcon}/>
                                ),
                            }}
                            onChange={(e) => {
                                field.onChange(e);
                                setFieldDefaultFirstName(field.value || '');
                            }}
                            value={field.value || fieldDefaultFirstName}
                            fullWidth={ true }
                            size="small"
                            margin="normal"
                            type="text"
                            error={!!errors.firstName?.message}
                            helperText={errors.firstName?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="lastName"
                    defaultValue={fieldDefaultLastName}
                    rules={lastNameChangeValidation}
                    render={({ field }) => (
                        <TextField
                            label="Фамилия"
                            InputProps={{
                                endAdornment: (
                                    <BadgeOutlinedIcon className={styles.formIcon}/>
                                ),
                            }}
                            onChange={(e) => {
                                field.onChange(e);
                                setFieldDefaultLastName(field.value || '');
                            }}
                            value={field.value || fieldDefaultLastName}
                            fullWidth={ true }
                            size="small"
                            margin="normal"
                            type="text"
                            error={!!errors.lastName?.message}
                            helperText={errors.lastName?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={passwordChangeValidation}
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
                            autoComplete="off"
                            helperText={errors.password?.message}
                            error={!!errors.password?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="confirmPassword"
                    // @ts-ignore
                    rules={confirmChangePassword(watch('password'), watch('confirmPassword'))}
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
                            autoComplete="off"
                            helperText={errors.confirmPassword?.message}
                            error={!!errors.confirmPassword?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="hideEmail"
                    defaultValue={switchEmail}
                    render={({ field }) => (
                        <div className="changeProfile__form-switchLabel">
                            <Switch
                                onChange={(e) => {
                                    field.onChange(e);
                                    setSwitchEmail(!switchEmail);
                                }}
                                value={switchEmail}
                                checked={field.value || switchEmail}
                            />
                            {(switchEmail &&
                                <label>Делает Email скрытым для пользователей</label>
                            ) ||
                                <label>Делает Email видимым для пользователей</label>
                            }
                        </div>
                    )}
                />
                <div className="changeProfile__form-groupButton">
                    <Button
                        fullWidth={false}
                        text={'Вернуться'}
                        callback={handleSubmit(cancel)}
                    />
                    <Button
                        fullWidth={false}
                        text={'Применить изменения'}
                        customClassName="messenger__sidebar-profileControl-changeProfile"
                    />
                </div>
            </form>
        </div>
    );
}

export default observer(ChangeProfileForm);