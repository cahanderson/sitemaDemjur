import { useState, useEffect } from "react";
import { Box, Button, CssBaseline, Grid, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { Movimentacoes } from "@/lib/movimentacao";
import { useRouter } from "next/router";
import useMovimentacaoEntradaStore from "@/hooks/movimentacaoEntrada";
import useMovimentacaoSaidaStore from "@/hooks/movimentacaoSaida";
import useMovimentacaoSaidaPacienteStore from "@/hooks/movimentacaoSaidaPaciente";

export default function Movimentacao(){   
    const addDataEntrada = useMovimentacaoEntradaStore(state=>state.addData);
    const addDataSaida = useMovimentacaoSaidaStore(state=>state.addData);
    const addDataSaidaPaciente = useMovimentacaoSaidaPacienteStore(state=>state.addData);
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
        { field: 'id', headerName: 'Nº movimentação', width:280 },
        { field: 'tipo_movimentacao', headerName: 'Tipo movimentação', width: 280 },
        { field: 'data', headerName: 'Data da movimentação', width: 280 },
        { field: 'efetivado', headerName: 'Efetivação', width: 280 },
        { field: 'actions',type:'actions',getActions: (params) => [
            <GridActionsCellItem  icon={<DeleteIcon/>} onClick={() => onDelete(params)} label="Delete" />,
            <GridActionsCellItem icon={<ModeEditIcon/>} onClick={() => onEdit(params)} label="edit" />,
          ]
        }
    ]
    const rows = state.data?.map((row)=>({
        id:row.id,
        tipo_movimentacao:row.tipo_movimentacao.descricao,
        d_tipo_movimentacao:row.tipo_movimentacao.valor,
        data:row.data.split('-').reverse().join('/'),
        efetivado: row.is_efetivado?"Efetivado":"Não efetivado",
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
        addDataEntrada('');
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
            router.push('/movimentacao/form_saidaPaciente')
        }else if(event.target.value === 2){
            router.push('/movimentacao/form_saida')
        }else if(event.target.value === 3){
            router.push('/movimentacao/form_entrada')
        }
    }
    function onDelete(params){
        if(params.row.efetivado == 'Efetivado'){
            alert('Não é possível realizar ação! Movimentação efetivada')
        }else{
            if(confirm('Realmente deseja apagar?')){
                Movimentacoes.deleteById(params.id)
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
    }
    function onEdit(params){
        if(params.row.efetivado == 'Efetivado'){
            alert('Não é possível realizar ação! Movimentação efetivada')
        }else{
            Movimentacoes.getById(params.id).
            then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                }
                if(params.row.d_tipo_movimentacao=='1'||params.row.d_tipo_movimentacao=='2'||params.row.d_tipo_movimentacao=='3'){
                    addDataEntrada(result)
                    router.push('/movimentacao/form_entrada')
                }else if(params.row.d_tipo_movimentacao=='5'||params.row.d_tipo_movimentacao=='6'||params.row.d_tipo_movimentacao=='7'){
                    addDataSaida(result)
                    router.push('/movimentacao/form_saida')
                }else if(params.row.d_tipo_movimentacao=='4'){
                    addDataSaidaPaciente(result)
                    router.push('/movimentacao/form_saidaPaciente')
                }
            })
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
                    height={350}
                />
            </Box>

        </AppLayout>
    )
}