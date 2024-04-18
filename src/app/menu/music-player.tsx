'use client';

import { useState, useRef, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { ArrowBackIosNew, ArrowForwardIos, MusicNote, MusicOff } from '@mui/icons-material';

import musics, { Music } from '../musics';

interface MusicPlayerProps {
	music?: Music;
	onPlay?: (music: Music) => void;
	onLoadStart?: (music: Music) => void;
	onPaused?: (music: Music) => void;
	onError?: (error: any) => void;
}

export default function MusicPlayer(props: MusicPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(true);
	const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
	const audioRef = useRef<HTMLAudioElement>(null);

	const togglePlayPause = () => {
		if (isPlaying) {
			audioRef.current?.pause();
			if (props.onPaused) {
				props.onPaused(musics[currentMusicIndex]);
			}
		} else {
			audioRef.current?.play();
		}
		setIsPlaying(!isPlaying);
	};

	const playPreviousMusic = () => {
		setCurrentMusicIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : musics.length - 1);
	};

	const playNextMusic = () => {
		setCurrentMusicIndex(prevIndex => (prevIndex + 1) % musics.length);
	};

	useEffect(() => {
		const audio = audioRef.current;
		if (audio) {
			audio.addEventListener('canplay', () => audio.play(), { once: true });
		}
	}, [currentMusicIndex]);

	useEffect(() => {
		if (isPlaying) {
			audioRef.current?.play().catch(error => {
				setIsPlaying(false);
				if (props.onError) {
					props.onError(error);
				}
			})
		}
	}, [isPlaying, props]);

	const touchStartX = useRef(0);

	const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
		touchStartX.current = event.touches[0].clientX;
	};

	const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
		const touchEndX = event.changedTouches[0].clientX;
		if (touchEndX > touchStartX.current + 50) {
			playNextMusic();
		} else if (touchStartX.current > touchEndX + 50) {
			playPreviousMusic();
		}
	};

	return (
		<>
			<audio
				src={'/api/proxy/streaming/bgm/' + musics[currentMusicIndex] + '.mp3'}
				ref={audioRef}
				onLoadStart={
					() => {
						if (props.onLoadStart) {
							props.onLoadStart(musics[currentMusicIndex]);
						}
					}
				}
				onPlay={
					() => {
						setIsPlaying(true);
						if (props.onPlay) {
							props.onPlay(musics[currentMusicIndex]);
						}
					}
				}
				onEnded={
					() => {
						playNextMusic();
						setIsPlaying(true);
					}
				}
				onPause={() => setIsPlaying(false)}
			/>

			<IconButton onClick={playPreviousMusic}>
				<ArrowBackIosNew style={{ fontSize: '8px' }} />
			</IconButton>

			<IconButton
				style={{ padding: 0 }}
				onClick={togglePlayPause}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				{isPlaying ? <MusicOff /> : <MusicNote />}
			</IconButton>

			<IconButton onClick={playNextMusic}>
				<ArrowForwardIos style={{ fontSize: '8px' }} />
			</IconButton>
		</>
	);
}