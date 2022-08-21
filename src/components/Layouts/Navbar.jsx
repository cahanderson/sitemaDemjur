import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from '@mui/material';

const pages = ['Alimentação de variáveis', 'Bairros', 'Indicadores', 'Variáveis', 'Usuários'];

export function NavBar(){
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" }
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Box sx={{ flexGrow: 1, p:1, display: { xs: "none", md: "flex" }, gap:3 }}>
        {pages.map((page) => (
          <Link
            component="button"
            variant="text"
            underline="hover"
            key={page}
            onClick={handleCloseNavMenu}
            sx={{display: "block" }}
          >
            {page}
          </Link>
        ))}
      </Box>
    </>
  );
}




















// import Box from "@mui/material/Box";
// import Link from "@mui/material/Link";
// import { useState } from "react";

// import styles from './styles.module.scss'

// export function NavBar(){

//   return (
//     <Box sx={{ flexGrow: 1 }} padding='10px' >
//       <div className={styles.links}>
//         <Link underline='hover' color='inherit'>Alimentação de variáveis</Link>
//         <Link underline='hover' color='inherit'>Bairros</Link>
//         <Link underline='hover' color='inherit'>Indicadores</Link>
//         <Link underline='hover' color='inherit'>Variáveis</Link>
//         <Link underline='hover' color='inherit'>Usuários</Link>
//       </div>
//     </Box>
//   );
// };