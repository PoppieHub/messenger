import React from "react";
import {ButtonProps} from "../../models/props/ButtonProps";
import {Button as BaseButton} from '@mui/material';
import styles from "./Button.module.scss";

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <BaseButton
            type="submit"
            variant="contained"
            fullWidth={true}
            disableElevation={true}
            className={styles.btn}
        >
            {props.text}
        </BaseButton>
    );
}

export default Button;
