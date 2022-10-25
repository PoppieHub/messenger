import React from "react";
import styles from './Alert.module.scss';
import {AlertProps} from "../../models/AlertProps";

const Alert: React.FC<AlertProps> = (props) => {

    if (props.state && props.text.length > 0) {
        return (
            <div className={styles.infoAlert}>
                <b>{props.text}</b>
                <span className={styles.closeBtn} onClick={() => props.updateInfo(false)}>×</span>
            </div>
        );
    }

    return (
        <div className={styles.disableAlert}></div>
    );
}

export default Alert;