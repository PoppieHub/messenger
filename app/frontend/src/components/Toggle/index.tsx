import React from "react";
import {ToggleItem} from "../index";
import {svgProfile, svgDialogs, svgContact, svgExit, svgPlus} from "../../assets";
import {Context} from "../../index";
import {browserRouteIm, browserRouteProfile, browserRouteContacts} from "../../routes";
import classNames from "classnames";
import './Toggle.scss';

const Toggle = () => {
    const {store} = React.useContext(Context);
    const [status, setStatus] = React.useState<boolean>(false);

    return (
        <div className="toggle__sidebar">
            <button className={classNames("toggle__sidebar__switch",
                {"toggle__sidebar__switch--status": status})}
                    onClick={() => setStatus(!status)}
                    style={{backgroundImage: `url(${svgPlus})`}}
            />
            {(status &&
                <div className="toggle__sidebar-container">
                    <ToggleItem name={'Профиль'} svgUrl={svgProfile} link={browserRouteProfile}/>
                    <ToggleItem name={'Диалоги'} svgUrl={svgDialogs} link={browserRouteIm}/>
                    <ToggleItem name={'Контакты'} svgUrl={svgContact} link={browserRouteContacts} />
                    <ToggleItem name={'Выйти'} svgUrl={svgExit} onClick={() => store.logout()} />
                </div>
            )}
        </div>
    );
}

export default Toggle;