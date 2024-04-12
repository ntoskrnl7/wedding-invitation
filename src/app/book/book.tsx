'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import './book.scss'

const HTMLFlipBook = dynamic(() => import('react-pageflip'), { ssr: false });

interface Props {
  children: React.ReactNode;
  number: string;
  image?: string;
  className?: string;
  style?: React.CSSProperties;
};

const Page = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div className={`page page-${props.number} ${props.className ? props.className : ''}`} style={{ color: 'red', backgroundColor: 'blue' }} ref={ref}>
      <style>
        {`
          .page-${props.number} {
            background-color: white;
            ${props.image ? `background-image: url('./${props.image}.jpg') !important;` : ''}
            ${props.image ? `background-size: ${props.number === props.image ? 'cover' : '200%'};` : ''}
            ${props.image ? `background-position: ${props.number === props.image ? 'center' : props.number === props.image.split('-')[0] ? 'left center' : 'right center'};` : ''}
          }
        `}
      </style>
      {props.children}
      {props.image ? <div className='page-footer' style={{ fontSize: '12px', margin: '10px', color: 'white', textShadow: '1px 1px 2px black' }}>{props.number} / <span className='page-total'>-</span></div> : ''}
    </div>
  );
});
Page.displayName = 'Page';

export default function Book() {
  const [width, height] = [300, 400]
  const [pageWidth, setPageWidth] = React.useState(width);
  const [pageHeight, setPageHeight] = React.useState(height);
  const [isPortrait, setIsPortrait] = React.useState(false);
  const [usePortrait, setUsePortrait] = React.useState(true);

  const [bookKey, setBookKey] = React.useState(0);

  React.useEffect(() => {
    const onOrientationChange = () => setBookKey(prevKey => prevKey + 1);

    window.addEventListener('resize', onOrientationChange);
    window.addEventListener('orientationchange', onOrientationChange);

    const isPortrait = window.screen.orientation.type === 'portrait-primary';
    setIsPortrait(isPortrait);

    let pageWidth = window.innerWidth < window.innerHeight ? window.innerWidth : width * (window.innerHeight / height);
    let pageHeight = window.innerWidth < window.innerHeight ? height * (window.innerWidth / width) : window.innerHeight;

    if (isPortrait) {
      if (window.innerWidth > window.innerHeight) {
        if (window.innerWidth / 2 < pageWidth) {
          pageWidth = window.innerWidth / 2;
          pageHeight = height * (window.innerWidth / 2 / width);
          setUsePortrait(false);
        }
      }
    }

    setPageWidth(pageWidth);
    setPageHeight(pageHeight);

    console.log(`isPortrait: ${isPortrait}, pageWidth : ${[pageWidth, window.innerWidth]}, pageHeight: ${[pageHeight, window.innerHeight]}`);

    return () => {
      window.removeEventListener('resize', onOrientationChange)
      window.removeEventListener('orientationchange', onOrientationChange)
    };
  }, [width, height, bookKey]);

  return (
    <HTMLFlipBook
      key={bookKey}

      size={'fixed'}

      width={pageWidth}
      minWidth={pageWidth}
      maxWidth={pageWidth}

      height={pageHeight}
      minHeight={pageHeight}
      maxHeight={pageHeight}

      maxShadowOpacity={0.5}
      showCover={true}
      mobileScrollSupport={true}

      className={'book'}
      style={{}}

      startPage={0}
      drawShadow={true}
      flippingTime={1000}
      usePortrait={usePortrait}
      startZIndex={0}
      autoSize={!isPortrait}
      clickEventForward={false}
      useMouseEvents={true}
      swipeDistance={5000}
      showPageCorners={true}
      disableFlipByClick={false}
      onInit={(flipEvent: any) => {
        window.document.querySelectorAll(".page-total").forEach((el) => { el.innerHTML = (flipEvent.object.getPageCount() - 1).toString(); });
      }}
    >
      <Page number='0' className={'cover'}><h1>Our Story</h1></Page>
      <Page number='1' image='1'><span></span></Page>
      <Page number='2' image='2'><span></span></Page>
      <Page number='3' image='3-4'><span></span></Page>
      <Page number='4' image='3-4'><span></span></Page>
      <Page number='5' image='5'><span></span></Page>
      <Page number='6' image='6'><span></span></Page>
      <Page number='7' image='7-8'><span></span></Page>
      <Page number='8' image='7-8'><span></span></Page>
    </HTMLFlipBook>
  );
};