import { useEffect, useState } from 'react'

import { Box, Typography, Paper, TextField, Snackbar, CssBaseline, Alert} from '@mui/material'
import { Table } from '@/components/Table'
import { ModalCadastro } from '@/components/ModalCadastro'
import { UsuariosService } from '../lib/usuarios/UsuariosService'

import Button from '@/components/Button'
import AppLayout from '@/components/Layouts/AppLayout'

export default function Usuarios() {

    const [openModal, setOpenModal] = useState(false);
    const[usuario, setUsuario ] = useState({});
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const[busca, setBusca] = useState();

    const [openSnakebar, setOpenSnakebar] = useState(false);
    const[message, setMessage] = useState('');
    const[statusSnake, setStatusSnake] = useState('success')

        useEffect(()=>{
            onLoad()
        },[])

    function onLoad(){
        UsuariosService.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setOpenSnakebar(true)
                setMessage(result.message)
                setStatusSnake('error')
                return;
            }
            setBusca('')
            setData(result.data.data)
            setFilter(result.data.data)
        }) 
    }


    function onEdit(id){
        setOpenModal(true);
        UsuariosService.getById(id)
        .then(result => {
            if(result instanceof Error){
                setOpenSnakebar(true)
                setMessage(result.message)
                setStatusSnake('error')
            }
            setUsuario(result.data);
        })
    }

    function onSave(id,data){
        if(id){
            UsuariosService.updateById(id, data).then((result)=>{
                if(result instanceof Error){
                    setOpenSnakebar(true)
                    setMessage(result.message)
                    setStatusSnake('error')
                    return;
                }
                setOpenModal(false)
                onLoad()
            })   
        }else{
            UsuariosService.create(data).then((result)=>{
                if(result instanceof Error){
                    setOpenSnakebar(true)
                    setMessage(result.message)
                    setStatusSnake('error')
                        
                        return;
                    }
                setOpenModal(false)
                setUsuario([])
                onLoad()
            })
        }
    }

    function onDelete(id){
        if(confirm('Realmente deseja apagar?')){
            UsuariosService.deleteById(id)
            .then(result => {
                if(result instanceof Error){
                    setOpenSnakebar(true)
                    setMessage(result.message)
                    setStatusSnake('error')
                }else{
                    setOpenSnakebar(true)
                    setMessage('Apagado com Sucesso')
                    setStatusSnake('success')
                }    
                onLoad()
            }
            )    
        }else return;   
    }

    function Pesquisar(busca){
        setFilter(data.filter((data)=>data.name.toUpperCase().startsWith(busca.toUpperCase())))
    }

    function handleKeyDown(event, data){
        if(event.keyCode === 13){
            onSave(usuario.id,data)
        }
    }
    
    function closeSnakebar(){
        setOpenSnakebar(false)
    }

    

  return (
    <AppLayout>
        <CssBaseline />
            <Box
                display= 'flex'
                padding='2px'
                height='8rem'
                justifyContent='space-between'
             >
                <Box
                    // className={styles.text}
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                        
                >
                    <Typography variant='h4' component='h1' color='secondary'>
                        Lista de usuários
                    </Typography>
                    <Typography variant='caption' component='h3'>
                        Aqui você pode gerenciar os usuários que acessam o sistema
                    </Typography>
                    
                </Box>
                <Box alignItems='center' display='flex'>
                    <Button 
                        onClick={() => {setUsuario({}); setOpenModal(true)}}
                        
                    >
                        Adicionar
                    </Button>
                </Box>
                <Snackbar 
                    open={openSnakebar} 
                    autoHideDuration={3000} 
                    onClose={closeSnakebar}
                    anchorOrigin={{
                        horizontal: "right",
                        vertical: "top",
                    }}
                >
                    <Alert onClose={closeSnakebar} severity={statusSnake} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>

            </Box>

            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center'>
                <Box display='flex' flexDirection='row' mt='20px' mb='50px' gap='20px' >
                    <TextField
                        id="outlined-size-normal"
                        label="Nome"
                        // fullWidth
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    <Button
                        onClick={()=> Pesquisar(busca)}
                        variant="outlined"  
                    >
                        Pesquisar
                    </Button>
                </Box>   
                <Table
                    onEdit={(id)=>onEdit(id)}
                    onDelete={(id)=>onDelete(id)}
                    data = {filter}
                />
            </Box>
    
    
            <ModalCadastro 
                openModal={openModal} 
                onClose={() => setOpenModal(false)} 
                usuario={usuario}
                onSave = {(id,data)=> onSave(id,data)}
                keyDown = {(event, data) => handleKeyDown(event, data)}
            /> 
    </AppLayout>       
  )
}