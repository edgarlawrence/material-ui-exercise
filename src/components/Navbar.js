import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MenuItem, Link } from '@mui/material';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <MenuItem>
                <Typography textAlign="center"> Your Pokedex </Typography>
                <Link href='/login'  sx={{ color: 'white', p: 3 }}> Login </Link>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
