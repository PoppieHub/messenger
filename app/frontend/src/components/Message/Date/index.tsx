import React from 'react';
import {MessageDateProps} from "../../../models/props/MessageDateProps";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";
import isToday from 'date-fns/isToday';
import ruLocale from "date-fns/locale/ru";

const getMessageTime = (dateTimestamp: number): string => {
    if (isToday(dateTimestamp)) {
        return format(dateTimestamp, 'HH:mm');
    } else {
        return format(dateTimestamp, 'd.MM.yy');
    }
};

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
                    {getMessageTime(message.updated_at || message.created_at)}
                </p>
            }
        </span>
    );
}

export default Date;