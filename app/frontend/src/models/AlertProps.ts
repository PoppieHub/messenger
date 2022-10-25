export interface AlertProps {
    text: string;
    state: boolean;
    updateInfo: (data: boolean) => void;
}