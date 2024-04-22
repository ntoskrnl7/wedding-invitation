import { weddingDay } from './config';

import { Typography } from '@mui/material';
import React, { CSSProperties } from 'react';
import Countdown, { CountdownTimeDelta } from 'react-countdown';

export default function CountdownTimer(props: { style?: CSSProperties }) {
    return (
        <Countdown
            date={weddingDay}
            renderer={({ days, hours, minutes, seconds, completed }: CountdownTimeDelta) => {
                if (completed) {
                    return <Typography
                        sx={{
                            textAlign: 'center',
                            fontSize: '8vw !important',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden', // 너비를 초과하는 내용은 숨김 처리
                            textOverflow: 'ellipsis' // 너비를 초과하는 텍스트는 말줄임표로 표시
                        }}
                        style={{ ...props.style }}>결혼식이 시작되었습니다.<br />👰🏻🧡🤵🏻</Typography>
                } else {
                    return <Typography style={{ ...props.style }}>{days ? days + '일' : ''} {hours ? hours + '시간' : ''} {minutes ? minutes + '분' : ''} {seconds ? seconds + '초' : ''}</Typography>;
                }
            }}
        />
    );
}