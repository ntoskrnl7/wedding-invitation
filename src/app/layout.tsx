import type { Metadata } from "next";
import { Inter } from "next/font/google";

import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import MenuBar from './menu/bar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "하은 ❤ 중광 웨딩",
  description: "웨딩 초대장",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="./manifest.json"></link>
      </head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body className={inter.className}>
          <MenuBar />
          {children}
        </body>
      </ThemeProvider>
    </html >
  );
}
