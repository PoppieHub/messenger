import React from "react";
import {ButtonProps} from "../../models/props/ButtonProps";
import {Button as BaseButton} from '@mui/material';
import classNames from "classnames";
import styles from "./Button.module.scss";

const Button: React.FC<ButtonProps> = ({text, fullWidth = true, callback, customClassName = '', disable = false}) => {
    if (callback!) {
        return (
            <BaseButton
                type="submit"
                variant="contained"
                fullWidth={fullWidth}
                onClick={callback}
                disableElevation={true}
                className={classNames(styles.btn, customClassName)}
                disabled={disable}
            >
                {text}
            </BaseButton>
        );
    } else {
        return (
            <BaseButton
                type="submit"
                variant="contained"
                fullWidth={fullWidth}
                disableElevation={true}
                className={classNames(styles.btn, customClassName)}
                disabled={disable}
            >
                {text}
            </BaseButton>
        );
    }
}

export default Button;
