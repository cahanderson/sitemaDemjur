import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { PrincAtivo } from "@/lib/princAtivo";
import { Categoria } from "@/lib/categoria";
import { Itens } from "@/lib/item";
import { Box, Button, CssBaseline, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from "react";
import { NovoItem } from '../../components/Modal/itens';
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function Item(){
    const [openModal, setOpenModal] = useState(false)
    const [princAtivo, setPrincAtivo] = useState([])
    const [categoria, setCategoria] = useState([])
    const [tipoItem, setTipoItem] = useState()
    const [editItem, setEditItem] = useState([])
    const[newPrincAtivo, setNewPrincAtivo] = useState(null)
    const[newCategoria, setNewCategoria] = useState(null)
    const [state, setState] = useState({
        codigo: null,
        descricao: '',
        principio_ativo: '',
        d_tipo: '',
        categoria_id: '',
        tableCheckbox: false,
        dataItens:[],
        filter:[],
    });
    const [dataItens, setDataItens] = useState([])
    const rows = state.filter?.map((row)=>({
        id : row.id,
        nome:row.nome,
        principio_ativo:row.principio_ativo?.nome,
        tipo:row.tipo_item?.descricao,
        categoria:row.categoria?.nome,
    }));
    const columns = [
        { field: 'id', headerName: 'Código', width: 180 },
        { field: 'nome', headerName: 'Descrição', width: 200 },
        { field: 'principio_ativo', headerName: 'Princípio Ativo', width: 350 },
        { field: 'tipo', headerName: 'Tipo', width: 210 },
        { field: 'categoria', headerName: 'Categoria', width: 210 },
        { field: 'actions',type:'actions',getActions: (params) => [
            <GridActionsCellItem icon={<DeleteIcon/>} onClick={() => onDelete(params.id)} label="Delete" />,
            <GridActionsCellItem icon={<ModeEditIcon/>} onClick={() => onEdit(params.id)} label="edit" />,
          ]
        }
    ]
    function onEdit(id){
        Itens.getById(id).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
            }
            setEditItem(result.data)
            setOpenModal(true)
        })
    }
    function onLoadItens(){
        Itens.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setDataItens(result.data.data)
            setState({...state, filter:result.data.data})
        });
    }
    function onLoad(){
        Itens.getTipoItem()
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setTipoItem(result.data.dados)
        });

        PrincAtivo.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setPrincAtivo(result.data.data)
        });
        Categoria.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setCategoria(result.data.data)
        });

    }
    function onDelete(id){
        if(confirm('Realmente deseja apagar?')){
            Itens.deleteById(id)
            .then(result => {
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});  
                }else{
                    setState({...state, openSnakebar:true, message:'Apagado com Sucesso', statusSnake:'success'});  
                }    
                onLoadItens()
            })    
        } 
    }
    function onSave(id,item){
        if(id){
            Itens.updateById(id,item).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                    return;
                }
            }) 
        }else{
            Itens.create(item).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                      
                        return;
                    }
            })
        }
        setOpenModal(false)
        onLoadItens()
    }
    function adicionarPrincipioAtivo(princ){
        PrincAtivo.create(princ).then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setNewPrincAtivo(result.dados.id)
        })
    }
    function adicionarCategoria(cat){
        Categoria.create(princ).then((cat)=>{   
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setNewCategoria(result.dados.id)
        })
    }

    useEffect(()=>{
        onLoad()
    },[newPrincAtivo])

    useEffect(()=>{
        onLoadItens()
    },[openModal])


    function pesquisar(codigo, descricao,principio_ativo, d_tipo, categoria){
        if(codigo){
            setState({...state, filter: dataItens?.filter((data)=>{return data.id?.startsWith(codigo)})})
        }else if(descricao){
            setState({...state, filter: dataItens?.filter((data)=>{return data.nome?.toUpperCase().startsWith(descricao?.toUpperCase())})})
        }else if(principio_ativo){
            setState({...state, filter: dataItens?.filter((data)=>{return data.principio_ativo?.nome.toUpperCase().includes(principio_ativo.toUpperCase())})})
        }else if(d_tipo){
            setState({...state, filter: dataItens?.filter((data)=>{return data.tipo_item.descricao?.toUpperCase().includes(d_tipo.toUpperCase())})})
        }else if(categoria){
            setState({...state, filter: dataItens?.filter((data)=>{return data.categoria?.nome.toUpperCase().includes(categoria.toUpperCase())})})
        }else{
            setState({...state, filter: dataItens})
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
                    <Typography variant='h4' component='h1' color='secondary'>
                        Itens
                    </Typography>
                    
                </Box>
                <Box alignItems='center' display='flex'>
                    <Button 
                        variant="outlined"
                        onClick={() => setOpenModal(true)}   
                    >
                         Novo item
                    </Button>
                </Box>

            </Box>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                        <TextField
                        label="Código"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, codigo: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                        label="Descrição"
                        value={state.descricao}
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, descricao:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Autocomplete
                            onChange={(event, newValue) => {
                                princAtivo.forEach(item=>{
                                    if(item.nome === newValue){
                                    setState({...state,principio_ativo:item.nome});
                                    }
                                })
                            }}
                            freeSolo
                            options={princAtivo.map((option) => option.nome)}
                            renderInput={(params) => <TextField {...params} label="Princípio Ativo" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            select
                            label="Tipo"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, d_tipo:e.target.value})}
                        >
                            {tipoItem?.map((item, index)=>(
                                <MenuItem key={index} value={item.descricao}>{item.descricao}</MenuItem>
                            ))}
                        </TextField>    
                    </Grid>
                    <Grid item xs={12} sm={2}>
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
                <Grid container spacing={3} justifyContent='end' my={2}>
                    <Grid 
                        item 
                        xs={12} 
                        sm={2} 
                        display= 'flex'
                        justifyContent='right'
                        align-items= 'center'
                        justify-content= 'center' 
                        height= 'max-content'
                        >
                        <Button
                            
                            variant="outlined"
                            onClick={()=> pesquisar(state.codigo, state.descricao, state.principio_ativo, state.d_tipo, state.categoria_id)}
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

                <NovoItem
                    openModal={openModal} 
                    onClose={() => setOpenModal(false)}
                    editItem={editItem}
                    Save = {(id,item)=> onSave(id,item)}
                    addPrincAtivo = {(princ)=>{adicionarPrincipioAtivo(princ)}}
                    addCategoria = {(cat)=>{adicionarCategoria(cat)}}
                    princAtivo = {princAtivo}
                    tipo = {tipoItem}
                    categoria = {categoria}
                    newPrincAtivo = {newPrincAtivo}
                    newCategoria = {newCategoria}
                />
            </Box>

        </AppLayout>
    )
}