export interface IModalProps {
    active: boolean;
    title: string;
    hasFunctionButtons: boolean;
    onSubmit?: () => void;
    onClose?: () => void;
    customClassNameButtonFirst?: string;
    customClassNameButtonSecond?: string;
}