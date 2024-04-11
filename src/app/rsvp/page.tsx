'use client'

import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useMenuState } from '../menu/state';
import { Typography } from '@mui/material';

const ThisMenuState = {
	title:
		<Typography
			variant='h6'
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<HowToRegIcon sx={{ marginRight: 1 }} />
			참석 여부
		</Typography>,
	opacity: 0.8
};

export default function Page() {
	const { menuState, setMenuState } = useMenuState();
	if (ThisMenuState !== menuState) {
		setMenuState(() => ThisMenuState);
	}
	return (
		<iframe style={{ border: 0, height: '100vh', width: '100vw' }} src='https://docs.google.com/forms/d/e/1FAIpQLSd6gQeNlncHg6tl8pt2lhHHHMpYywN2FzNI9oHx9TPR5CP1Dg/viewform?embedded=true' />
	);
}