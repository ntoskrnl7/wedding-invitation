import { resourceBaseUrl } from '../config'

import Paper from '@mui/material/Paper';
import React, { CSSProperties, useEffect, useState } from 'react';
import './book.scss'

import HTMLFlipBook from './react-pageflip';
import { Box, Typography } from '@mui/material';
import { SizeType } from './page-flip/Settings';

interface Props {
  children?: React.ReactNode;
  number?: string;
  image?: string;
  className?: string;
  style?: React.CSSProperties;
};

const Page = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <Paper square elevation={3} className={`page page-${props.number} ${props.className ? props.className : ''}`} style={{ color: 'red', backgroundColor: 'blue' }} ref={ref}>
      <style>
        {`
          .page-${props.number} {
            background-color: white;
            ${props.image ? `background-image: url('${resourceBaseUrl}/picture/${props.image}.jpg') !important;` : ''}
            ${props.image ? `background-size: ${props.number === props.image ? 'cover' : '200%'};` : ''}
            ${props.image ? `background-position: ${props.number === props.image ? 'center' : props.number === props.image.split('-')[0] ? 'left center' : 'right center'};` : ''}
          }
        `}
      </style>
      {props.children}
      {props.image ? <div className='page-footer' style={{ fontSize: '12px', margin: '10px', color: 'white', textShadow: '1px 1px 2px black' }}>{props.number} / <span className='page-total'>-</span></div> : ''}
    </Paper>
  );
});
Page.displayName = 'Page';

export default function Book(props: { className?: string, style?: CSSProperties }) {
  const [width, height] = [300, 400]
  const [pageWidth, setPageWidth] = useState(width);
  const [pageHeight, setPageHeight] = useState(height);
  const [isPortrait, setIsPortrait] = useState(false);
  const [unit, setUnit] = useState(((typeof window === "undefined") || window.screen.orientation.type === 'portrait-primary') ? 'vh' : 'vw');

  useEffect(() => {
    const onOrientationChange = () => {
      const isPortrait = window.screen.orientation.type === 'portrait-primary';
      setIsPortrait(isPortrait);
      setUnit(isPortrait ? 'vh' : 'vw');
    };

    window.addEventListener('orientationchange', onOrientationChange);
    window.addEventListener('resize', onOrientationChange);
    onOrientationChange();

    return () => {
      window.removeEventListener('resize', onOrientationChange);
      window.removeEventListener('orientationchange', onOrientationChange);
    };
  }, [width, height]);


  const [bookKey, setBookKey] = useState(0);

  useEffect(() => {
    let pageWidth = window.innerWidth < window.innerHeight ? window.innerWidth : width * (window.innerHeight / height);
    let pageHeight = window.innerWidth < window.innerHeight ? height * (window.innerWidth / width) : window.innerHeight;

    if (window.innerWidth > window.innerHeight) {
      if (window.innerWidth / 2 < pageWidth) {
        pageWidth = window.innerWidth / 2;
        pageHeight = height * (window.innerWidth / 2 / width);
      }
    }

    setPageWidth(pageWidth);
    setPageHeight(pageHeight);
    setTimeout(() => setBookKey(prevKey => prevKey + 1), 100);
  }, [width, height, isPortrait]);

  return (
    <HTMLFlipBook
      key={bookKey}

      size={SizeType.FIXED}

      width={isPortrait ? pageWidth : width}
      height={isPortrait ? pageHeight : height}

      maxShadowOpacity={0.5}
      showCover={true}
      mobileScrollSupport={true}

      className={props.className ? props.className : ''}
      style={{ ...props.style, touchAction: 'auto' }}

      startPage={0}
      drawShadow={true}
      flippingTime={1000}
      usePortrait={true}
      startZIndex={0}
      autoSize={true}
      clickEventForward={false}
      useMouseEvents={true}
      swipeDistance={5000}
      showPageCorners={true}
      disableFlipByClick={false}
      onInit={(flipEvent) => {
        window.document.querySelectorAll(".page-total").forEach((el) => { el.innerHTML = (flipEvent.object.getPageCount() - 1).toString(); });
      }}
    >
      <Page number='0' className={'cover'}>
        <Typography variant='h6' fontFamily={'Brown Sugar'}>Our Story</Typography>
      </Page>
      <Page number='1'>
        <Box style={{ padding: 10 }}>
          <Box fontFamily='Diphylleia, serif' display="flex" alignItems="center" height={'10' + unit}>
            <Typography fontFamily='Diphylleia, serif' fontSize={'10' + unit}>Q</Typography>
            <Typography fontFamily='Diphylleia, serif' style={{ paddingTop: 40, paddingLeft: 10 }}>결혼을 앞둔 소감</Typography>
          </Box>
          <Box style={{ padding: 5 }}>
            <Box style={{ paddingTop: 10 }}>
              <Typography>🤵</Typography>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.2' + unit}>
                당장 눈앞의 결혼식부터 떨려서<br />
                결혼식장 무대에 오르는것도<br />
                잘할 수 있을지 걱정이 되지만 😵<br />
                그래도 사랑하는 사람과 결혼한다는 기대감과<br />
                설레임으로 결혼식을 준비하고 있습니다. 😊
              </Typography>
            </Box>
            <Box style={{ paddingTop: 30, textAlign: 'right' }}>
              <Typography>👰</Typography>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.2' + unit}>
                음..! 솔직히 말하면 실감이 안 나는 것인지<br />
                아직은 생각만큼 엄청 많이 떨리지는 않아요 😅<br />
                하지만 제 인생에 부모님과 함께 했던 시간보다<br />
                더 오래 함께할 사람을 만났다는 것이 참 신기해요.<br />
                저에게 와주어 너무나 감사한 사람입니다.<br />
                오빠는 죽지 않고 인터넷 세상에<br />
                자기를 업로드 해서 살겠다는데 🤣<br />
                그럴 날이 올 때까지 서로를 아껴주며 살겠습니다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Page>
      <Page number='2' image='2' />
      <Page number='3' image='3' />
      <Page number='4'>
        <Box style={{ padding: 10 }}>
          <Typography fontFamily='Brown Sugar' fontSize={'2.5' + unit} style={{ paddingTop: 10, paddingLeft: 10 }}>GROOM&#39;S COMMENTS</Typography>
          <Box style={{ padding: 5 }}>

            <Box style={{ padding: 5 }}>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.5' + unit}>Q. 어떤 가정을 꾸리고 싶은지</Typography>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.2' + unit}>
                - 신부 닮은 딸 낳아서 화목한 3인 가정을<br />꾸리고 싶습니다.👨‍👩‍👧<br />
                가족과 함께 행복한 추억 많이 만들어가면서<br />행복하게 살고 싶어요. 🥰<br />
              </Typography>
            </Box>

            <Box style={{ padding: 5 }}>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.5' + unit}>Q. 우리가 그리는 10년후 모습</Typography>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.2' + unit}>
                - 10년 후에도 지금처럼 변함없이<br />서로 아끼고 사랑하고 있을 것 같습니다.💑<br />
                지금과 달라질게 있다면... 음🙄...<br />
                노화 방지를 위해서 지금보다는 건강 관리에 더 신경쓰고있지 않을까 생각합니다. 💪🏻💇🏻‍♂️💇🏻‍♀️🩺🏥
              </Typography>
            </Box>

            <Box style={{ padding: 5 }}>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.5' + unit}>Q. 언젠가 하은이와 꼭 가보고 싶은 여행지</Typography>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.2' + unit}>
                - 아이슬란드🇮🇸, 영국🇬🇧, 프랑스🇫🇷, 스위스🇨🇭, 이탈리아🇮🇹 등 서유럽 이곳 저곳을 다니면서<br />
                맛있는것도 많이 먹고😋<br />
                재미있는것도 많이 보고😎<br />
                같이 가서 많은 추억 만들고 싶습니다. 🙏
                <br />
              </Typography>
              <Typography marginTop={1} textAlign='right' fontFamily='Noto Serif KR, serif' fontSize={'1.2' + unit}>
                👰&#39;s commentary : 우와! 기대되네요 😍
              </Typography>
            </Box>
          </Box>
        </Box>
      </Page>
      <Page number='5' image='5' />
      <Page number='6' image='6' />
      <Page number='7'>
        <Box style={{ padding: 10 }}>
          <Typography fontFamily='Brown Sugar' fontSize={'2.5' + unit} style={{ paddingTop: 10, paddingLeft: 10 }}>BRIDE&#39;S COMMENTS</Typography>
          <Box style={{ padding: 5 }}>

            <Box style={{ padding: 5 }}>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.5' + unit}>Q. 그의 첫인상 & 현재는</Typography>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.1' + unit} letterSpacing='-0.5px'>
                처음 중광 오빠의 인상은 되게 수줍고 소심해 보였어요.<br />
                되게 쩔쩔 매는 모습이 다른 사람이었다면 싫었을텐데<br />
                오빠는 귀여웠다면 콩깍지일까요? 😂<br />
                지금은 수줍음과 소심함과는 거리가 멀지만<br />
                그래도 여전히 귀엽고 제일 아껴주고 싶어요.<br />
              </Typography>
            </Box>

            <Box style={{ padding: 5 }}>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.5' + unit}>Q. 결혼 준비과정</Typography>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.1' + unit} letterSpacing='-0.5px'>
                생각보다 쉽지 않았어요.🤯<br />
                물론 오빠는 저를 많이 아끼고 사랑하기 때문에 무조건 제가 원하는<br />
                대로 다 해주려고 해서 표면적인 결혼 준비에 있어서는 마찰은<br />
                없었어요. 하지만 연애기간이 짧은지라 결혼 준비와 동시에<br />
                서로를 더 알아가는 과정에 있었기에<br />
                안맞는 부분이 있을 때마다 많이 힘들었어요.<br />
                그럴 때마다 오빠가 항상 흔들리지 않고 지켜주었고<br />
                덕분에 저도 오빠를 만나면서 사람과의 새로운 사랑 방식을 배워요.<br />
                결국은 오빠와 제가 바라보는 방향이 다르지 않음을<br />알게되었구요.<br />
                오빠도 저를 만나면서 사랑하는 방법을<br />
                배우고 있지 않나 싶어요.ㅎㅎ
              </Typography>
              <Typography marginTop={1} textAlign='right' fontFamily='Noto Serif KR, serif' fontSize={'1.2' + unit}>
                🤵&#39;s commentary : 잘따라와줘서 고마워요🥰
              </Typography>
            </Box>
          </Box>
        </Box>
      </Page>
      <Page number='8' image='8' />
      <Page number='9' image='9-10' />
      <Page number='10' image='9-10' />
      <Page number='11' image='11' />
      <Page number='12' image='12' />
      <Page number='13' image='13-14' />
      <Page number='14' image='13-14' />
      <Page number='15' image='15' />
      <Page number='16' image='16' />
      <Page number='17' image='17-18' />
      <Page number='18' image='17-18' />
      <Page number='19' image='19' />
      <Page number='20' image='20' />
      <Page number='21' image='21' />
      <Page number='22' image='22' />
      <Page number='23' image='23-24' />
      <Page number='24' image='23-24' />
      <Page number='25' image='25'>
      </Page>
      <Page number='26'>
        <Box style={{ padding: 10 }}>
          <Box fontFamily='Diphylleia, serif' display="flex" alignItems="center" height='18vh'>
            <Typography fontFamily='Diphylleia, serif' fontSize={'10' + unit}>Q</Typography>
            <Typography fontFamily='Diphylleia, serif' style={{ paddingTop: 40, paddingLeft: 10 }}>하객분들께 전하고 싶은 말</Typography>
          </Box>
          <Box style={{ padding: 5 }}>
            <Box style={{ paddingTop: 10 }}>
              <Typography>🤵</Typography>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.2' + unit} letterSpacing='-0.5px' lineHeight={'1.6' + unit}>
                내성적인 성격이기도하고 사람들과 교류한다거나<br />
                만나는 것보단 집에서 코딩하기👨‍💻를 더 좋아하다보니<br />
                인간 관계에 조금 소홀 할때가 종종 있었어서 😅<br />
                어려운 발걸음해주신것만으로도 정말 감사드립니다. 🙇🏻‍♂️<br />
                재미있게 즐길 수 있는 이벤트가 가득한 파티같은<br />결혼식으로 보답해드릴게요 🥳

              </Typography>
            </Box>
            <Box style={{ paddingTop: 10, textAlign: 'left' }}>
              <Typography>👰</Typography>
              <Typography fontFamily='Noto Serif KR, serif' fontSize={'1.2' + unit} letterSpacing='-0.5px' lineHeight={'1.6' + unit}>
                청첩장 늦게 드려서 죄송하다는 말씀먼저 드려요 😅🙇‍♀️<br />
                형식적이지 않은 결혼식을 하고 싶어서 욕심을 요상한 데서 부렸습니다 🤣
                다른 사람들도 하는 청첩장을 색다르게 하고 싶은 거 있죠?!<br />
                종이 청첩장(?)을 받으신 분들이 다들 신기해하시고 선물같다고<br />
                좋아하셔서 뿌듯해요. 모바일 청첩장도 오빠랑 함께 비어있는<br />
                웹부터 만들었어요. 시간만 더 있었으면 디자인이랑 레이아웃을<br />
                더 신경써서 만들텐데 자꾸 욕심 부리다가 늦어져서 적당히<br />
                마무리했답니다. 모바일 청첩장 기능들이 꽤 디테일하게 들어간<br />
                곳들이 있으니 아시는 분들은 알아주실거라 믿어요.. 🥹 ㅋㅋㅋ<br />
                예식은 1부 & 2부로 진행되고 무제한 포토부스와 마사지건,<br />
                전기그릴 등 다양한 이벤트 상품들을 준비했어요!! 🤑
              </Typography>
            </Box>
          </Box>
        </Box>
      </Page>
      <Page number='27' image='27' />
      <Page number='28' image='28' />
      <Page number='29' image='29' />
      <Page >
        <Box position='absolute' right='1vw' bottom='1vh'>
          <Box style={{ textAlign: 'right' }}>
            <Typography fontFamily='Brown Sugar' fontSize='10vh' height='10vh'>FIN.</Typography>
            <Typography fontSize='3vh'>but our story is going on...</Typography>
          </Box>
        </Box>
      </Page>
    </HTMLFlipBook >
  );
};