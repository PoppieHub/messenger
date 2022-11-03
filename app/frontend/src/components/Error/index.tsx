import React from "react";
import {Context} from "../../index";
import {ErrorProps} from "../../models/ErrorProps";
import {observer} from "mobx-react-lite";
import styles from './Error.module.scss';
import {Alert, AlertTitle} from "@mui/material";

const Error: React.FC<ErrorProps> = (text) => {
    const {store} = React.useContext(Context);

    if (store.getIsError()) {
        return (
            <Alert className={styles.errorAlert} severity="error" onClose={() => {store.setIsError(false)}}>
                <AlertTitle>Упс, что-то пошло не так...</AlertTitle>
                Причина ошибки — <strong>{text.text}</strong>
            </Alert>
        );
    }

    return (
        <div className={styles.disableError}></div>
    );
}

export default observer(Error);