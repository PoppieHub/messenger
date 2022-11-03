import React from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Alert, AlertTitle} from "@mui/material";
import {AlertProps} from "../../models/AlertProps";
import styles from './Error.module.scss';

const Error: React.FC<AlertProps> = ({text = 'Неизвестная ошибка'}) => {
    const {store} = React.useContext(Context);

    if (store.getIsError()) {

        return (
            <Alert className={styles.errorAlert} severity="error" onClose={() => {store.setIsError(false)}}>
                <AlertTitle>Упс, что-то пошло не так...</AlertTitle>
                Причина ошибки — <strong>{text}</strong>
            </Alert>
        );
    }

    return (
        <div className={styles.disableError}></div>
    );
}

export default observer(Error);