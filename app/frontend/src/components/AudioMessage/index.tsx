import React from 'react';
import {AudioMessageProps} from "../../models/props/AudioMessageProps";
import {convertCurrentTime} from "../../utils/helpers";
import classNames from "classnames";
import './AudioMessage.scss';

const AudioMessage: React.FC<AudioMessageProps> = ({content, isMe = false, replyStatus = false}) => {
    const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
    const audioElem = React.useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = React.useState<number>(0);
    const [currentTime, setCurrentTime] = React.useState<number>(0);

    React.useEffect(() => {
        if (audioElem.current) {
            audioElem.current.addEventListener(
                'playing',
                () => {
                    setIsPlaying(true);
                }, false
            );
            audioElem.current.addEventListener(
                'ended',
                () => {
                    setIsPlaying(false);
                    setProgress(0);
                    setCurrentTime(0);
                }, false
            );
            audioElem.current.addEventListener(
                'pause',
                () => {
                    setIsPlaying(false);
                }, false
            );
            audioElem.current.addEventListener('timeupdate', () => {
                const duration = (audioElem.current && audioElem.current.duration) || 0;
                audioElem.current && setCurrentTime(audioElem.current.currentTime);
                audioElem.current && setProgress((audioElem.current.currentTime / duration) * 100);
            });
        }
    }, [audioElem, content]);

    const togglePlay = () => {
        if (!isPlaying && audioElem.current) {
            audioElem.current.play();
        } else if (isPlaying && audioElem.current) {
            audioElem.current.pause();
        }
    }

    return (
        <div className={classNames('message__audio', {'message__audio--isMe': isMe && !replyStatus})}>
            <audio ref={audioElem} src={content.link} preload='auto'/>
            <div className="message__audio-progress"  style={{width: progress + '%'}}/>
            <div className="message__audio-info">
                <div className="message__audio-btn">
                    <button className={classNames({
                        'btn-play': !isPlaying,
                        'btn-pause': isPlaying
                    })} onClick={togglePlay} />
                </div>
                <div className="message__audio-wave" />
                <span className="message__audio-duration">{convertCurrentTime(currentTime)}</span>
            </div>
        </div>
    );
}

export default AudioMessage;