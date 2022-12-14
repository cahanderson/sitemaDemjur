import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import {UsuariosService} from '../../lib/usuario'
import { Button, Stack, Typography } from '@mui/material';

export function NavBar(){
  const { user } = useAuth({ middleware: 'auth' })
  const router = useRouter();
  const [menuRelatorio, setMenuRelatorio] = useState(null)
  const [menuCadastro, setMenuCadastro] = useState(null)
  const [userAuthenticate, setUserAuthenticate] = useState({})
  const openRelatorio = Boolean(menuRelatorio);
  const openCadastro = Boolean(menuCadastro);

  function loadUser(){
    UsuariosService.getById(user?.id)
    .then((result)=>{
        if(result instanceof Error){
            return;
        }
        setUserAuthenticate(result.data)
    })
  }
  const handleClickRelatorio = (event) =>{
    setMenuRelatorio(event.currentTarget)
  }
  const handleClickCadastro = (event) =>{
    setMenuCadastro(event.currentTarget)
  }
  const handleRelatorio = (event) =>{
    if(event.target.value == 1){
      router.push('/relatorio/simplificado')  
    }else if(event.target.value == 2){
      router.push('/relatorio/detalhado')  
    }
  }
  const handleCadastro = (event) =>{
    if(event.target.value == 1){
      router.push('/principio_ativo')  
    }else if(event.target.value == 2){
      router.push('/categoria')  
    }else if(event.target.value == 3){
      router.push('/item')   
    }else if(event.target.value == 4){
      router.push('/fornecedor')   
    }else if(event.target.value == 5){
      router.push('/usuario')   
    }else if(event.target.value == 6){
      router.push('/estabelecimento')   
    }
  }
  function onClose(){
    setMenuCadastro(null)
    setMenuRelatorio(null)
  }
  function clickMenu(e){
    if(e.target.id === 'solicitacoes'){
      router.push('/solicitacao')
    }else if(e.target.id === 'movimentacoes'){
      router.push('/movimentacao')  
    }else if(e.target.id === 'inventarios'){
      router.push('/inventario')  
    }else if(e.target.id === 'relatorios'){
      router.push('/relatorios')
    }
  };
  useEffect(()=>{
    loadUser()
  },[])

  // console.log(userAuthenticate.permissions);
  // console.log(userAuthenticate.permissions.find((i)=>i.name == 'admin.solicitacoes'))
  return (
        <Stack direction='row' spacing={2}>
          <Button 
            id='cadastros' 
            onClick={handleClickCadastro}
            aria-controls={openCadastro? 'cadastro-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openCadastro?'true':undefined}
          >
            <Typography
            textTransform={'capitalize'}
            >
              cadastros
            </Typography>
          </Button>
          <Menu 
            id='cadastro-menu' 
            anchorEl={menuCadastro}
            open={openCadastro}
            onClose={onClose}
            MenuListProps={{
              'aria-labelledby':'cadastros'
            }}
          >
            <MenuItem value={1} onClick={handleCadastro}>Princ??pio Ativo</MenuItem>
            <MenuItem value={2} onClick={handleCadastro}>Categoria</MenuItem>
            <MenuItem value={3} onClick={handleCadastro}>Itens</MenuItem>
            <MenuItem value={4} onClick={handleCadastro}>Fornecedores</MenuItem>
            <MenuItem value={5} onClick={handleCadastro}>Usu??rios</MenuItem>
            <MenuItem value={6} onClick={handleCadastro}>Estabelecimento</MenuItem>
          </Menu>
          {
            userAuthenticate.permissions?.findIndex((i)=>i.name == 'admin.solicitacoes') >=0?
              <Button onClick={(e)=> clickMenu(e)}>
                <Typography id='solicitacoes'textTransform={'capitalize'}>solicita????es</Typography>
              </Button>
            : null  
          }
          {
            userAuthenticate.permissions?.findIndex((i)=>i.name == 'admin.movimentacoes') >=0?
              <Button onClick={(e)=> clickMenu(e)}>
                <Typography id='movimentacoes' textTransform={'capitalize'}>movimenta????es</Typography>
              </Button>
            :
            null
          }
          {
            userAuthenticate.permissions?.findIndex((i)=>i.name == 'admin.inventarios') >=0?
              <Button onClick={(e)=> clickMenu(e)}>
                <Typography id='inventarios' textTransform={'capitalize'}>invent??rios</Typography>
              </Button>
            :
            null
          }
          <Button  
            onClick={handleClickRelatorio}
            aria-controls={openRelatorio? 'relatorio-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openRelatorio?'true':undefined}
          >
            <Typography id='relatorios' textTransform={'capitalize'}>relat??rios</Typography>
          </Button>
          <Menu 
            id='relatorio-menu' 
            anchorEl={menuRelatorio}
            open={openRelatorio}
            onClose={onClose}
            // MenuListProps={{
            //   'aria-labelledby:':'relatorios'
            // }}
          >
            <MenuItem value={1} onClick={handleRelatorio}>Simplificado</MenuItem>
            <MenuItem value={2} onClick={handleRelatorio}>Detalhado</MenuItem>
          </Menu>
        </Stack>
  );
}