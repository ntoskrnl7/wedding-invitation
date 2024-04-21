import React, { CSSProperties } from 'react';
import Countdown, { CountdownTimeDelta } from 'react-countdown';

export default function CountdownTimer(props: { style?: CSSProperties }) {
    return (
        <Countdown
            date={new Date('2024-05-12 12:00:00')}
            renderer={({ days, hours, minutes, seconds, completed }: CountdownTimeDelta) => {
                if (completed) {
                    return <span style={{ ...props.style }}>결혼식이 시작되었습니다. 👰🏻🧡🤵🏻</span>;;
                } else {
                    return <span style={{ ...props.style }}>{days ? days + '일' : ''} {hours ? hours + '시간' : ''} {minutes ? minutes + '분' : ''} {seconds ? seconds + '초' : ''}</span>;
                }
            }}
        />
    );
}