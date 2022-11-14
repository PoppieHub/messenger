import React, {useEffect} from "react";
import {IconButton, Paper, TextField} from "@mui/material";
import {DialogInputProps} from "../../models/props/DialogInputProps";
import classNames from "classnames";
import './DialogInput.scss';

const DialogInput: React.FC<DialogInputProps> = (props) => {
    const [value, setValue] = React.useState<boolean>(false);
    const [textField, setTextField] = React.useState<string>('');

    const maxSizeMessage = 500;

    useEffect(() => {
        if (textField.length > 0) {
            setValue(true);
        } else {
            setValue(false);
        }
    }, [textField]);

        return (
                <Paper component="form" className="dialogInput-form">
                        <IconButton
                            type="button"
                            className='dialogInput-form-smile'
                        />
                        <TextField
                            className={classNames("dialogInput-form-input", {
                                "dialogInput-form-input--error": textField.length > maxSizeMessage
                            })}
                            onChange={e => (setTextField(e.target.value))}
                            variant="outlined"
                            label={(textField.length > 0 && (`${textField.length}/${maxSizeMessage}`) || null)}
                            multiline
                            rows={(textField.length > maxSizeMessage * 0.05)? 3: 1}
                            placeholder="Введите сообщение"
                            inputProps={{ 'aria-label': 'Введите сообщение' }}
                        />
                        <IconButton
                            type="button"
                            className='dialogInput-form-image'
                        />
                        <IconButton
                            type="button"
                            className='dialogInput-form-document'
                        />
                        {
                            (value &&
                                (<IconButton
                                    type="button"
                                    className='dialogInput-form-send'
                                />) ||
                                (
                                    <IconButton
                                        type="button"
                                        className='dialogInput-form-microphone'
                                    />
                                )
                            )
                        }
            </Paper>
        );
}

export default DialogInput;