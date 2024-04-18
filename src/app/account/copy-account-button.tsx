'use client';

import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { showAlert } from '../alert-message';

export default function CopyAccountButton(props: { account: string }) {
    return (
        <IconButton onClick={async () => {
            try {
                await navigator.clipboard.writeText(props.account);
                showAlert({ severity: 'success', message: <>계좌 번호가 복사되었습니다.</> });
            } catch (error) {
                showAlert({ severity: 'error', message: <>계좌 번호 복사가 실패하였습니다.</> });
            }
        }}>
            <ContentCopyIcon />
        </IconButton>
    );
}
