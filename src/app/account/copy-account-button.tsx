'use client';

import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { AlertMessage, Message } from '../alert-message';
import { useState } from 'react';

export default function CopyAccountButton(props: { account: string }) {
    const [message, setMessage] = useState<Message | null>(null);

    return (
        <IconButton onClick={async () => {
            try {
                await navigator.clipboard.writeText(props.account);
                setMessage({ severity: 'success', message: <>계좌 번호가 복사되었습니다.</> });
            } catch (error) {
                setMessage({ severity: 'error', message: <>계좌 번호 복사가 실패하였습니다.</> });
            }
        }}>
            <AlertMessage message={message}></AlertMessage>
            <ContentCopyIcon />
        </IconButton>
    );
}
