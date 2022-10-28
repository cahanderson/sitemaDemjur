import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const menu = ['Cadastros','Solicitações', 'Itens', 'Movimentações', 'Fornecedores', 'Usuários', 'Inventários', 'Relatórios'];

export function NavBar(){
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorE1] = useState(null)
  const open = Boolean(anchorEl);

  function openMenu(event){
      setAnchorE1(event.currentTarget)
  }
  function closeMenu(event){
      setAnchorE1(null)
      if(event.target.value === 1){
          router.push('/movimentacao/form_saida')
      }else if(event.target.value === 2){
          router.push('/movimentacao/form_entrada')
      }
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleMenu = () => {
    // if(event.target.value)
  };
  const clickMenu = (e) => {
    if(e === 'Solicitações'){
      router.push('/solicitacao')
    }else if(e === 'Usuários'){
      router.push('/usuario')
    }else if(e === 'Itens'){
      router.push('/item')  
    }else if(e === 'Movimentações'){
      router.push('/movimentacao')  
    }else if(e === 'Fornecedores'){
      router.push('/fornecedor')  
    }else if(e === 'Inventários'){
      router.push('/inventario')  
    }else if(e === 'Relatórios'){
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
        'aria-labelledby': 'basic-button',
        }}
    >
        <MenuItem  value={1} onClick={(e)=>closeMenu(e)}>Simplificado</MenuItem>
        <MenuItem  value={2} onClick={(e)=>closeMenu(e)}>Detalhado</MenuItem>
    </Menu>  
    }
  };

  // <Box alignItems='center' display='flex'>
  //   <Button
  //       id="demo-positioned-button"
  //       variant="outlined"
  //       onClick={(e)=>openMenu(e)}
  //       aria-haspopup="true"
  //       aria-controls={open ? 'basic-menu' : undefined}
  //       aria-expanded={open ? 'true' : undefined}  
  //   >
  //         Nova movimentação
  //   </Button>
  //   <Menu
  //       id="basic-menu"
  //       anchorEl={state.anchorEl}
  //       open={open}
  //       onClose={closeMenu}
  //       MenuListProps={{
  //       'aria-labelledby': 'basic-button',
  //       }}
  //   >
  //       {/* <MenuItem  value={1} onClick={(e)=>closeMenu(e)} >Saída para pacientes</MenuItem> */}
  //       <MenuItem  value={1} onClick={(e)=>closeMenu(e)}>Saídas</MenuItem>
  //       <MenuItem  value={2} onClick={(e)=>closeMenu(e)}>Entradas</MenuItem>
  //   </Menu>
  // </Box>

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
          onClose={handleMenu}
          sx={{
            display: { xs: "block", md: "none" }
          }}
        >
          {menu.map((page) => (
            <MenuItem key={page} onClick={handleMenu}>
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