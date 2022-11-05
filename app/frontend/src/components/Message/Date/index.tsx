import React from 'react';
import {MessageDateProps} from "../../../models/MessageDateProps";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";

const Date: React.FC<MessageDateProps> = ({message, shortDate = false}) => {
    return (
        <span className='message__date'>
            {message.updated_at && !shortDate &&
                <p className='message__date--updateData'>
                    {`обновлено ` + formatDistanceToNow(message.updated_at, {addSuffix: true, locale: ruLocale})}
                </p>
            }
            {!message.updated_at && message.created_at && !shortDate &&
                <p className='message__date--createData'>
                    {`отправлено ` + formatDistanceToNow(message.created_at, {addSuffix: true, locale: ruLocale})}
                </p>
            }
            {shortDate &&
                <p className='message__date--lastMessage'>
                    {formatDistanceToNow(message.updated_at || message.created_at, {addSuffix: true, locale: ruLocale})}
                </p>
            }
        </span>
    );
}

export default Date;