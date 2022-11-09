import type from "tinycolor2";
import {Md5} from 'ts-md5';

const getCorrectIndex = (number: number) => {
    return (number > 255)? 255: (number < 0)? 0 : number;
};

export const generateAvatarByNickname = (nickname: string) => {
    const hash = Md5.hashStr(nickname);
    const [r, g, b] = hash.substring(0, 3).split("").map(char => getCorrectIndex(char.charCodeAt(0)));

    return {
        colors: {
            color: type({ r, g, b })
                .lighten(10)
                .saturate(10)
                .toHexString(),
            colorLighten: type({ r, g, b })
                .lighten(30)
                .saturate(30)
                .toHexString()
        }
    };
};

export default generateAvatarByNickname;