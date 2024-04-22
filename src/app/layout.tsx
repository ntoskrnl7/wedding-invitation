import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "하은 ❤ 중광 웨딩",
  description: "웨딩 초대장",
};

import './palette.global.scss';
import './global.scss';

import { MenuStateProvider } from "./menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="./manifest.json" />
      </head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body className={inter.className}>
          <MenuStateProvider>
            {children}
          </MenuStateProvider>
        </body>
      </ThemeProvider>
    </html >
  );
}
