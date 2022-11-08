import React from 'react';

export const Title = (countMessage:Readonly<number> = 0): void => {
    const [title] = React.useState<string>(`${process.env.REACT_APP_NAME_PROJECT}`);

    React.useEffect(() => {
        countMessage > 0?
            document.title = `(${countMessage}) ` + title:
            document.title = title;
    }, [countMessage, title]);
};

export default Title;