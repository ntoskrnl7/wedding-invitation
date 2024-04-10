'use client';

import { useState, ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import MenuList from './list';

import { useGlobalState } from './state';
import { GlobalStateProvider } from './state';
import { Box } from '@mui/material';

export default function MenuBar() {
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
    const { globalState, setGlobalState } = useGlobalState();

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = (e: any) => {
        setDrawerOpen(false);
    };

    return (
        <div>
            <style>
                {`
                    .MuiPaper-root {
                        background-color:transparent
                    }`
                }
            </style>
            <AppBar className='MenuBar' style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        <GlobalStateProvider>
                            {globalState.title}
                        </GlobalStateProvider>
                    </Typography>
                    <Box flexGrow={1} />
                    <IconButton
                        edge="end"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="top"
                open={isDrawerOpen}
                onClick={handleDrawerClose}
                onClose={handleDrawerClose}
            >
                <MenuList />
            </Drawer>
        </div>
    );
}