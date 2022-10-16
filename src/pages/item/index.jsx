import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { PrincAtivo } from "@/lib/princAtivo";
import { Categoria } from "@/lib/categoria";
import { Itens } from "@/lib/item";
import { Box, Button, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NovoItem } from '../../components/Modal/itens';
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function Item(){
    const [id, setId] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const [princAtivo, setPrincAtivo] = useState([])
    const [categoria, setCategoria] = useState([])
    const [tipoItem, setTipoItem] = useState()
    const [state, setState] = useState({
        codigo: '',
        nome: '',
        principio_ativo: '',
        d_tipo: '',
        categoria_id: '',
        tableCheckbox: false,
        dataItens:[],
        item:[],
    });
    const [dataItens, setDataItens] = useState({
        dataItens:[],
    })
    const [item, setItem] = useState({
        itens:[]
    })
    const rows = state.dataItens?.map((row)=>({
        id : row.id,
        codigo:row.codigo,
        nome:row.nome,
        principio_ativo:princAtivo[row.principio_ativo_id - 1]?.nome,
        tipo:tipoItem[row.d_tipo-1].descricao,
        categoria:categoria[row.categoria_id-1]?.nome,
    }));
    const columns = [
        { field: 'codigo', headerName: 'Código', width: 180 },
        { field: 'nome', headerName: 'Descrição', width: 150 },
        { field: 'principio_ativo', headerName: 'Princípio Ativo', width: 400 },
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
            setState({...state, item:result.data})
            setOpenModal(false)
        })
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

        Itens.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setDataItens({...dataItens, dataItens:result.data.data})
            setState({...dataItens, dataItens:result.data.data})
        });

        Categoria.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setCategoria(result.data.data)
            console.log(result);
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
        }else return;   
    }
    function onSave(){
        if(item.itens){
            if(id === undefined){
                Itens.create(item).then((result)=>{
                    if(result instanceof Error){
                        setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                      
                            return;
                        }
                })
            }else{
                Itens.updateById({id,item}).
                then((result)=>{
                    if(result instanceof Error){
                        setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                        return;
                    }
                    setId(null)
                })  
            }
            setOpenModal(false)
        }else{return;}
        
    }
    function guardaItem(id, item){
        setItem({itens:item})
        setId(id)
    }

    useEffect(()=>{
        onLoad()
    },[openModal])
    
    useEffect(()=>{
            onSave()
    },[item])

    function pesquisar(codigo,nome,principio_ativo,d_tipo,categoria_id){
            setDataItens({dataItens: state.dataItens?.filter((item)=> { return item.codigo.includes(codigo)})})
            console.log(dataItens);
        // }else if(buscaDescricao !==''){
        //     setState({...state, filter: data.filter((data)=>data.descricao.toUpperCase().startsWith(buscaDescricao.toUpperCase()))})
        // }else if(buscaPrincAtivo !==''){
        //     setState({...state, filter: data.filter((data)=>data.princAtivo.toUpperCase().startsWith(buscaPrincAtivo.toUpperCase()))})
        // }else if(buscaTipo!==''){
        //     setState({...state, filter:data.filter((data)=>data.tipo.toUpperCase().startsWith(buscaTipo.toUpperCase()))})
        // }else if(buscaValidade!==''){
        //     setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaValidade.toUpperCase()))})
        // }else if(buscaCategoria!==''){
        //     setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaCategoria.toUpperCase()))})
        // }else{
        //     setState({...state, filter:data.filter((data)=>data.descricao.toUpperCase().startsWith(buscaDescricao.toUpperCase()))})
        // };
    }    
        // function pesquisar(codigo,nome,principio_ativo,d_tipo,categoria_id){
        //     Objectkeys(dataItens).foreach((item)=>{
        //         setState({...state, filter: state.data?.filter((data)=>{return data.name?.toUpperCase().startsWith(busca?.toUpperCase())})})
        //     })
            
        // }
        // dataItens.dataItens.map((item)=>{
            // console.log(dataItens.dataItens?.filter((item)=> { return item.codigo.includes(123)}))
            // console.log(item);
        // })
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
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, nome:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            select
                            value={state.buscaPrincAtivo}
                            label='Princípio ativo'
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, principio_ativo:e.target.value})}
                        >
                            {princAtivo?.map((item, index)=>(
                                <MenuItem key={index} value={item.id}>{item.nome}</MenuItem>
                            ))}
                        </TextField>
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
                                <MenuItem key={index} value={item.id}>{item.descricao}</MenuItem>
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
                                <MenuItem key={index} value={item.id}>{item.nome}</MenuItem>
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
                            onClick={()=> pesquisar(state.codigo,state.nome,state.principio_ativo,state.categoria_id)}
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
                    editItem={state?.item}
                    Save = {(id,item)=> guardaItem(id,item)}
                    princAtivo = {princAtivo}
                    tipo = {tipoItem}
                    categoria = {categoria}
                />
            </Box>

        </AppLayout>
    )
}