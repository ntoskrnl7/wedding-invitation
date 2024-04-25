'use client';

import { Menu } from '../menu';

import Image from 'next/image';

import { useEffect, useState, useRef } from 'react';

import { Box, Typography } from '@mui/material';

import dynamic from 'next/dynamic';

const CountdownTimer = dynamic(
	() => import('../countdown-timer'),
	{ ssr: false }
);

const ThemeDatePicker = dynamic(
	() => import('../date-picker'),
	{ ssr: false }
);

export default function Page() {
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

	const sectionsRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const resetAnimation = (element: Element) => {
			if (element instanceof HTMLElement) {
				const delay = element.style.animationDelay;
				element.style.animation = 'none';
				element.offsetHeight; // reflow를 트리거하여 CSS 변경을 적용
				element.style.animation = ''; // 기존 정의된 CSS 애니메이션을 재적용
				element.style.animationDelay = delay; // 기존 딜레이 재적용
			}
		};
		const resetAnimationForAll = (element: Element) => {
			resetAnimation(element);
			element.querySelectorAll('*').forEach(resetAnimation);
		};
		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					resetAnimationForAll(entry.target);
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, {
			root: null,
			threshold: 0.1
		});

		const sections = sectionsRef.current;
		if (sections) {
			Array.from(sections.children).forEach(section => {
				observer.observe(section);
			});
		}

		return () => {
			if (sections) {
				Array.from(sections.children).forEach(section => {
					observer.unobserve(section);
				});
			}
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
					opacity: 0;
					animation: drawLine 1.5s ease-in-out forwards 500ms;
				}

				@keyframes drawMain {
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
				.main {
					opacity: 0;
					animation: drawMain 1s ease-in forwards;
				}
			`}</style>

			<Menu title={<></>} opacity={0} />

			<Box ref={sectionsRef} style={{ backgroundColor: 'var(--primary-color-50)', }}>
				<section id='first' style={{ position: 'relative' }}>
					<div
						className='vertical-line no-bounce'
						style={{
							zIndex: 0,
							position: 'absolute',
							top: 0,
							left: '50%',
							transform: 'translateX(-50%)',
							width: '2px',
							height: '100%',
							backgroundColor: 'black'
						}}
					/>

					<div
						className='main no-bounce'
						style={{
							zIndex: 1,
							position: 'absolute',
							top: 0,
							left: 0,
							marginTop: '10vh',
							marginBottom: '10vh',
							width: '80vw',
							height: '80vh',
							backgroundColor: 'var(--primary-color-50)',
							animationDelay: '1.6s'
						}}
					/>

					<Image
						style={{
							zIndex: 12,
							position: 'absolute',
							top: '0',
							right: '7vw',
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
						zIndex: 12, position: 'absolute', top: '13vh', width: '100vw', color: 'black', textAlign: 'center',
						animationDelay: '2s'
					}}>
						<Typography fontSize={'2' + unit} fontWeight={'bold'} fontFamily={'Kayonest Free Trial'}>WEDDING DAY</Typography>
						<Typography fontSize={'1.2' + unit} className='diphylleia-regular'>of</Typography>
						<Typography fontSize={'3.5' + unit} fontFamily={'Garamond'}> JUNG KWANG</Typography>
						<Typography style={{ marginTop: -18 }} fontSize={'3.5' + unit} fontFamily={'Garamond'}> HA EUN</Typography>
					</Box>

					<Typography style={{
						zIndex: 10, position: 'absolute', top: '11vh', left: '20vw', color: 'var(--primary-color-200)',
						animationDelay: '2s'
					}} fontSize={'14.5' + unit} fontFamily={'Brown Sugar'}>&</Typography>

					<Image
						style={{
							zIndex: 10,
							position: 'absolute',
							top: '29vh',
							right: 'calc(18vw + (682px / 4.5))',
							width: '90px',
							height: '90px',
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
							top: '25vh',
							right: '5vw',
							width: 'calc((682px / 3))',
							height: 'calc(1084px / 3)',
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
							top: '50vh',
							right: 'calc(calc(682px / 4) + 11.5vw)',
							width: 'calc(682px / 5)',
							height: 'calc(1084px / 5)',
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
						zIndex: 20,
						position: 'absolute',
						bottom: '11vh',
						width: '100vw',
						color: 'black',
						textAlign: 'center',
						animationDelay: '2.4s'
					}}>
						<Typography fontSize={'2.5' + unit} className='bodoni-moda-regular' marginBottom={0.5}>2024. 05. 12</Typography>
						<Typography fontSize={'1.7' + unit} className='noto-serif-kr-regular'>명동 밀리오레 호텔</Typography>
						<Typography fontSize={'2.5' + unit} className='noto-serif-kr-regular'>18층 온즈드롬</Typography>
					</Box>

				</section>

				<section id='second' style={{ position: 'relative' }}>
					<div
						className='vertical-line no-bounce'
						style={{
							zIndex: 0,
							position: 'absolute',
							top: 0,
							left: '50%',
							transform: 'translateX(-50%)',
							width: '2px',
							height: '100%',
							backgroundColor: 'black'
						}}
					/>

					<div
						className='main no-bounce'
						style={{
							zIndex: 1,
							position: 'absolute',
							top: 0,
							left: 0,
							marginTop: '10vh',
							marginBottom: '10vh',
							width: '80vw',
							height: '80vh',
							backgroundColor: 'var(--primary-color-50)',
							animationDelay: '1.6s'
						}}
					/>

					<Box style={{
						position: 'relative',
						paddingTop: '15vh',
						display: 'grid',
						alignItems: 'center',
						justifyItems: 'center',
						zIndex: 3,
						animationDelay: '2s'
					}}>
						<Box style={{
							zIndex: 3,
							top: '18vh',
							width: '100vw',
							color: 'black',
							textAlign: 'center',
							animationDelay: '2s'
						}}>
							<Typography fontSize={'5' + unit} fontFamily={'Kayonest Free Trial'}>Save The Date</Typography>
							<Typography fontSize={'2' + unit} className='diphylleia-regular'>2024년 5월 12일 일요일 낮 12시</Typography>
						</Box>

						<ThemeDatePicker
							style={{
								zIndex: 3,
								top: '20vh',
								animationDelay: '2s'
							}} />

						<CountdownTimer style={{
							zIndex: 3,
							fontSize: '3vh',
							animationDelay: '2s'
						}} />

						<Box style={{ marginTop: '2vh', textAlign: 'center' }}>
							<Typography style={{ color: 'var(--primary-color-800)' }} fontSize={'1.7' + unit} className='noto-serif-kr-regular'>다양한 이벤트들이 준비되어있습니다.</Typography>
							<Typography style={{ color: 'var(--primary-color-800)' }} fontSize={'1.7' + unit} className='noto-serif-kr-regular'>귀한 걸음 오셔서 축복해주시면</Typography>
							<Typography style={{ color: 'var(--primary-color-800)' }} fontSize={'1.7' + unit} className='noto-serif-kr-regular'>기쁜 마음으로 간직하겠습니다.</Typography>
						</Box>

						<Box style={{ marginTop: '5vh', textAlign: 'center', color: 'var(--primary-color-900)' }}>
							<Box display='flex' alignItems='center'>
								<Typography fontWeight={'bold'} fontSize={'2' + unit} fontFamily='Noto Serif KR, serif'>이삼로 · 문근순</Typography>
								<Typography marginLeft={1} fontSize={'1.7' + unit} className='noto-serif-kr-regular'>의 차남</Typography>
								<Typography fontWeight={'900'} marginLeft={1} fontSize={'2' + unit} fontFamily='Noto Serif KR, serif'>중광</Typography>
							</Box>
							<Box display='flex' alignItems='center'>
								<Typography fontWeight={'bold'} fontSize={'2' + unit} fontFamily='Noto Serif KR, serif'>김영기 · 장영희</Typography>
								<Typography marginLeft={1} fontSize={'1.7' + unit} className='noto-serif-kr-regular'>의 장녀</Typography>
								<Typography fontWeight={'900'} marginLeft={1} fontSize={'2' + unit} fontFamily='Noto Serif KR, serif'>하은</Typography>
							</Box>
						</Box>
					</Box>
				</section>
			</Box >
		</>
	);
}