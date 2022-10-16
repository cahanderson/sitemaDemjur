import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { Movimentacoes } from "@/lib/movimentacao";
import { Box, Button, CssBaseline, Grid, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material";
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
        filter:[],
        data:[],
        dataTipo:[],
    });
    const columns = [
        { field: 'id', headerName: 'Nº movimentação', width:420 },
        { field: 'd_tipo_movimentacao', headerName: 'Tipo movimentação', width: 420 },
        { field: 'data', headerName: 'Data da movimentação', width: 420 }, 
    ]
    const rows = state.filter?.map((row)=>({

        id:row.id,
        d_tipo_movimentacao:row.tipo_movimentacao.descricao,
        data:row.data.split('-').reverse().join('/'),
    }));

    function onLoad(){
        Movimentacoes.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setState({...state,data:result.data.data,filter:result.data.data})
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
    
    function pesquisar(buscaTipoMovimentacao,buscaDtMovimentacao,buscaNSolicitacao,buscaSolicitante,buscaCPF){
        if(buscaTipoMovimentacao !==''){    
            setState({...state, filter: data.filter((data)=>{ return data.d_tipo_movimentacao.startsWith(buscaTipoMovimentacao)})})
        }else if(buscaDtMovimentacao !==''){
            setState({...state, filter: data.filter((data)=>data.descricao.toUpperCase().startsWith(buscaDtMovimentacao.toUpperCase()))})
        }else if(buscaItem !==''){
            setState({...state, filter: data.filter((data)=>data.princAtivo.toUpperCase().startsWith(buscaItem.toUpperCase()))})
        }else if(buscaNSolicitacao!==''){
            setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaNSolicitacao.toUpperCase()))})
        }else if(buscaSolicitante!==''){
            setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaSolicitante.toUpperCase()))})
        }else if(buscaCPF!==''){
            setState({...state, filter:data.filter((data)=>data.lote.startsWith(buscaCPF))})
        }else{
            setState({...state, filter:data.filter((data)=>{ return data.descricao.toUpperCase().startsWith(buscaDescricao.toUpperCase())})})
        };
    }
    const open = Boolean(state.anchorEl);

    function openMenu(event){
        setState({...state, anchorEl:event.currentTarget})
        // console.log(event.currentTarget);
    }
    function closeMenu(event){
        setState({...state, anchorEl:null})
        if(event.target.value === 1){
            router.push('/movimentacao/form_SaidaPaciente')
        }else if(event.target.value === 2){
            router.push('/movimentacao/form_Saida')
        }else if(event.target.value === 3){
            router.push('/movimentacao/form_Entrada')
        }
    }
    console.log(state.data.filter((data)=>{ return data.data.includes("31/08/2022")}))

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
                        <MenuItem  value={1} onClick={(e)=>closeMenu(e)} >Saída para pacientes</MenuItem>
                        <MenuItem  value={2} onClick={(e)=>closeMenu(e)}>Saídas</MenuItem>
                        <MenuItem  value={3} onClick={(e)=>closeMenu(e)}>Entradas</MenuItem>
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
                            {tipo.map((t, index)=>(
                                <MenuItem key={index} value={t.id}>{t.descricao}</MenuItem>
                            ))}
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
                            {tipo.map((t, index)=>(
                                <MenuItem key={index} value={t.id}>{t.descricao}</MenuItem>
                            ))}
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
                <Box 
                    my={3}
                    display='flex'
                    justifyContent='right'    
                >
                    <Button 
                        variant="outlined"
                        onClick={()=> pesquisar(state.buscaTipoMovimentacao,state.buscaDtMovimentacao,state.buscaItem,state.buscaNSolicitacao,state.buscaSolicitante, state.buscaCPF)}
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

        </AppLayout>
    )
}