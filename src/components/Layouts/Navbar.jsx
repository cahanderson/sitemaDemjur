import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function NavBar(){
  const router = useRouter();
  const [menuRelatorio, setMenuRelatorio] = useState(null)
  const [menuCadastro, setMenuCadastro] = useState(null)
  const openRelatorio = Boolean(menuRelatorio);
  const openCadastro = Boolean(menuCadastro);

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
  return (
        <Stack direction='row' spacing={2}>
          <Button 
            id='cadastros' 
            onClick={handleClickCadastro}
            aria-controls={openCadastro? 'cadastro-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openCadastro?'true':undefined}
          >
            cadastros
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
            <MenuItem value={1} onClick={handleCadastro}>Princípio Ativo</MenuItem>
            <MenuItem value={2} onClick={handleCadastro}>Categoria</MenuItem>
            <MenuItem value={3} onClick={handleCadastro}>Itens</MenuItem>
            <MenuItem value={4} onClick={handleCadastro}>Fornecedores</MenuItem>
            <MenuItem value={5} onClick={handleCadastro}>Usuários</MenuItem>
          </Menu>
          <Button id='solicitacoes' onClick={(e)=> clickMenu(e)}>solicitações</Button>
          <Button id='movimentacoes' onClick={(e)=> clickMenu(e)}>movimentações</Button>
          <Button id='inventarios' onClick={(e)=> clickMenu(e)}>inventarios</Button>
          <Button 
            id='relatorios' 
            onClick={handleClickRelatorio}
            aria-controls={openRelatorio? 'relatorio-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openRelatorio?'true':undefined}
          >
            relatorios
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