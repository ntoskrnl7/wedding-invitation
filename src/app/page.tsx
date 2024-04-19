'use client';

import { Menu } from './menu';

import Image from 'next/image';

import { useEffect, useState } from 'react';

import ConstructionIcon from '@mui/icons-material/Construction';
import { Box, Typography } from '@mui/material';

export default function Page() {
	useEffect(() => {
		const setVH = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};

		window.addEventListener('resize', setVH);
		setVH();

		return () => {
			window.removeEventListener('resize', setVH);
		};
	}, []);

	const isPortrait = () => (typeof window === "undefined") || window.screen.orientation.type === 'portrait-primary';

	const [unit, setUnit] = useState(isPortrait() ? 'vh' : 'vw');
	useEffect(() => {
		const onOrientationChange = () => {
			setUnit(isPortrait() ? 'vh' : 'vw');
		};

		window.addEventListener('resize', onOrientationChange);
		window.addEventListener('orientationchange', onOrientationChange);
		onOrientationChange();

		return () => {
			window.removeEventListener('resize', onOrientationChange)
			window.removeEventListener('orientationchange', onOrientationChange)
		};
	}, []);

	return (
		<>
			<style>{`
@keyframes drawLine {
  0% {
    opacity: 0;
    height: 0;
  }
  1% {
    opacity: 1;
    height: 1%;
  }
  100% {
    opacity: 1;
    height: 100%;
  }
}
.vertical-line {
  animation: drawLine 1.5s ease-in-out forwards 500ms;
}

@keyframes drawBody {
  0% {
    opacity: 0;
    height: 0;
  }
  1% {
    opacity: 1;
    height: 0;
  }
  100% {
    opacity: 1;
    height: 80vh;
  }
}
.body {
  opacity: 0;
  animation: drawBody 1s ease-in forwards;
}
			`}</style>
			<Menu title={<></>} opacity={0} />
			<Box style={{ backgroundColor: 'var(--primary-color-50)', }}>
				<section style={{ position: 'relative' }}>

					<div
						className='vertical-line no-bounce'
						style={{
							opacity: 0,
							zIndex: 0,
							position: 'absolute',
							top: 0,
							left: '50%',
							transform: 'translateX(-50%)',
							width: '2px',
							height: '100%',
							backgroundColor: 'black'
						}} />

					<div
						className='body no-bounce'
						style={{
							zIndex: 1, position: 'absolute', top: 0, left: 0, margin: '10vh', width: '80vw', height: '80vh', backgroundColor: 'var(--primary-color-50)',
							animationDelay: '1.6s'
						}}
					/>

					<Image
						style={{
							zIndex: 12,
							position: 'absolute',
							top: '0',
							right: '5vw',
							width: 'calc(35vh / 2.5)',
							height: '35vh',
							animationDelay: '2.5s'
						}}
						src={'/img/hand-top-right.svg'}
						width='0'
						height='0'
						alt='hand-top-right'
					/>

					<Box style={{
						zIndex: 10, position: 'absolute', top: '13vh', width: '100vw', color: 'black', textAlign: 'center',
						animationDelay: '2s'
					}}>
						<Typography fontSize={'1' + unit} fontFamily={'Bodoni Moda'}>gracefully</Typography>
						<Typography fontSize={'1.7' + unit} fontFamily={'Kayonest Free Trial'}>WEDDING DAY</Typography>
						<Image style={{ width: '1.5' + unit, height: '1.8' + unit }} src={'/img/bar.svg'} width='12' height='12' alt='/' />
						<Typography fontSize={'1' + unit} fontFamily={'Bodoni Moda'}>lee & park</Typography>
						<Typography fontSize={'2' + unit} fontFamily={'Garamond'}> JUNG KWANG & HA EUN</Typography>
					</Box>


					<Image
						style={{
							zIndex: 10,
							position: 'absolute',
							top: '27vh',
							right: 'calc(2vw + (682px / 4.5))',
							width: '80px',
							height: '80px',
							animationDelay: '2.1s'
						}}
						src={'/img/moon.svg'}
						width='0'
						height='0'
						alt='moon'
					/>

					<Image
						style={{
							zIndex: 11,
							position: 'absolute',
							top: '30vh',
							right: '5vw',
							width: 'calc(682px / 4)',
							height: 'calc(1084px / 4)',
							animationDelay: '2.2s'
						}}
						src={'/img/main.svg'}
						width='0'
						height='0'
						alt='main'
					/>


					<Image
						style={{
							zIndex: 11,
							position: 'absolute',
							top: '39vh',
							right: 'calc(calc(682px / 4) - 20px)',
							width: 'calc(682px / 4.5)',
							height: 'calc(1084px / 4.5)',
							animationDelay: '2.3s'
						}}
						src={'/img/door.svg'}
						width='0'
						height='0'
						alt='door'
					/>

					<Image
						style={{
							zIndex: 12,
							position: 'absolute',
							bottom: '20vh',
							left: '5vw',
							width: 'calc(35vh / 1.8)',
							height: '35vh',
							animationDelay: '2.5s'
						}}
						src={'/img/hand-bottom-left.svg'}
						width='0'
						height='0'
						alt='hand-top-right'
					/>

					<Box style={{
						zIndex: 10, position: 'absolute', bottom: '12vh', width: '100vw', color: 'black', textAlign: 'center',
						animationDelay: '2.4s'
					}}>
						<Typography fontSize={'1' + unit} fontFamily={'Bodoni Moda'}>when</Typography>
						<Typography fontSize={'2.5' + unit} fontFamily={'Bodoni Moda'} marginBottom={0.5}>2024. 05. 12</Typography>
						<Typography fontSize={'1' + unit} fontFamily={'Bodoni Moda'}>where</Typography>
						<Typography fontSize={'1.7' + unit} fontFamily={'Noto Serif KR'}>명동 밀리오레 호텔</Typography>
						<Typography fontSize={'2.5' + unit} fontFamily={'Noto Serif KR'}>18층 온즈드롬</Typography>
					</Box>

				</section>

				<section>
					<Box style={{ height: '100vh', display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
						<ConstructionIcon color='warning' style={{ fontSize: '100px' }} />
						<Typography variant="body1" style={{ textAlign: 'center' }}>현재 페이지는 준비 중입니다.😭<br />24년 4월 22일에 완료 예정입니다.😁</Typography>
					</Box>
				</section>
			</Box >
		</>
	);
}