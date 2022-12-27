import React from 'react';
import "./DropDownMenu.scss";

type Props = {
    children: React.ReactNode;
};

const DropDownMenu: React.FC<Props> = ({children}) => {
    const [show, setShow] = React.useState<boolean>(false);

    return (
        <div className="dropDownMenu">
            <button onClick={() => setShow(!show)} className="dropDownMenu__button" />
            {show &&
                <div className="dropDownMenu__children">
                    {children}
                </div>
            }
        </div>
    );
}

export default DropDownMenu;
