import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { Categoria } from "@/lib/categoria";
import { Alert, Box, Button, CssBaseline, Grid, MenuItem, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NovaCategoria } from '../../components/Modal/categoria';
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function Item(){
    const [openModal, setOpenModal] = useState(false)
    const [categoria, setCategoria] = useState([])
    const [editCategoria, setEditCategoria] = useState([])
    const [state, setState] = useState({
        codigo: null,
        categoria_id: '',
        tableCheckbox: false,
        filter:[],
        statusSnake:'success',
        message:'',
        checktableCheckbox:true,
    });
    const rows = state.filter?.map((row)=>({
        id : row.id,
        nome:row.nome,
    }));
    const columns = [
        { field: 'id', headerName: 'Código', width: 130 },
        { field: 'nome', headerName: 'Descrição', width: 1000 },
        { field: 'actions',type:'actions',getActions: (params) => [
            <GridActionsCellItem icon={<DeleteIcon/>} onClick={() => onDelete(params.id)} label="Delete" />,
            <GridActionsCellItem icon={<ModeEditIcon/>} onClick={() => onEdit(params.id)} label="edit" />,
          ]
        }
    ]
    function onEdit(id){
        Categoria.getById(id).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
            }
            setEditCategoria(result.data)
            setOpenModal(true)
        })
    }
    function onLoad(){
        Categoria.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setCategoria(result.data.data)
            setState({...state, filter:result.data.data})
        });
    }
    function onDelete(id){
        if(confirm('Realmente deseja apagar?')){
            Categoria.deleteById(id)
            .then(result => {
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});  
                }else{
                    setState({...state, openSnakebar:true, message:'Apagado com Sucesso', statusSnake:'success'});  
                }    
                onLoad()
            })    
        } 
    }
    function onSave(item,id){
        if(id){
            Categoria.updateById(id,item).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                    return;
                }else{
                    setOpenModal(false)
                    setState({...state, openSnakebar:true, message:'Categoria editado com sucesso', statusSnake:'success'}); 
                    onLoad()
                }
            }) 
        }else{
            Categoria.create(item).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                      
                        return;
                    }else{
                        setOpenModal(false)
                        setState({...state, openSnakebar:true, message:'Categoria criado com sucesso', statusSnake:'success'});
                        onLoad()
                    }
            })
        }
        
    }
    function pesquisar(categoria){
        if(categoria){
            setState({...state, filter: categoria?.filter((data)=>{return data.id?.includes(categoria)})})
        }else{
            setState({...state, filter: categoria})
        }
    }
    function closeSnakebar(){
        setState({...state, openSnakebar:false})
    }
    useEffect(()=>{
        onLoad()
    },[])

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
                    <Typography variant='h4' component='h1' color='secondary'>
                        Categoria
                    </Typography>
                    
                </Box>
                <Box alignItems='center' display='flex'>
                    <Button 
                        variant="outlined"
                        onClick={() => setOpenModal(true)}   
                    >
                         Nova categoria
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
                <Box display='flex' flexDirection='row' mt='20px' mb='30px' gap='20px' >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                select
                                label="Categoria"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setState({...state, categoria_id:e.target.value})}
                            >
                                {categoria?.map((item, index)=>(
                                    <MenuItem key={index} value={item.nome}>{item.nome}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button       
                        variant="outlined"
                        onClick={()=> pesquisar(state.categoria_id)}
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

                <NovaCategoria
                    openModal={openModal} 
                    onClose={() => setOpenModal(false)}
                    editCategoria={editCategoria}
                    Save = {(item,id)=> onSave(item,id)}
                    categoria = {categoria}
                />
            </Box>

        </AppLayout>
    )
}