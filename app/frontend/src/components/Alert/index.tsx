import React from "react";
import {AlertProps} from "../../models/props/AlertProps";
import styles from './Alert.module.scss';
import {Alert, AlertTitle} from "@mui/material";

const AlertBubble: React.FC<AlertProps> = (props) => {

    if (props.state && props.text.length > 0) {
        return (
            <Alert className={styles.infoAlert} severity="success" onClose={() => {props.updateInfo && props.updateInfo(false)}}>
                <AlertTitle>Отлично</AlertTitle>
                Следующий шаг — <strong>{props.text}</strong>
            </Alert>
        );
    }

    return (
        <div className={styles.disableAlert}></div>
    );
}

export default AlertBubble;