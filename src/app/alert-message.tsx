'use client';

import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

interface Message {
	severity: AlertColor;
	message?: React.JSX.Element | undefined;
};

export let showAlert: Dispatch<SetStateAction<Message>> = (message) => {
	console.warn(`showAlert function cannot be called before the AlertMessage component is mounted. ${message}`);
};

export const AlertMessage = () => {

	const [message, showMessage] = useState<Message>({ severity: 'success' });
	showAlert = showMessage;

	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(false);
		setTimeout(() => setOpen(true), 50);
	}, [message]);

	return (
		<Snackbar style={{ opacity: 0.5 }} open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
			<Alert
				onClose={() => setOpen(false)}
				severity={message.severity}
				variant="filled"
				sx={{ width: '100%' }}
			>
				{message.message}
			</Alert>
		</Snackbar>
	);
}

export default AlertMessage;