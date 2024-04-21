import * as React from 'react';

import Box from '@mui/material/Box';
import { iconButtonClasses } from '@mui/material/IconButton';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import { CSSProperties } from 'react';

export default function ThemeDatePicker(props: { style?: CSSProperties }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
            <Box
                style={{ ...props.style }}
                sx={
                    [
                        {
                            fontSize: '400px',
                            '& .MuiPickerStaticWrapper-content': {
                                bgcolor: 'initial',
                            },
                            [`& .${iconButtonClasses.root}`]: {
                                color: 'primary.500',
                            },
                            '& .MuiYearCalendar-root': {
                                width: '100%',
                            },
                            '& .MuiDateCalendar-root': {
                                width: '100%',
                                height: 'fit-content',
                                '& .MuiPickersCalendarHeader-root': {
                                    margin: '12px 0',
                                    paddingLeft: '18px',
                                },
                                '& .MuiTypography-caption': {
                                    color: 'primary.300',
                                    height: 24,
                                    fontSize: 15,
                                },
                                '[role="presentation"]': {
                                    '& .MuiIconButton-root': {
                                        padding: 0,
                                    },
                                },
                                '& .MuiPickersSlideTransition-root': {
                                    minHeight: 165,
                                },
                                '& .MuiPickersYear-yearButton': {
                                    flexBasis: '20%',
                                    fontSize: '0.875rem',
                                    height: 'auto',
                                    width: 'auto',
                                    padding: '8px 12px',
                                    '&.Mui-selected': {
                                        color: '#fff',
                                        bgcolor: 'primary.main',
                                    },
                                },
                                '& [role="row"]': {
                                    justifyContent: 'space-around',
                                },
                                '& .MuiDateCalendar-viewTransitionContainer > div > div': {
                                    justifyContent: 'space-around',
                                },
                                '& .MuiPickersDay-root': {
                                    width: 24,
                                    height: 24,
                                    fontSize: 15,
                                    fontWeight: 500,
                                    '&:not(:hover)': {
                                        bgcolor: 'transparent',
                                    },
                                    '&.Mui-selected': {
                                        color: 'white',
                                        fontWeight: 'bold',
                                        bgcolor: 'secondary.main',
                                    },
                                    '&.MuiPickersDay-today': {
                                        '&:not(.Mui-selected)': {
                                            borderColor: 'primary.500',
                                        },
                                    },
                                },
                            },
                        }
                    ]}
            >
                <DateCalendar defaultValue={dayjs('2024-05-12')} />
            </Box>
        </LocalizationProvider >
    );
}