import React from 'react';
import ReactDOM from "react-dom";
import {IModalProps} from "../../models/props/IModalProps";
import {Button} from "../index";
import "./Modal.scss";
const Modal: React.FC <React.PropsWithChildren<IModalProps>> = (
    {
        active,
        title,
        hasFunctionButtons = false,
        onSubmit,
        onClose,
        customClassNameButtonFirst = '',
        customClassNameButtonSecond = '',
        children
    }) => {
    const [classNameButtonFirst] = React.useState<string>(`modal__button ${customClassNameButtonFirst}`);
    const [classNameButtonSecond] = React.useState<string>(`modal__button ${customClassNameButtonSecond}`);
    if (active) {
        const portalElement = document.getElementById('root');

        if (portalElement) {
            return ReactDOM.createPortal(
                <div className="modal" onClick={onClose}>
                    <div className="modal__content" onClick={event => event.stopPropagation()}>
                        <div className="modal__header">
                            <div className="modal__title">{title}</div>
                        </div>
                        <div className="modal__body">{children}</div>
                        {(hasFunctionButtons &&
                            <div className="modal__footer">
                                <Button
                                    fullWidth={false}
                                    text={'Отмена'}
                                    customClassName={classNameButtonFirst}
                                    callback={onClose}
                                />
                                <Button
                                    fullWidth={false}
                                    text={'Подтвердить'}
                                    customClassName={classNameButtonSecond}
                                    callback={onSubmit}
                                />
                            </div>
                        )}
                    </div>
                </div>,
                portalElement
            );
        }
        else {
            return (<></>);
        }
    } else {
        return (<></>);
    }
}

export default Modal;
