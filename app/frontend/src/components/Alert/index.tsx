import React from "react";
import {AlertProps} from "../../models/AlertProps";
import styles from './Alert.module.scss';

const Index: React.FC<AlertProps> = (props) => {

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

export default Index;