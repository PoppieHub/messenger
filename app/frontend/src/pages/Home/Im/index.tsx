import React from 'react';
import {Home} from "../../";
import {Dialogs} from "../../../containers/";
import {Dialog} from "../../../components/";

const Im = () => {
    const [dialogs, setDialogs] = React.useState<React.ReactNode>();

    React.useEffect(() => {
        setDialogs(
            <>
                <div className="messenger__sidebar-item">
                    <div className="messenger__sidebar-item-header">
                        <div className="messenger__sidebar-item-header-top">
                            <span>Список диалогов</span>
                        </div>
                    </div>
                    <div className="messenger__sidebar-dialogs">
                        <Dialogs/>
                    </div>
                </div>
            </>
        );
    }, []);

    return (
        <Home
            childrenFirst={dialogs}
            childrenSecond={<Dialog/>}
        />
    );
}

export default Im;