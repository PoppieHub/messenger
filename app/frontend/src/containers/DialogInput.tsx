import React from "react";
import {DialogInputContainerProps} from "../models/props/DialogInputContainerProps";
import {ContentListResponse} from "../models/response/ContentListResponse";
import {ContentListItem} from "../models/response/ContentListItem";
import {ShortChatList} from "../models/uploadedStoreModel/ShortChatList";
import {InputTextList} from "../models/inputDialogModel/InputTextList";
import {DialogInput as DialogInputComponent} from "../components";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import mime from "mime";
import MessageRequest from "../models/request/MessageRequest";
import {MessageItem} from "../models/response/MessageItem";
import {MessagesShortListResponse} from "../models/response/MessagesShortListResponse";

const DialogInput: React.FC<DialogInputContainerProps> = ({chat}) => {

    window.navigator.getUserMedia =
        window.navigator.getUserMedia ||
        window.navigator.mozGetUserMedia ||
        window.navigator.msGetUserMedia ||
        window.navigator.webkitGetUserMedia;

    const {store} = React.useContext(Context);

    const [value, setValue] = React.useState<boolean>(false);
    const [emojiPickerVisible, setEmojiPickerVisible] = React.useState<boolean>(false);
    const [flagForStyle, setFlagForStyle] = React.useState<boolean>(false);
    const [isRecording, setIsRecording] = React.useState<boolean>(false);
    const [isShortInput, setIsShortInput] = React.useState<boolean>(false);

    const [cursorPosition, setCursorPosition] = React.useState<number>(0);
    const [textField, setTextField] = React.useState<string>('');

    const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder | null>(null);

    const [uploaded, setUploaded] = React.useState<ContentListResponse>();
    const [images, setImages] = React.useState<ContentListResponse>();
    const [voice, setVoice] = React.useState<ContentListItem>();

    const pickerRef = React.useRef<null | HTMLDivElement>(null);
    const textAreaRef = React.useRef<null | HTMLTextAreaElement>(null);

    const maxSizeMessage: number = 500;

    React.useEffect(() => {
        let dialogListInput: InputTextList = {
          items: store.getDialogInput().items?
              [...store.getDialogInput().items]:
              []
        };
        textAreaRef.current?.focus();

        if (textField.length > maxSizeMessage * 0.05) {
            setFlagForStyle(true);
        } else {
            setFlagForStyle(false);
        }

        dialogListInput.items[chat.id] = {
            inputText: textField
        };

        store.setDialogInput({
            ...store.getDialogInput(),
            ...dialogListInput
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textField]);

    React.useEffect(() => {
        if (textField.length > 0 || uploaded?.items?.length! > 0) {
            setValue(true);
        } else {
            setValue(false);
        }
    }, [textField, uploaded]);

    React.useEffect(() => {
        if (emojiPickerVisible) {
            const handleClick = (e: any) => {
                if (!pickerRef.current) return;
                if (!pickerRef.current?.contains(e.target)) {
                    textAreaRef.current?.focus();
                    setEmojiPickerVisible(false);
                }
            }

            document.addEventListener('click', handleClick);

            return () => {
                document.removeEventListener('click', handleClick)
            }
        }
    }, [emojiPickerVisible]);

    React.useEffect(() => {
        if (textAreaRef.current?.selectionEnd!) {
            textAreaRef.current.selectionEnd = cursorPosition;
        }
    }, [cursorPosition]);

    React.useEffect(() => {
        if (store.getDialogInput().items && store.getDialogInput().items[chat.id]) {
            setTextField([...store.getDialogInput().items][chat.id].inputText);
        } else {
            setTextField('');
        }
        setCursorPosition(0);
        setIsShortInput(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat]);

    React.useEffect(() => {
        setUploaded({items: []});
        const tempUploaded: ShortChatList = {...store.getUploadedContentForChats()};

        if (tempUploaded?.items?.length > 0 &&
            tempUploaded.items[chat.id]
        ) {
            setUploaded({
                items: tempUploaded.items[chat.id].uploadedContent.items
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat, store.uploadedContentForChats]);

    React.useEffect(() => {
        let tempImagesList: ContentListResponse = {items: []};
        setVoice({} as ContentListItem);

        if (uploaded?.items?.length) {
            uploaded.items.forEach((item, index) => {
                if (mime.getType(item.link)?.includes('image')) {
                    tempImagesList.items[index] = item;
                } else if (mime.getType(item.link)?.includes('webm')) {
                    setVoice(item);
                    setIsShortInput(true);
                }
            });
        }

        setImages({
            ...images,
            ...tempImagesList
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploaded]);

    const onRecord = () => {
        navigator.mediaDevices.getUserMedia({audio: true}).then(stream => onRecording(stream)).catch(err => onError(err));
    };

    const onRecording = (stream: MediaStream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.start();

        recorder.onstart = () => {
            setIsRecording(true);
            setIsShortInput(true);
        };

        recorder.onstop = () => {
            setIsRecording(false);
        };

        recorder.ondataavailable = e => {
            const file = new File([e.data], 'audio.webm');
            store.uploadFiles([file]);
        };
    };

    const onStopRecording = () => {
        setIsRecording(false);
        mediaRecorder?.stop();
    }

    const onError = (err: MediaStreamError) => {
        console.log('The following error occured: ' + err);
    };

    const toggleEmojiPicker = () => {
        textAreaRef.current?.focus();
        setEmojiPickerVisible(!emojiPickerVisible);
    }

    const addEmoji = (identifier: string) => {
        const ref = textAreaRef.current;
        ref?.focus();

        const start: string = textField.substring(0, ref?.selectionStart) || '';
        const end: string = textField.substring(ref?.selectionStart || 500) || '';

        setTextField(start + identifier + end);
        setCursorPosition(start.length + identifier.length);
    }

    const uploadDocumentHandler = React.useCallback( (e: React.ChangeEvent<HTMLInputElement>) => {
        let collectionFiles: File[] = [];
        if (e.target.files) {
            [...e.target.files].forEach((item) => {
                const file: File = item;
                collectionFiles.push(file);
            });
            store.uploadFiles(collectionFiles);
        }
        e.target.value = '';
    }, [store]);

    const handleSendMessage = () => {
        // TODO: пересылка сообщений
        if (textField.trim().length > 0 || images?.items.length || voice?.id) {
            let messageRequest = {} as MessageRequest;
            let bodyMessage = {} as MessageItem;
            let contentListResponse = {items: []} as ContentListResponse;
            let replyMessage = {items: []} as MessagesShortListResponse;

            let tempUploadedContent = {...store.getUploadedContentForChats()} as ShortChatList;

            if (textField.trim().length > 0 || textField.length - 1 <= maxSizeMessage) {
                bodyMessage.message = textField.trim();
            }

            if (images?.items.length) {
                contentListResponse = {...images};
            }

            if (voice?.id) {
                // @ts-ignore
                contentListResponse.items.push({...voice});
            }

            bodyMessage.content = contentListResponse;
            bodyMessage.replyMessage = replyMessage;

            messageRequest.chat = chat.id.toString();
            messageRequest.bodyMessage = bodyMessage;

            if ((images?.items.length || voice?.id) && tempUploadedContent.items[chat.id]) {
                tempUploadedContent.items[chat.id].uploadedContent.items.splice(0);

                store.setUploadedContentForChats({
                    ...store.getUploadedContentForChats(),
                    ...tempUploadedContent
                });
            }

            store.addMessageAPI(messageRequest).then(() => {
                setTextField('');
                setIsShortInput(false);
            });
        }

        setEmojiPickerVisible(false);
    }

    const handleDeleteContent = (contentId: string) => {
        store.deleteUploadedContent(chat.id, contentId);
        setIsShortInput(false);
    }

    return (
        <DialogInputComponent
            toggleEmojiPicker={toggleEmojiPicker}
            emojiPickerVisible={emojiPickerVisible}
            setEmojiPickerVisible={setEmojiPickerVisible}
            value={value}
            textField={textField}
            setTextField={setTextField}
            maxSizeMessage={maxSizeMessage}
            uploadDocumentHandler={uploadDocumentHandler}
            handleSendMessage={handleSendMessage}
            pickerRef={pickerRef}
            addEmoji={addEmoji}
            flagForStyle={flagForStyle}
            textAreaRef={textAreaRef}
            images={images || {items: []}}
            voice={voice}
            callbackOnDeleteContent={handleDeleteContent}
            onRecord={onRecord}
            onStopRecording={onStopRecording}
            isRecording={isRecording}
            isShortInput={isShortInput}
        />
    );
}

export default observer(DialogInput);