import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { PrincAtivo } from "@/lib/princAtivo";
import { Categoria } from "@/lib/categoria";
import { Itens } from "@/lib/usuarios/Itens";
import { Box, Button, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NovoItem } from '../../components/Modal/itens';
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const tipo = [
    {
        "id":1,
        "nome":"Generico",
    },
    {
        "id":2,
        "nome":"Referencial",
    },
]
export default function Item(){
    const [state, setState] = useState({
        codigo: '',
        nome: '',
        principio_ativo: '',
        d_tipo: '',
        categoria_id: '',
        tableCheckbox: false,
        openModal:false,
        item:[],
    });
    const [id, setId] = useState(null);
    const [princAtivo, setPrincAtivo] = useState([])
    const [dataItens, setDataItens] = useState({
        dataItens:[],
    })
    const [categoria, setCategoria] = useState([])
    const [item, setItem] = useState({
        itens:[]
    })

    const rows = dataItens.dataItens.map((row)=>({
        id : row.id,
        codigo:row.codigo,
        nome:row.nome,
        principio_ativo:princAtivo[row.principio_ativo_id - 1]?.nome,
        tipo:tipo[row.d_tipo-1].nome,
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
    useEffect(()=>{
        onLoadItens()
        onLoadPrincAtivo()
        onLoadCategoria()
    },[state.openModal])

    function onEdit(id){
        Itens.getById(id).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
            }
            setState({...state, item:result.data, openModal:true})
        })
    }

    function onLoadCategoria(){
        
        Categoria.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setCategoria(result.data.data)
        })
    }
    function onLoadItens(){
        Itens.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setDataItens({...dataItens, dataItens:result.data.data})
        })
    }    
    function onLoadPrincAtivo(){
        
        PrincAtivo.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setPrincAtivo(result.data.data)
        })
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
                    setState({...state, openModal:false})
                })
            }else{
                Itens.updateById({id,item}).
                then((result)=>{
                    if(result instanceof Error){
                        setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                        return;
                    }
                    setState({...state,openModal:false})
                    setId(null)
                })  
            }
        }else{return;}
        
    }
    function guardaItem(id, item){
        setItem({itens:item})
        setId(id)
    }
    useEffect(()=>{
            onSave()
    },[item])


    // function pesquisar(buscaCodigo,buscaDescricao,buscaPrincAtivo,buscaTipo,buscaValidade,buscaCategoria){
    //     if(state.buscaCodigo !==''){
            // setState({...state, data:state.data.filter(codigo => codigo.codigo.startsWith(buscaCodigo))})
            // console.log(state.filter);

    //     }else if(buscaDescricao !==''){
    //         setState({...state, filter: data.filter((data)=>data.descricao.toUpperCase().startsWith(buscaDescricao.toUpperCase()))})
    //     }else if(buscaPrincAtivo !==''){
    //         setState({...state, filter: data.filter((data)=>data.princAtivo.toUpperCase().startsWith(buscaPrincAtivo.toUpperCase()))})
    //     }else if(buscaTipo!==''){
    //         setState({...state, filter:data.filter((data)=>data.tipo.toUpperCase().startsWith(buscaTipo.toUpperCase()))})
    //     }else if(buscaValidade!==''){
    //         setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaValidade.toUpperCase()))})
    //     }else if(buscaCategoria!==''){
    //         setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaCategoria.toUpperCase()))})
    //     }else{
    //         setState({...state, filter:data.filter((data)=>data.descricao.toUpperCase().startsWith(buscaDescricao.toUpperCase()))})
        // };


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
                        onClick={() => {setState({...state, openModal:true})}}   
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
                        onChange={(e) => setState({...state, buscaCodigo: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                        label="Descrição"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, buscaDescricao:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Princípio ativo</InputLabel>
                            <Select
                                defaultValue=""
                                sx={{minWidth: 295, maxWidth:295}}
                                value={state.buscaPrincAtivo}
                                label='Princípio ativo'
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setState({...state, buscaPrincAtivo:e.target.value})}
                            >
                                {dataItens.dataItens.map((item, index)=>(
                                    <MenuItem key={index} value={dataItens.princAtivo}>{dataItens.princAtivo}</MenuItem>
                                ))}
                                {/* <MenuItem value={'Mensal'}>Mensal</MenuItem>
                                <MenuItem value={'Quinzenal'}>Quinzenal</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                        label="Tipo"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, buscaTipo:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                            sx={{minWidth: 190, maxWidth: 190}}
                            label="Categoria"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, buscaCategoria:e.target.value})}
                            >
                                {dataItens.dataItens.map((item, index)=>(
                                    <MenuItem key={index} value={item.princAtivo}>{item.princAtivo}</MenuItem>
                                ))}
                                {/* <MenuItem value={'Mensal'}>Mensal</MenuItem>
                                <MenuItem value={'Quinzenal'}>Quinzenal</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={3} justifyContent='space-between' my={2}>
                    <Grid item xs={12} sm={2} >
                            <TextField
                            type='date'
                            label="Validade"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setState({...state, buscaMae:e.target.value})}
                            />
                    </Grid>
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
                            onClick={()=> pesquisar(state.buscaCodigo,state.buscaDescricao,state.buscaLote,state.buscaValidade,state.buscaPrincAtivo,state.buscaCategoria)}
                        >
                            Pesquisar
                        </Button>
                    </Grid>
                </Grid>    
                {/* <Box 
                    my={3}
                    display='flex'
                    justifyContent='right'    
                >
                    <Button 
                        variant="outlined"
                        onClick={()=> pesquisar(state.buscaSolicitacao,state.buscaCPF,state.buscaNome,state.buscaMae)}
                    >
                        Pesquisar
                    </Button>
                </Box> */}
                <Table
                    columns = {columns}
                    rows = {rows}
                    check={state.tableCheckbox}
                    height={400}
                />

                <NovoItem
                    openModal={state.openModal} 
                    onClose={() => setState({...state, openModal: false})} 
                    editItem={state.item}
                    Save = {(id,item)=> guardaItem(id,item)}
                    princAtivo = {princAtivo}
                    tipo = {tipo}
                    categoria = {categoria}
                />
            </Box>

        </AppLayout>
    )
}