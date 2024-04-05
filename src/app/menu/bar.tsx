'use client';

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import MenuList from './list';

export default function MenuBar() {
    const router = useRouter();

    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

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
            <AppBar position="fixed" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
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