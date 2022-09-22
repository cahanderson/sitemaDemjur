import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { Movimentacoes } from "@/lib/movimentacao";
import { Box, Button, CssBaseline, FormControl, Grid, InputLabel, Menu, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Movimentacao(){   
    const router = useRouter()
    const [tipo, setTipo] = useState([''])
    const [state, setState] = useState({
        buscaTipoMovimentacao: '',
        buscaDtMovimentacao: '',
        buscaItem: '',
        buscaNSolicitacao: '',
        buscaSolicitante: '',
        buscaCPF: '',
        tableCheckbox: false,
        anchorEl: null,
        data:[],
        dataTipo:[],
    });
    const columns = [
        { field: 'id', headerName: 'Nº movimentação', width:420 },
        { field: 'd_tipo_movimentacao', headerName: 'Tipo movimentação', width: 420 },
        { field: 'data', headerName: 'Data da movimentação', width: 420 }, 
    ]
    const rows = state.data.map((row)=>({
        id:row.id,
        // d_tipo_movimentacao:tipo[row.d_tipo_movimentacao + 1].descricao,
        d_tipo_movimentacao:row.d_tipo_movimentacao,
        data:row.data.split('-').reverse().join('/'),
    }));

    function onLoad(){
        Movimentacoes.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setState({...state,data:result.data.data})
        })
    } 
    function onLoadTipo(){
        Movimentacoes.getMovimentacao()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setTipo(result.data.dados)
        })
    } 

    useEffect(()=>{
        onLoad()
    },[])
    useEffect(()=>{
        onLoadTipo()
    },[state.data])
    
    // function pesquisar(buscaCodigo,buscaDescricao,buscaPrincAtivo,buscaLote,buscaValidade,buscaCategoria){
    //     if(buscaTipoMovimentacao !==''){
    //         setState({...state, filter: data.filter((data)=>data.codigo.startsWith(buscaTipoMovimentacao))})
    //     }else if(buscaDtMovimentacao !==''){
    //         setState({...state, filter: data.filter((data)=>data.descricao.toUpperCase().startsWith(buscaDtMovimentacao.toUpperCase()))})
    //     }else if(buscaItem !==''){
    //         setState({...state, filter: data.filter((data)=>data.princAtivo.toUpperCase().startsWith(buscaItem.toUpperCase()))})
    //     }else if(buscaNSolicitacao!==''){
    //         setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaNSolicitacao.toUpperCase()))})
    //     }else if(buscaSolicitante!==''){
    //         setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaSolicitante.toUpperCase()))})
    //     }else if(buscaCPF!==''){
    //         setState({...state, filter:data.filter((data)=>data.lote.startsWith(buscaCPF))})
    //     }else{
    //         setState({...state, filter:data.filter((data)=>data.descricao.toUpperCase().startsWith(buscaDescricao.toUpperCase()))})
    //     };
    // }
    const open = Boolean(state.anchorEl);

    function openMenu(event){
        setState({...state, anchorEl:event.currentTarget})
        // console.log(event.currentTarget);
    }
    function closeMenu(event){
        console.log(event.target.name);
        setState({...state, anchorEl:null})
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
                        Movimentações
                    </Typography>
                    
                </Box>
                <Box alignItems='center' display='flex'>
                    <Button
                        id="demo-positioned-button"
                        variant="outlined"
                        onClick={(e)=>openMenu(e)}
                        aria-haspopup="true"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}

                        // onClick={()=> router.push('/movimentacao/form_Entrada')}    
                    >
                         Nova movimentação
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={state.anchorEl}
                        open={open}
                        onClose={closeMenu}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem name={'saída'} onClick={(e)=>closeMenu(e)} >Saída para pacientes</MenuItem>
                        <MenuItem value='Saídas' onClick={closeMenu}>Saídas</MenuItem>
                        <MenuItem value='Entradas' onClick={closeMenu}>Entradas</MenuItem>
                    </Menu>
                </Box>

            </Box>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            select
                            label="Tipo da movimentação"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, buscaTipoMovimentacao: e.target.value})}

                        >
                            <MenuItem value=''></MenuItem>
                            <MenuItem value='Entrada'>Entrada</MenuItem>
                            <MenuItem value='Saída'>Saída</MenuItem>
                            <MenuItem value='Saída para paciente'>Saída para paciente</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TextField
                            select
                            sx={{minWidth: 295}}
                            value={state.buscaPrincAtivo}
                            label='Item'
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, buscaItem:e.target.value})}
                        >
                            {/* {state.data.map((item, index)=>(
                                <MenuItem key={index} value={item.princAtivo}>{item.princAtivo}</MenuItem>
                            ))} */}
                        </TextField>
                    </Grid>
                </Grid>    
                <Grid container spacing={3} my={1}>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            type='date'
                            label="Data da movimentação"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, buscaDtMovimentacao:e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>   
                    <Grid item xs={12} sm={2}>
                        <TextField
                            label="Nº Solicitação"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, buscaNSolicitacao:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Solicitante"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, buscaSolicitante:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} >
                        <TextField
                            label="CPF"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, buscaCPF:e.target.value})}
                        />
                    </Grid>
                </Grid>
                <Box my={3} display='flex' justifyContent='right' alignItems='right'>
                    <Button
                        
                        variant="outlined"
                        onClick={()=> pesquisar(state.buscaCodigo,state.buscaDescricao,state.buscaLote,state.buscaValidade,state.buscaPrincAtivo,state.buscaCategoria)}
                    >
                        Pesquisar
                    </Button>
                </Box>
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
            </Box>

        </AppLayout>
    )
}