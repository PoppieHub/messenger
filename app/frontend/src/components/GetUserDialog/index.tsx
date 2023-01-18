import React from 'react';
import './GetUserDialog.scss';

interface GetUserDialogProps {
    callback: (data: any) => void;
}
const GetUserDialog: React.FC<GetUserDialogProps> = (props) => {

    return (
        <div className='getUserDialog'>
            <button onClick={props.callback}>
                <span>Перейти к диалогу</span>
            </button>
        </div>
    );
}

export default GetUserDialog;