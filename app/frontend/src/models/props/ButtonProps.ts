export interface ButtonProps {
    text: string;
    callback?: (data: any) => void;
    fullWidth?: boolean;
    customClassName?: string;
    disable?: boolean;
}