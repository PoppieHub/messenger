import React from "react";
import {AlertProps} from "../../models/AlertProps";
import styles from './Alert.module.scss';
import {Alert} from "@mui/material";

const Index: React.FC<AlertProps> = (props) => {

    if (props.state && props.text.length > 0) {
        return (
            <Alert className={styles.infoAlert} onClose={() => {props.updateInfo(false)}}>{props.text}</Alert>
        );
    }

    return (
        <div className={styles.disableAlert}></div>
    );
}

export default Index;