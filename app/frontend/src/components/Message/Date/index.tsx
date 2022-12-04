import React from 'react';
import {MessageDateProps} from "../../../models/props/MessageDateProps";
import {format, isToday, fromUnixTime, formatDistanceToNow} from "date-fns";
import ruLocale from "date-fns/locale/ru";

const getMessageTime = (date: Date): string => {
    if (isToday(date)) {
        return format(date, 'HH:mm');
    } else {
        return format(date, 'd.MM.yy');
    }
};

const Date: React.FC<MessageDateProps> = ({message, shortDate = false}) => {
    const [dateTime, setDateTime] = React.useState<number>(0);

    React.useEffect(() => {
        if (message.updatedAt) {
            setDateTime(message.updatedAt);
        } else if (message.createdAt) {
            setDateTime(message.createdAt);
        }
    },[message.updatedAt, message.createdAt]);

    return (
        <span className='message__date'>
            {message.updatedAt && !shortDate &&
                <p className='message__date--updateData'>
                    {`обновлено ` + formatDistanceToNow(fromUnixTime(dateTime), {addSuffix: true, locale: ruLocale})}
                </p>
            }
            {!message.updatedAt && message.createdAt && !shortDate &&
                <p className='message__date--createData'>
                    {`отправлено ` + formatDistanceToNow(fromUnixTime(dateTime), {addSuffix: true, locale: ruLocale})}
                </p>
            }
           {shortDate &&
                <p className='message__date--lastMessage'>
                    {getMessageTime(fromUnixTime(dateTime))}
                </p>
            }
        </span>
    );
}

export default Date;