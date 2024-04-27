import type { Metadata } from 'next';
import { ReactNode } from 'react';

import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

export const metadata: Metadata = {
  title: '하은 ❤ 중광 결혼식에 초대합니다',
  description: '하은 ❤ 중광 결혼식에 초대합니다',
};

import './palette.global.scss';
import './global.scss';

import dynamic from 'next/dynamic';
const MenuStateProvider = dynamic(() => import('./menu'), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes' />
        <link rel='manifest' href='./manifest.json' />
      </head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body>
          <MenuStateProvider>
            {children}
          </MenuStateProvider>
        </body>
      </ThemeProvider>
    </html >
  );
}
