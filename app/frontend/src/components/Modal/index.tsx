import React from 'react';
import ReactDOM from "react-dom";
import {IModalProps} from "../../models/props/IModalProps";
import "./Modal.scss";
import {Button} from "../index";

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
                                    customClassName={"modal__button" + " " + customClassNameButtonFirst}
                                    callback={onClose}
                                />
                                <Button
                                    fullWidth={false}
                                    text={'Подтвердить'}
                                    customClassName={"modal__button" + " " + customClassNameButtonSecond}
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
