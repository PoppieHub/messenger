import React from "react";
import {AvatarProps} from "../../models/AvatarProps";
import { generateAvatarByNickname } from "../../utils/helpers";
import './Avatar.scss';

const Avatar: React.FC<AvatarProps> = (props) => {
    if (props.contentList && props.contentList.items && props.contentList.items.length > 0) {
        return (
            <img className='avatar' src={props.contentList.items[0].link} alt={'Avatar ' + props.alt}/>
        );
    } else {
        const {colors} = generateAvatarByNickname(props.stringForGenerateColor);
        const firstChar = props.stringForFirstCharacter[0].toUpperCase();

        return (
            <div
                style={{background: `linear-gradient(135deg, ${colors.color} 0%, ${colors.colorLighten} 96.52%)`}}
                className='avatar avatar--symbol'
            >
                {firstChar}
            </div>
        );
    }
}

export default Avatar;
