import { useState,useEffect } from 'react';
import { Alert, Box, Button, Grid, MenuItem, Paper, Snackbar, TextField, Typography } from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import {Table} from '../../components/Table'
import { Estoque } from "@/lib/estoque";
import { Itens } from "@/lib/item";
import { Inventarios } from "@/lib/inventario";
import { UsuariosService } from "@/lib/usuario";
import { NovoItem } from '../../components/Modal/novoItem';
import { useRouter } from 'next/router';
import useInventarioStore from '@/hooks/inventarioEdit';

export default function NovoInventario(){
    const dados = useInventarioStore(state=>state.datas)
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false)
    const [paginaEstoque, setPaginaEstoque] = useState(1)
    const [usuario, setUsuario] = useState([]);
    const [estoque, setEstoque] = useState([]);
    const [itens, setItens] = useState([]);
    const [itensCadastrados, setItensCadastrados] = useState([]);
    const [state, setState] = useState({
        data:'',
        responsavel_id:'',
        itens:[]
    })
    const rows = state.itens.map((row)=>({
        id:row.id,
        item_id:row.item_id,
        nome:row.item.nome,
        lote:row.lote,
        data_validade:row.data_validade,
        fator_embalagem:row.fator_embalagem,
        valor_anterior:row.valor_atual,
        qtd_anterior:row.quantidade,
    }));
    const columns = [
        { field: 'nome', headerName: 'Item', width: 180 },
        { field: 'lote', headerName: 'Lote', width: 180 },
        { field: 'valor_anterior', headerName: 'Valor', width:180 },
        { field: 'qtd_anterior', headerName: 'Quantidade anterior', width: 180 },
        { field: 'qtd', headerName: 'Quantidade atual', width: 250,
            renderCell: (params) => (
                <TextField
                    variant="standard"
                    // fullWidth
                    label='Digite quantidade atual'
                    name='qtd'
                    onChange={(e)=>onAddQuantidade(e.target.value,params.row)}
                />
            )
        },
        { field: 'valor_atual', headerName: 'Valor atual', width: 250,
            renderCell: (params) => (
                <TextField
                    type='number'
                    variant="standard"
                    // fullWidth
                    label='Digite valor atual'
                    name='valor'
                    maxLength={10}
                    onChange={(e)=>onAddValor(e.target.value,params.row)}
                />
            )
        }
    ]
    const [retornoUsuario,setRetornoUsuario] = useState({
        openSnakebar:false,
        statusSnake:'success',
        message:'',
    })
    function onAddQuantidade(value, row){
        let clone = Object.assign({}, row);
        clone.qtd_atual = parseInt(value);
        if(clone.qtd_anterior)delete clone.qtd_anterior
        if(clone.valor_anterior)delete clone.valor_anterior
        let itemIndex = itens.findIndex((i)=>i.id == clone.id)
        if(itemIndex>=0){
            itens[itemIndex].qtd_atual = value;
            setItens(itens)
        }else{
            let addItem = itens;
            addItem.push(clone)
            setItens(addItem)
            setState({...state,itens:addItem})
        }
    }
    function onAddValor(value, row){
        let clone = Object.assign({}, row);
        clone.valor_atual = parseInt(value);
        let itemIndex = itens.findIndex((i)=>i.id == clone.id)
        if(itemIndex>=0){
            itens[itemIndex].valor_atual = value;
            setItens(itens)
        }else{
            let addItem = itens;
            addItem.push(clone)
            setItens(addItem)
            setState({...state,itens:addItem})
        }
    }
    function onLoad(){
        UsuariosService.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...retornoUsuario, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setUsuario(result.data.data)
        });
        Itens.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...retornoUsuario, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setItensCadastrados(result.data.data)
        });
    }
    function onLoadEstoque(){
        Estoque.getAll(paginaEstoque).then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...retornoUsuario, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }    
            addPaginationEstoque(result)
            if(result.data.meta.to < result.data.meta.total){
                setPaginaEstoque(paginaEstoque+1)
            }
        });
    }
    function addPaginationEstoque(i){
        if(estoque.length < i.data.meta.total){
            let clone = Object.assign([], estoque);
            i.data.data.forEach(item=>{
                    clone.push(item);
                })
                setEstoque(clone)
            }
    }
    function onAddNovoItem(item){
        if(item.item_id == ''){
            return;
        }else{
            // let clone = Object.assign([], estoque);
            let clone = Object.assign([], state.itens);
            let cloneItens = Object.assign([], itens);
            if(item){
                delete item.novoItem
                item.id=''
            }
            clone.push(item)
            cloneItens.push(item)
            setItens(cloneItens)
            setState({...state,itens:clone})
            setOpenModal(false)
            // cloneItens.forEach(i=>{
            //     if(i.novoItem){
            //         delete i.novoItem;
            //         i.id = '';
            //     }
            // })
        }
    }
    function onSave(){
        if(dados.id){
            Inventarios.updateById(dados.id, state).then((result)=>{
                if(result instanceof Error){
                    setRetornoUsuario({...retornoUsuario, openSnakebar:true, message:result.message, statusSnake:'error'});
                }else{
                    router.push('/inventario')
                }
            })
        }else{
            Inventarios.create(state).then((result)=>{
                if(result instanceof Error){
                    setRetornoUsuario({...retornoUsuario, openSnakebar:true, message:result.message, statusSnake:'error'});
                }else{
                    router.push('/inventario')
                }
            })
        }
    }
    function closeSnakebar(){
        setRetornoUsuario({...retornoUsuario, openSnakebar:false})
    }
    useEffect(()=>{
        onLoad()
    },[])

    useEffect(()=>{
        onLoadEstoque()
    },[paginaEstoque])

    useEffect(()=>{
        if(dados){
            setState({...state, itens:dados.itens, data:dados.data, responsavel_id:dados.responsavel_id})
        }
    },[dados])
    return(
        <AppLayout>
            <Box
                display= 'flex'
                justifyContent='space-between'
                mb={4}
            >
            <Typography variant='h4' component='h1' color='secondary'>
                Novo inventário
            </Typography>
            <Button
                onClick={() => setOpenModal(true)}
                variant='outlined'
            >
                Adicionar item
            </Button>
            </Box>
            <Snackbar 
                open={retornoUsuario.openSnakebar} 
                autoHideDuration={3000} 
                onClose={closeSnakebar}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "top",
                }}
            >
                <Alert onClose={closeSnakebar} severity={retornoUsuario.statusSnake} sx={{ width: '100%' }}>
                    {retornoUsuario.message}
                </Alert>
            </Snackbar>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mt={2}>
                <Grid container spacing={3} mb={5}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                        value={state.data}
                        type='date'
                        name="data"
                        label="Data"
                        fullWidth
                        variant="outlined"
                        onChange={(e)=> setState({...state, data:e.target.value})}
                        InputLabelProps={{
                            shrink: true,  
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TextField
                            value={state.responsavel_id}
                            select
                            name="responsavel_id"
                            label='Responsável'
                            fullWidth
                            placeholder='Usuário responsável pelo inventário'
                            autoComplete="shipping address-line2"
                            variant="outlined"
                            onChange={(e)=> setState({...state, responsavel_id:e.target.value})}
                        >
                            {usuario?.map((user, index)=>(
                                <MenuItem key={index} value={user.id}>{user.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>  
                </Grid>
                <Table
                    columns = {columns}
                    rows = {rows}
                    check={state.tableCheckbox}
                    height={400}
                /> 
                <Box display='flex' justifyContent={"end"} gap='10px' p={2}>
                    <Button variant="text" onClick={()=> router.push('/inventario')}>Cancelar alterações</Button>
                    <Button type="submit" variant="contained" onClick={()=>onSave()}> Salvar</Button>
                </Box>   
            </Box>
            <NovoItem
                openModal={openModal} 
                onClose={() => setOpenModal(false)}
                itens={itensCadastrados}
                Save = {(item)=> onAddNovoItem(item)}
            />
        </AppLayout>
    )
}