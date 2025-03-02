import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const TransitionAlert = ({ message, severity = 'info', autoHide = null, sx, open, onClose }) =>
{
	React.useEffect(() =>
	{
		if (autoHide && open)
		{
			const timer = setTimeout(() =>
			{
				onClose();
			}, autoHide);
			return () => clearTimeout(timer);
		}
	}, [autoHide, open, onClose]);

	return (
		<Box sx={{ width: '100%', ...sx }}>
			<Collapse in={open}>
				<Alert
					severity={severity}
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={onClose}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					sx={{ mb: 2 }}
				>
					{message}
				</Alert>
			</Collapse>
		</Box>
	);
};


export default TransitionAlert;
