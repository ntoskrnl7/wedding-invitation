'use client';

import Image from "next/image";

import IconButton from '@mui/material/IconButton';

export default function KakaoPayButton(props: { url: string }) {
    return (
        <IconButton onClick={() => window.open(props.url, '_blank')}>
            <Image src={'/account/kakao.png'} width='168' height='48' alt='naver' />
        </IconButton>
    );
}