import { useState,useEffect } from "react";
import { Alert, Box, Button, CssBaseline, Grid, MenuItem, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Inventarios } from "@/lib/inventario";
import { UsuariosService } from "@/lib/usuario";
import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { useRouter } from "next/router";
import useInventarioStore from "@/hooks/inventarioEdit";

export default function Inventario(){   
    const router = useRouter()
    const addEditInventario = useInventarioStore(state=>state.addData);
    const [usuario, setUsuario] = useState([]);
    const [paginaInventario, setPaginaInventario] = useState(1)
    const [state, setState] = useState({
        data:'',
        responsavel_id:'',
        tableCheckbox: false,
        usuarios:[{}],
        dataItens:[],
        filter:[],
        statusSnake:'success',
        message:'',
        checktableCheckbox:true,
    });
    
    const columns = [
        { field: 'id', headerName: '#', width: 100 },
        { field: 'nome', headerName: 'Nome do responsável', width: 410 },
        { field: 'data', headerName: 'Data do inventário', width: 410 },
        { field: 'actions',headerName: 'Editar',type:'actions',width: 300, getActions: (params) => [
            <GridActionsCellItem icon={<ModeEditIcon/>} onClick={() => {onEdit(params.id)}} label="edit" />,
            // <GridActionsCellItem icon={<DeleteIcon/>} onClick={() => onDelete(params.id)} label="Delete" />,
          ]
        }
    ]
    const rows = state.filter.reverse()?.map((row)=>({
        id:row.id,
        nome:row.responsavel?.name,
        data:row.data?.split('-').reverse().join('/')
    }));
    function onLoad(){
        UsuariosService.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setUsuario(result.data.data)
        });
    }
    function onLoadInventario(){
        Inventarios.getAll(paginaInventario)
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            addPaginationInventario(result)
            if(result.data.meta.to < result.data.meta.total){
                setPaginaInventario(paginaInventario+1)
            }
        });
    }
    function addPaginationInventario(i){
        if(state.data.length < i.data.meta.total){
            let clone = Object.assign([], state.data);
                i.data.data.forEach(item=>{
                    clone.push(item);
                })
                setState({...state, data:clone, filter:clone})

        }
    }
    function onEdit(id){
        Inventarios.
        getById(id).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
            }
            addEditInventario(result)
            router.push('inventario/form')
        })
    }
    useEffect(()=>{
        onLoad()
    },[])

    useEffect(()=>{
        onLoadInventario()
    },[paginaInventario])

    function pesquisar(data,responsavel){
        if(data){
            setState({...state, filter: state.dataItens?.filter((data)=>{return data.data?.includes(data)})})
        }else if(responsavel){
            setState({...state, filter: state.dataItens?.filter((data)=>{return data.responsavel_id.includes(responsavel)})})
        }else{
            setState({...state, filter:state.dataItens})
        }
    }
    function closeSnakebar(){
        setState({...state, openSnakebar:false})
    }
    console.log(state);
    return(
        <AppLayout>
            <CssBaseline />
            <Box
                display= 'flex'
                justifyContent='space-between'
                mb={4}
             >
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'     
                >
                    <Typography variant='h5' component='h1' color='secondary'>
                        Inventário
                    </Typography>
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
                <Box alignItems='center' display='flex'>
                    <Button 
                        variant="outlined"
                        onClick={() => router.push('/inventario/form')}   
                    >
                         Novo inventário
                    </Button>
                </Box>

            </Box>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center'>
                <Grid container spacing={3} mb={4}>
                    <Grid item xs={12} sm={5}>
                        <TextField
                        type='date'
                        label="Data"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, buscaCodigo: e.target.value})}
                        InputLabelProps={{
                            shrink: true,  
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                    <TextField
                        value={state.responsavel_id}
                        select
                        name="responsavel_id"
                        label='Responsável'
                        fullWidth
                        placeholder='Usuário responsável pelo inventário'
                        variant="outlined"
                        onChange={(e)=> setState({...state, responsavel_id:e.target.value})}
                    >
                        {usuario?.map((user, index)=>(
                            <MenuItem key={index} value={user.id}>{user.name}</MenuItem>
                        ))}
                    </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4} display='flex' alignItems='center' justifyContent='end' mb={1}>
                        <Button
                        
                        variant="outlined"
                        onClick={()=> pesquisar(state.data, state.responsavel_id)}
                    >
                            Pesquisar
                        </Button>  
                    </Grid>
                </Grid>
                <Table
                    columns = {columns}
                    rows = {rows}
                    check={state.tableCheckbox}
                    height={400}
                />
            </Box>
        </AppLayout>
    )
}