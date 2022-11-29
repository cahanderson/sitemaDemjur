import { useState, useEffect, forwardRef } from "react";
import { Alert, Box, Button, CssBaseline, Divider, Grid, Menu, MenuItem, Paper, Snackbar, TextField, Typography } from "@mui/material";
// import Draggable from 'react-draggable';
import AppLayout from "@/components/Layouts/AppLayout";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { Table } from "@/components/Table";
import { Movimentacoes } from "@/lib/movimentacao";
import useMovimentacaoEntradaStore from "@/hooks/movimentacaoEntrada";
import useMovimentacaoSaidaStore from "@/hooks/movimentacaoSaida";
import useMovimentacaoSaidaPacienteStore from "@/hooks/movimentacaoSaidaPaciente";
import CallMadeIcon from '@mui/icons-material/CallMade';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


// function PaperComponent(props) {
//     return (
//       <Draggable
//         handle="#draggable-dialog-title"
//         cancel={'[class*="MuiDialogContent-root"]'}
//       >
//         <Paper {...props} />
//       </Draggable>
//     );
//   }

export default function Movimentacao(){   
    const addDataEntrada = useMovimentacaoEntradaStore(state=>state.addData);
    const addDataSaida = useMovimentacaoSaidaStore(state=>state.addData);
    const addDataSaidaPaciente = useMovimentacaoSaidaPacienteStore(state=>state.addData);
    const router = useRouter()
    const [openModal, setOpenModal] = useState(false)
    const [tipo, setTipo] = useState([''])
    const [paramsMovimentable, setParamsMovimentable] = useState([])
    const [efetivacao, setEfetivacao] = useState({
        movimentacao_id: null
    })
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
        openSnakebar:false,
        statusSnake:'success',
        message:'',
    });
    const columns = [
        { field: 'id', headerName: 'Nº movimentação', width:280 },
        { field: 'tipo_movimentacao', headerName: 'Tipo movimentação', width: 280 },
        { field: 'data', headerName: 'Data da movimentação', width: 280 },
        { field: 'efetivado', headerName: 'Efetivação', width: 230 },
        { 
            field: 'actions',headerName: 'Ver Movimentação',width: 170,type:'actions',getActions: (params) => [
                <GridActionsCellItem  icon={<CallMadeIcon/>} onClick={() => openPreview(params.id)} label="Delete" />,
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
    const open = Boolean(state.anchorEl);
    function openPreview(params){
        setEfetivacao({movimentacao_id: params})
        setOpenModal(true)
        Movimentacoes.getById(params)
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setParamsMovimentable(result)
        })
    }
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
        addDataSaida('');
        addDataSaidaPaciente('');
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
    function openMenu(event){
        setState({...state, anchorEl:event.currentTarget})
    }
    function closeMenu(event){
        setState({...state, anchorEl:null})
        if(event.target.value === 1){
            router.push('/movimentacao/form_saida')
        }else if(event.target.value === 2){
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
        if(params.is_efetivado == 'Efetivado'){
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
    function onEfetivar(params){
        Movimentacoes.efetivar(params).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
            }else{
                setState({...state, openSnakebar:true, message:'Efetivado com sucesso', statusSnake:'success'});
                setOpenModal(false)
            }
        })
    }
    function closeSnakebar(){
        setState({...state, openSnakebar:false})
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
                        Movimentações
                    </Typography>
                    
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
                        {/* <MenuItem  value={1} onClick={(e)=>closeMenu(e)} >Saída para pacientes</MenuItem> */}
                        <MenuItem  value={1} onClick={(e)=>closeMenu(e)}>Saídas</MenuItem>
                        <MenuItem  value={2} onClick={(e)=>closeMenu(e)}>Entradas</MenuItem>
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
                {/* <Preview
                    openModal={openModal}
                    onClose={() => setOpenModal(false)}
                    onSave = {(dados)=> populaItem(dados)}
                    params={paramsMovimentable}
                /> */}
            </Box>
            <Box>
            <Dialog
                open={openModal}
                // TransitionComponent={Transition}
                onClose={()=>{setOpenModal(false)}}
                maxWidth={'lg'}
                fullWidth
            >
                <DialogTitle color='secondary' fontSize={24} mb={2}>{"Movimentação"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Box p={1}>
                            <Grid container spacing={3} >
                                <Grid item xs={4}>
                                    <Typography variant="h6" fontWeight={'bold'}>Tipo movimentação</Typography>
                                    <Typography>{paramsMovimentable.d_tipo_movimentacao}</Typography>
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs={5}>
                                    <Typography variant="h6" fontWeight={'bold'}>Fornecedor</Typography>
                                    <Typography>{paramsMovimentable.fornecedor?.nome}</Typography>
                                </Grid>
                                <Divider orientation="vertical" flexItem />
                                <Grid item xs={2}>
                                    <Typography variant="h6" fontWeight={'bold'}>Valor</Typography>
                                    <Typography>{paramsMovimentable.valor}</Typography>
                                </Grid>
                                
                            </Grid>
                            <Typography my={4} mt={10} variant='h6' >Itens da movimentação</Typography>
                            <Box>
                                <List sx={{ width: '100%', maxWidth: 350}}>
                                {paramsMovimentable.itens?.map((i,index) =>(
                                    <>
                                        <ListItem alignItems="flex-start">
                                                <ListItemText
                                                    primary={
                                                        <Typography
                                                            component='span'
                                                            variant="body1"
                                                            color="text.primary"
                                                        >
                                                            {`Item: ${i.item?.nome}`}
                                                        </Typography>
                                                    }
                                                    secondary={`Quantidade: ${i.quantidade}`}
                                                />
                                        </ListItem>
                                        <Divider component="li" />
                                    </>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={paramsMovimentable?.is_efetivado?null:{display:'flex', justifyContent:'space-between'}}>
                    <Box display={paramsMovimentable?.is_efetivado?'none':'flex'} gap={1}>
                        <Button onClick={() => onEdit(paramsMovimentable)} variant='outlined'>Editar</Button>
                        <Button onClick={() => onDelete(paramsMovimentable)} variant='outlined' >Excluir</Button>
                        <Button
                            onClick={() => onEfetivar(efetivacao)} 
                            variant='outlined'
                            // display={paramsMovimentable?.is_efetivado?'none':null} 
                        >
                            Efetivar
                        </Button>
                    </Box>
                    <Box id='close'>
                        <Button onClick={()=>{setOpenModal(false)}} variant='contained'>Fechar</Button>
                    </Box>
                </DialogActions>
            </Dialog>
            </Box>

        </AppLayout>
    )
}



