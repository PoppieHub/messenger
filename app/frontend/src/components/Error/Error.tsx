import React, {useEffect} from "react";
import {Context} from "../../index";
import {ErrorProps} from "../../models/ErrorProps";
import styles from './Error.module.scss';
import {observer} from "mobx-react-lite";

const Error: React.FC<ErrorProps> = (text) => {
    const {store} = React.useContext(Context);

    if (store.getIsError()) {
        return (
            <div className={styles.errorAlert}>
                <b>{text.text}</b>
                <span className={styles.closeBtn} onClick={() => store.setIsError(false)}>×</span>
            </div>
        );
    }

    return (
        <div className={styles.disableError}></div>
    );
}

export default observer(Error);