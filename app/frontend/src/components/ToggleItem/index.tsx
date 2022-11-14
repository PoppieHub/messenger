import React from "react";
import {ToggleProps} from "../../models/props/ToggleProps";
import {Link} from "react-router-dom";
import './ToggleItem.scss';

const ToggleItem: React.FC<ToggleProps> = (props) => {
    if (props.link) {
        return (
            <Link className="toggle-item" to={props.link}>
                <div className="toggle-item-icon" style={{backgroundImage: `url(${props.svgUrl})`}} />
                <span className="toggle-item-name">{props.name}</span>
            </Link>
        );
    } else {
        return (
            <div className="toggle-item" onClick={props.onClick && props.onClick}>
                <div className="toggle-item-icon" style={{backgroundImage: `url(${props.svgUrl})`}}/>
                <span className="toggle-item-name">{props.name}</span>
            </div>
        );
    }
}

export default ToggleItem;