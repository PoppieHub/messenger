import React from "react";
import {IconButton, TextField} from "@mui/material";
import classNames from "classnames";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {DialogInputProps} from "../../models/props/DialogInputProps";
import {UploadFiles, AudioMessage} from "../../components";
import './DialogInput.scss';

const DialogInput: React.FC<DialogInputProps> = (
    {
        toggleEmojiPicker,
        emojiPickerVisible,
        setEmojiPickerVisible,
        value,
        textField,
        setTextField,
        maxSizeMessage,
        uploadDocumentHandler,
        handleSendMessage,
        pickerRef,
        addEmoji,
        flagForStyle,
        textAreaRef,
        images,
        voice,
        callbackOnDeleteContent,
        onRecord,
        onStopRecording,
        isRecording,
        isShortInput
    }
) => {
    return (
            <div className="dialogInput">
                {images.items?.length > 0 && !voice?.id && !isShortInput &&
                    <div className="dialogInput-upload"
                         style={
                             !flagForStyle?
                                 {bottom: `100px`}:
                                 {bottom: `117px`}
                         }
                    >
                        <UploadFiles uploaded={images} callbackOnDeleteContent={callbackOnDeleteContent} />
                    </div>
                }
                <div className="dialogInput-form"
                    style={isShortInput? {justifyContent: "space-between"}: {}}
                >
                    {!isShortInput && (
                        <>
                            <div ref={pickerRef} className="dialogInput-emoji">
                                <IconButton
                                    type="button"
                                    className='dialogInput-form-smile'
                                    onClick={() => toggleEmojiPicker()}
                                />
                                {emojiPickerVisible && (
                                    <div
                                        style={
                                            !flagForStyle?
                                                {bottom: `90px`}:
                                                {bottom: `117px`}
                                        }
                                        className="dialogInput__emoji-picker">
                                        <Picker
                                            onEmojiSelect={
                                                (emojiData: {
                                                    id: string;
                                                    name: string;
                                                    /** emoji */
                                                    native: string;
                                                    /** unicode */
                                                    unified: string;
                                                    keywords: string[];
                                                    shortcodes: string;
                                                }) => {
                                                    addEmoji(emojiData.shortcodes);
                                                }
                                            }
                                            set="apple"
                                            theme="light"
                                            locale="ru"
                                            data={data}
                                        />
                                    </div>
                                )}
                            </div>
                            <TextField
                                className={classNames("dialogInput-form-input", {
                                    "dialogInput-form-input--error": textField.length > maxSizeMessage
                                })}
                                onChange={e => (setTextField(e.target.value))}
                                onKeyUp={e => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        handleSendMessage();
                                        setEmojiPickerVisible(false);
                                    }
                                }}
                                value={textField}
                                variant="outlined"
                                label={((textField.length > 0 && `${textField.length}/${maxSizeMessage}`) || null)}
                                multiline
                                rows={flagForStyle? 3: 1}
                                placeholder="Введите сообщение"
                                inputProps={{ 'aria-label': 'Введите сообщение' }}
                                inputRef={textAreaRef}
                            />
                            <IconButton
                                type="button"
                                className='dialogInput-form-image'
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple={true}
                                    onChange={e => uploadDocumentHandler(e)}
                                />
                            </IconButton>
                        </>
                    )}
                    {isShortInput && voice?.id &&
                        <div className="dialogInput-form-audio">
                            <div onClick={() => voice?.id! && callbackOnDeleteContent(voice.id)} className='dialogInput-form-audio__delete'/>
                            <AudioMessage isMe={true} content={voice} />
                        </div>
                    }
                    {
                        (value &&
                            <IconButton
                                type="button"
                                className='dialogInput-form-send'
                                onClick={handleSendMessage}
                            />) ||
                        (
                            (!isRecording &&
                                (
                                    (!isShortInput &&
                                        <IconButton
                                            type="button"
                                            className='dialogInput-form-microphone'
                                            onClick={onRecord}
                                        />
                                    ) || <></>
                                )
                            ) || (
                                <>
                                    <span className="dialogInput-form-info">Идет запись</span>
                                    <IconButton
                                        type="button"
                                        className='dialogInput-form-stop'
                                        onClick={onStopRecording}
                                    />
                                </>
                            )
                        )
                    }
                </div>
            </div>
    );
}

export default DialogInput;