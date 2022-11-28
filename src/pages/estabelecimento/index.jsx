import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { Alert, Box, Button, CssBaseline, Grid, MenuItem, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { NovoEstabelecimento } from "../../components/Modal/estabelecimento";
import {Estabelecimento} from "../../lib/estabelecimento"

export default function EstabelecimentoIndex(){
    const pessoa = {
        "is_beneficiario": false,
        "is_prescritor": false,
        "is_fornecedor": false,
        "is_estabelecimento":true
    };
    const [openModal, setOpenModal] = useState(false)
    const [estabelecimento, setEstabelecimento] = useState([])
    const [editEstabelecimento, setEditestabelecimento] = useState([])
    const [state, setState] = useState({
        codigo: null,
        estabelecimento: '',
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
    function onLoad(pessoa){
        Estabelecimento.getAll(pessoa)
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setEstabelecimento(result.data.data)
            setState({...state, filter:result.data.data})
        });
    }
    function onEdit(id){
        Estabelecimento.getById(id).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
            }
            setEditestabelecimento(result.data)
            setOpenModal(true)
        })
    }
    function onDelete(id){
        if(confirm('Realmente deseja apagar?')){
            Estabelecimento.deleteById(id)
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
    function onSave(estab,id){
        if(id){
            Estabelecimento.updateById(id,estab).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                    return;
                }else{
                    setOpenModal(false)
                    setState({...state, openSnakebar:true, message:'Categoria editado com sucesso', statusSnake:'success'}); 
                    onLoad(pessoa)
                }
            }) 
        }else{
            Estabelecimento.create(estab).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                      
                        return;
                    }else{
                        setOpenModal(false)
                        setState({...state, openSnakebar:true, message:'Categoria criado com sucesso', statusSnake:'success'});
                        onLoad(pessoa)
                    }
            })
        }
        
    }
    function pesquisar(estab){
        if(estabelecimento){
            setState({...state, filter: estabelecimento?.filter((data)=>{return data.nome?.toUpperCase().startsWith(estab?.toUpperCase())})})
        }else{
            setState({...state, filter: estabelecimento})
        }
    }
    function closeSnakebar(){
        setState({...state, openSnakebar:false})
    }
    useEffect(()=>{
        onLoad(pessoa)
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
                        Estabelecimento
                    </Typography>
                    
                </Box>
                <Box alignItems='center' display='flex'>
                    <Button 
                        variant="outlined"
                        onClick={() => setOpenModal(true)}   
                    >
                         Novo estabelecimento
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
                    <TextField
                        label="Categoria"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, categoria_id:e.target.value})}
                            >
                    </TextField>
                    <Button       
                        variant="outlined"
                        onClick={()=> pesquisar(state.estabelecimento)}
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

                <NovoEstabelecimento
                    openModal={openModal} 
                    onClose={() => setOpenModal(false)}
                    editEstabelecimento={editEstabelecimento}
                    Save = {(estab,id)=> onSave(estab,id)}
                    estabelecimento = {estabelecimento}
                />
            </Box>

        </AppLayout>
    )
}