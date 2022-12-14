import { useEffect, useState } from "react";
import { PrincAtivo } from "../../lib/princAtivo";
import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { Alert, Box, Button, CssBaseline, Grid, MenuItem, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { NovoPrincipioAtivo } from "../../components/Modal/principio_ativo";

export default function PrincipioAtivo(){
    const [openModal, setOpenModal] = useState(false)
    const [principioAtivo, setPrincipioAtivo] = useState([])
    const [editPrincipioAtivo, setEditPrincipioAtivo] = useState([])
    const [state, setState] = useState({
        codigo: null,
        principioAtivo: '',
        tableCheckbox: false,
        filter:[],
        openSnakebar:false,
        statusSnake:'success',
        message:'',
    });
    const rows = state.filter?.map((row)=>({
        id : row.id,
        nome:row.nome,
    }));
    const columns = [
        { field: 'id', headerName: 'Código', width: 200},
        { field: 'nome', headerName: 'Descrição', width: 250},
        { field: 'actions',type:'actions',getActions: (params) => [
            <GridActionsCellItem icon={<DeleteIcon/>} onClick={() => onDelete(params.id)} label="Delete" />,
            <GridActionsCellItem icon={<ModeEditIcon/>} onClick={() => onEdit(params.id)} label="edit" />,
          ]
        }
    ]
    function onEdit(id){
        PrincAtivo.getById(id).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
            }
            setEditPrincipioAtivo(result.data)
            setOpenModal(true)
        })
    }
    function onLoad(){
        PrincAtivo.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setPrincipioAtivo(result.data.data)
            setState({...state, filter:result.data.data})
        });
    }
    function onDelete(id){
        if(confirm('Realmente deseja apagar?')){
            PrincAtivo.deleteById(id)
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
            PrincAtivo.updateById(id,item).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                    return;
                }else{
                    setState({...state, openSnakebar:true, message:'item editado com sucesso', statusSnake:'success'}); 
                    setOpenModal(false)
                    setEditPrincipioAtivo([])
                    onLoad()
                }
                
            })
        }else{
            PrincAtivo.create(item).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                      
                        return;
                }else{
                    setState({...state, openSnakebar:true, message:'item criado com sucesso', statusSnake:'success'}); 
                    onLoad()
                    setOpenModal(false)
                }
            })
        }
    }
    function pesquisar(princAtivo){
        if(princAtivo){
            setState({...state, filter: principioAtivo?.filter((data)=>{return data.nome?.toUpperCase().includes(princAtivo?.toUpperCase())})})
        }else{
            setState({...state, filter: principioAtivo})
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
                        Princípio ativo
                    </Typography>
                    
                </Box>
                <Box alignItems='center' display='flex'>
                    <Button 
                        variant="outlined"
                        onClick={() => setOpenModal(true)}   
                    >
                         Novo princípio ativo
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
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Nome"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setState({...state, principioAtivo:e.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <Button       
                        variant="outlined"
                        onClick={()=> pesquisar(state.principioAtivo)}
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

                <NovoPrincipioAtivo
                    openModal={openModal} 
                    onClose={() => setOpenModal(false)}
                    editPrincipioAtivo={editPrincipioAtivo}
                    Save = {(item,id)=> onSave(item,id)}
                    principioAtivo = {principioAtivo}
                />
            </Box>

        </AppLayout>
    )
}