import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const menu = ['Solicitações', 'Bairros', 'Indicadores', 'Variáveis', 'Usuários'];

export function NavBar(){
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    // if(event.target.value)
  };
  const clickMenu = (e) => {
    if(e === 'Solicitações'){
      router.push('/solicitacao')
    }else if(e === 'Usuários'){
      router.push('/usuario')
    }  

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
          {menu.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Box sx={{ flexGrow: 1, p:1, display: { xs: "none", md: "flex" }, gap:3 }}>
        {menu.map((page) => (
          <Link
            component="button"
            name={page}
            variant="body2"
            underline="hover"
            key={page}
            sx={{display: "block" }}
            onClick={(event)=> clickMenu(event.target.name)}
          >
            {page}
          </Link>
        ))}
      </Box>
    </>
  );
}