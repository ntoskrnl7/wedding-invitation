'use client';

import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export interface Message {
	severity: AlertColor;
	message?: React.JSX.Element | undefined;
};

export const AlertMessage = (props: { message: Message | null }) => {

	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(false);
		setTimeout(() => setOpen(true), 50);
	}, [props.message]);

	if (!props.message) {
		return (<></>);
	}
	return (
		<Snackbar style={{ opacity: 0.5 }} open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
			<Alert
				onClose={() => setOpen(false)}
				severity={props.message.severity}
				variant="filled"
				sx={{ width: '100%' }}
			>
				{props.message.message}
			</Alert>
		</Snackbar>
	);
}

export default AlertMessage;