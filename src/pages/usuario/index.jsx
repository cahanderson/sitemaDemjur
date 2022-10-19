import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Usuario } from '../../components/Modal/usuario';
import { UsuariosService } from '../../lib/Usuario'
import Button from '@/components/Button'
import AppLayout from '@/components/Layouts/AppLayout'
import { Table } from '@/components/Table';
import { Box, Typography, Paper, TextField, Snackbar, CssBaseline, Alert, Grid} from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid'

export default function Usuarios() {
    const [usuario, setUsuario] = useState([])
    const [state, setState] = useState({
        openModal:false,
        usuario:[],
        data:[],
        filter:[],
        buscaNome:'',
        buscaEmail:'',
        openSnakebar:false,
        statusSnake:'success',
        message:'',
        checktableCheckbox:true,
    });

    useEffect(()=>{
        onLoad()
    },[state.openModal])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nome', width: 130 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'actions',type:'actions',getActions: (params) => [
              <GridActionsCellItem icon={<DeleteIcon/>} onClick={() => onDelete(params.id)} label="Delete" />,
              <GridActionsCellItem icon={<ModeEditIcon/>} onClick={() => {onEdit(params.id)}} label="edit" />,
            ]
        }  
    ]
    const rows = state.filter?.map((row)=>({
        id:row.id,
        name:row.name,
        email:row.email,
        action:null,
    }));
    function onLoad(){
        UsuariosService.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setState({...state, data:result.data.data, filter:result.data.data, busca:''})
        }) 
    }
    function onEdit(id){
        UsuariosService.
        getById(id).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
            }
            setState({...state, openModal:true})
            setUsuario(result.data)
        })
    }

    function onSave(id,data){
        
        if(id){
            UsuariosService.
            updateById(id, data).
            then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                    return;
                }
                setState({...state,openModal:false})
            })   
        }else{
            UsuariosService.create(data).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                      
                        return;
                    }
                setState({...state, openModal:false})
            })
        }
    }

    function onDelete(id){
        if(confirm('Realmente deseja apagar?')){
            UsuariosService.deleteById(id)
            .then(result => {
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});  
                }else{
                    setState({...state, openSnakebar:true, message:'Apagado com Sucesso', statusSnake:'success'});  
                }    
                onLoad()
            })    
        }else return;   
    }
    function pesquisar(nome,email){
        if(nome){
            setState({...state, filter: state.data?.filter((data)=>{return data.name?.toUpperCase().startsWith(nome?.toUpperCase())})})
        }else if(email){
            setState({...state, filter: state.data?.filter((data)=>{return data.email?.toUpperCase().startsWith(email?.toUpperCase())})})
        }else{
            setState({...state, filter:state.data})
        }
    }

    function handleKeyDown(event, data){
        if(event.keyCode === 13){
            onSave(state.usuario.id,data)
        }
    }
    
    function closeSnakebar(){
        setState({...state, openSnakebar:false})
    }
    // console.log(state.data);

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
                        onClick={() => {setState({...state,openModal:true}), setUsuario([])}} 
                    >
                        Novo usuário
                    </Button>
                </Box>
                <Snackbar 
                    open={state.openSnakebar} 
                    autoHideDuration={3000} 
                    onClose={closeSnakebar}
                    anchorOrigin={{
                        horizontal: "right",
                        vertical: "top",
                    }}
                >
                    <Alert onClose={closeSnakebar} severity={state.statusSnake} sx={{ width: '100%' }}>
                        {state.message}
                    </Alert>
                </Snackbar>

            </Box>

            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center'>
                <Box display='flex' flexDirection='row' mt='20px' mb='50px' gap='20px' >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="outlined-size-normal"
                        label="Nome"
                        fullWidth
                        onChange={(e) => setState({...state, buscaNome: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="outlined-size-normal"
                        label="Email"
                        fullWidth
                        onChange={(e) => setState({...state, buscaEmail: e.target.value})}
                    />
                </Grid>
            </Grid>
            <Button
                    onClick={()=> pesquisar(state.buscaNome,state.buscaEmail)}
                    variant="outlined"  
                >
                    Pesquisar
            </Button>
                </Box>
                <Table 
                    columns = {columns}
                    rows = {rows}
                    check={state.tableCheckbox}
                    height={400}
                />
            </Box>
    
    
            <Usuario
                openModal={state.openModal} 
                onClose={() => setState({...state, openModal: false})} 
                usuario={usuario}
                onSave = {(id,data)=> onSave(id,data)}
                keyDown = {(event, data) => handleKeyDown(event, data)}
            /> 
    </AppLayout>       
  )
}