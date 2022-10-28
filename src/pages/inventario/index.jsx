import { useState,useEffect } from "react";
import { Box, Button, CssBaseline, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Inventarios } from "@/lib/inventario";
import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { useRouter } from "next/router";

export default function Inventario(){   
    const router = useRouter()
    const [usuario, setUsuario] = useState([]);
    const [inventario, setInventario] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [state, setState] = useState({
        data:'',
        responsavel_id:'',
        tableCheckbox: false,
        usuarios:[{}],
        dataItens:[],
        filter:[],
    });
    
    const columns = [
        { field: 'id', headerName: '#', width: 50 },
        { field: 'nome', headerName: 'Nome', width: 210 },
        { field: 'data', headerName: 'Data', width: 210 },
        { field: 'actions',headerName: 'Ações',type:'actions',getActions: (params) => [
            <GridActionsCellItem icon={<DeleteIcon/>} onClick={() => onDelete(params.id)} label="Delete" />,
            <GridActionsCellItem icon={<ModeEditIcon/>} onClick={() => {onEdit(params.id)}} label="edit" />,
          ]
      }
    ]
    const rows = state.filter?.map((row)=>({
        id:row.id,
        nome:row.responsavel?.name,
        data:row.data?.split('-').reverse().join('/')
    }));
    function onLoad(){
        Inventarios.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setState({...state, data:result.data.data, filter:result.data.data})
        });
    }
    function onSave(id,data){
        if(id!==undefined){
            Inventarios.updateById(id,data).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                    return;
                }
            })
        }else{
            Inventarios.create(data).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                      
                        return;
                    }
                })
            }
        setOpenModal(false)
    }
    function onDelete(id){
        if(confirm('Realmente deseja apagar?')){
            Inventarios.deleteById(id)
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
    function onEdit(id){
        Inventarios.
        getById(id).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
            }
            setInventario(result)
            setOpenModal(true)
        })
    }
    useEffect(()=>{
        onLoad()
    },[openModal])

    function pesquisar(data,responsavel){
        if(data){
            setState({...state, filter: state.dataItens?.filter((data)=>{return data.data?.includes(data)})})
        }else if(responsavel){
            setState({...state, filter: state.dataItens?.filter((data)=>{return data.responsavel_id.includes(responsavel)})})
        }else{
            setState({...state, filter:state.dataItens})
        }
    }

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