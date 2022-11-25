import { useEffect, useState } from "react";
import { Alert, Autocomplete, Box, Button, Divider, Grid, IconButton, MenuItem, Paper, Snackbar, TextField, Typography } from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { mask, unMask } from 'remask'
import AppLayout from "@/components/Layouts/AppLayout";
import { Movimentacoes } from "@/lib/movimentacao";
import { Itens } from "@/lib/item";
import { useRouter } from "next/router";
import useMovimentacaoEntradaStore from "@/hooks/movimentacaoEntrada";

export default function Entradas(){
    const router = useRouter()
    const dados = useMovimentacaoEntradaStore(state=>state.datas)
    const [dataId, setDataId] = useState('')
    const [tipo, setTipo] = useState([''])
    const [fornecedor, setFornecedor] = useState([''])
    const [itens, setItens] = useState([''])
    const [itensInseridos, setItensInseridos] = useState([])
    const [file, setFile] = useState()
    // const [movimentacaoId, setMovimentacaoId] = useState()
    const [item, setItem] = useState([])
    const [retornoUsuario,setRetornoUsuario] = useState({
        openSnakebar:false,
        statusSnake:'success',
        message:'',
    })
    const [pessoa, setPessoa] = useState({
        "is_beneficiario": false,
        "is_prescritor": false,
        "is_fornecedor": false,
        "is_estabelecimento":false,
    })
    const [state, setState] = useState({
        d_tipo_movimentacao:'',
        movimentable_id:'',
        documento: "URI::localhost",
        data:'',
        valor:'',
        is_efetivado:false,
        itens:[{
            item_id:'',
            quantidade:'',
            fator_embalagem:'',
            data_validade:'',
            lote:'',
            valor_unit:'',
        }]
    })
    const [itemAInserir, setItemAInserir] = useState({
        id:null,
        item_id:'',
        quantidade:'',
        fator_embalagem:'',
        data_validade:'',
        lote:'',
        valor_unit:'',
    })
    function onLoad(pessoa){
        Movimentacoes.getMovimentacao()
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...retornoUsuario, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setTipo(result.data.dados.filter((tipos)=>{return tipos.metadata?.includes("entrada")}))
        });

        Movimentacoes.getPessoa(pessoa)
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...retornoUsuario, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setFornecedor(result.data.data)
        });

        Itens.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...retornoUsuario, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setItens(result.data.data)
        });
    }
    function onSetItem(e){
        if(e.target.name === 'item_id'){
            console.log('inserir');
            itemAInserir.item_id = e.target.value;
            setItemAInserir({...itemAInserir})
        }else if(e.target.name === 'quantidade'){
            itemAInserir.quantidade = e.target.value;
            setItemAInserir({...itemAInserir})
        }else if(e.target.name === 'fator_embalagem'){
            itemAInserir.fator_embalagem = e.target.value;
            setItemAInserir({...itemAInserir})
        }else if(e.target.name === 'data_validade'){
            itemAInserir.data_validade = e.target.value;
            setItemAInserir({...itemAInserir})
        }else if(e.target.name === 'lote'){
            itemAInserir.lote = e.target.value;
            setItemAInserir({...itemAInserir})
        }else if(e.target.name === 'valor_unit'){
            itemAInserir.valor_unit = e.target.value;
            setItemAInserir({...itemAInserir})
        }     
    }
    function onDeleteItem(position){
        setItensInseridos([...itensInseridos.filter((item,index)=>index !== position)])
    }
    function reload(valor){
        if(valor === "1"||valor === 1){
            setPessoa({"is_beneficiario": false,"is_prescritor": false,"is_fornecedor": true,"is_estabelecimento":false})
        }else if(valor === "3"||valor === 3){
            setPessoa({ "is_beneficiario": false,"is_prescritor": false,"is_fornecedor": false,"is_estabelecimento":false})
        }else if(valor === "2"||valor === 2){
            setPessoa({"is_beneficiario": '',"is_prescritor": '',"is_fornecedor": '',"is_estabelecimento":''})
        }
    }
    function onLoadEdit(data){
        const itensEdit = data.itens?.map((item)=>({
            id:item.id,
            item_id:item.item_id,
            quantidade:item.quantidade,
            fator_embalagem:item.fator_embalagem,
            data_validade:item.data_validade,
            lote:item.lote,
            valor_unit:item.valor_unit,
        }));
        setState({
            d_tipo_movimentacao:data.d_tipo_movimentacao,
            movimentable_id:data.movimentable_id,
            documento: "URI::localhost",
            data:data.data,
            valor:data.valor,
            is_efetivado:data.is_efetivado,
            itens: itensEdit,
        })
        setItem(itensEdit)
        setDataId(data.id)
    }
    function onSave(data){
        if(dataId!=''){
            Movimentacoes.updateById(dataId,data).then((result)=>{
                if(result instanceof Error){
                    setRetornoUsuario({...retornoUsuario, openSnakebar:true, message:result.message, statusSnake:'error'});                   
                        return;
                }
                router.push('/movimentacao')
            })
        }else{
            Movimentacoes.create(data).then((result)=>{
                if(result instanceof Error){
                    setRetornoUsuario({...retornoUsuario, openSnakebar:true, message:result.message, statusSnake:'error'});                   
                    return;
                }
                router.push('/movimentacao')
            })
        }
    }
    function adicionarItem(){
        let newItens = Object.assign([], itensInseridos);
            newItens.push(itemAInserir)
            setItensInseridos(newItens)
            setState({...state,itens:newItens})
        setItemAInserir({
            item_id:'',
            quantidade:'',
            fator_embalagem:'',
            data_validade:'',
            lote:'',
            valor_unit:'',
        })
    }
    console.log(state);
    console.log(itemAInserir);
    function closeSnakebar(){
        setRetornoUsuario({...retornoUsuario, openSnakebar:false})
    }
    // function onSaveFile(file,movimentacaoId){
    //     const formData = new FormData();

    //     formData.append('movimentacao_id', movimentacaoId);
    //     formData.append('file', file);
        
    //     Movimentacoes.updateFile(formData).then((result)=>{
    //         if(result instanceof Error){
    //             setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                   
    //             return;
    //         }
    //         router.push('/movimentacao')
    //     })
    // }
    useEffect(()=>{
        onLoad(pessoa)
    },[pessoa])

    useEffect(()=>{
        if(dados){
            onLoadEdit(dados)
        }
    },[dados])

    useEffect(()=>{
        if(state.d_tipo_movimentacao){
            reload(state.d_tipo_movimentacao)
        }
    },[state.d_tipo_movimentacao])
    return(
        <AppLayout>
            <Typography variant='h5' component='h1' color='secondary'>
                Entradas
            </Typography>
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
            <Box  padding='10px' component={Paper} justifyContent='center' alignItems='center' mt={2}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            value={state.d_tipo_movimentacao}
                            select
                            name="d_tipo_movimentacao"
                            label="Tipo de entrada"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => {setState({...state, d_tipo_movimentacao: e.target.value})}}
                        >
                            {tipo.map((tipo, index)=>(
                                <MenuItem key={index} value={tipo.valor}>{tipo.descricao}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Autocomplete
                            value={fornecedor.forEach(i=>{if(i.id == state.movimentable_id)i.nome})}
                            options={fornecedor?.map((option) => option.nome)}
                            onChange={(_, newValue) => {
                                fornecedor.forEach((i)=>{
                                    if(i.nome == newValue){
                                        setState({...state, movimentable_id: i.id})
                                    }
                                })
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Fornecedor"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} mt={3}>    
                    <Grid item xs={12} sm={3}>
                        <TextField
                            value={state.data}
                            type='date'
                            name="data"
                            label='Data'
                            fullWidth
                            variant="outlined"
                            onChange={(e) => {setState({...state,data: e.target.value})}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            value={mask(state.valor,['9,99','99,99','999,99'])}
                            name="valor"
                            label='Valor'
                            fullWidth
                            variant="outlined"
                            onChange={(e) => {setState({...state,valor: unMask(e.target.value)})}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button
                            sx={{marginTop:'6px'}}
                            variant="outlined" 
                            component="label"
                            onChange={(e)=>setFile(e.target.files[0])}    
                        >
                            Anexar
                            <AttachFileIcon sx={{marginBottom:'5px'}} />
                            <input hidden multiple type="file" />
                        </Button>
                    </Grid>  
                    
                </Grid>   
                <Box component='div'my={4}>
                <Divider />
                </Box>
                <Grid container mb={4}>
                    <Grid item xs={10} container spacing={3}>
                        <Grid item xs={12} sm={3}>
                            <Autocomplete
                                value={itens.forEach(i=>{if(i.id == state.movimentable_id)i.nome})}
                                options={itens?.map((option) => option.nome)}
                                id="item_id"
                                name='item_id'
                                onChange={(e, newValue) => {
                                    itens.forEach((i)=>{
                                        if(i.nome == newValue){
                                            onSetItem(e,i.id)
                                        }
                                    })
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Item"
                                        name="item_id"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                value={itemAInserir.quantidade}
                                name="quantidade"
                                label='Quantidade'
                                fullWidth
                                variant="outlined"
                                onChange={(e)=> onSetItem(e)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <TextField
                                value={itemAInserir.fator_embalagem}
                                name="fator_embalagem"
                                label='Fator emb'
                                fullWidth
                                variant="outlined"
                                onChange={(e)=> onSetItem(e)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <TextField
                                value={itemAInserir.data_validade}
                                type='date'
                                name="data_validade"
                                label='Data de validade'
                                fullWidth
                                variant="outlined"
                                // {...register('itens.dtValidade')}
                                onChange={(e)=> onSetItem(e)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={1}>
                            <TextField
                                value={itemAInserir.lote}
                                name="lote"
                                label='Lote'
                                fullWidth
                                variant="outlined"
                                onChange={(e)=> onSetItem(e)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <TextField
                                value={itemAInserir.valor_unit}
                                name="valor_unit"
                                label='valor Unitario'
                                fullWidth
                                variant="outlined"
                                onChange={(e)=> onSetItem(e)}
                            />
                        </Grid>
                    </Grid>
                    <Grid 
                        sx={{justifyContent:'center', display:'flex', alignItems:'center'}} 
                        item xs={12} 
                        sm={2} >
                        <Button
                            variant="contained"
                            onClick={() => adicionarItem()}
                        >
                            Adicionar ITem
                        </Button>
                    </Grid>
                </Grid>    
                {itensInseridos.map((item, index)=>(
                <Grid key={index} container mt={5} mb={3} component={Paper} p={1}>
                    <Grid item xs={11} container spacing={3}>
                        <Grid item xs={12} sm={2} disabled>
                            <Typography variant="body1">Item</Typography>
                            <Typography>{item.item_nome}</Typography>
                        </Grid>
                        
                        <Grid item xs={12} sm={2}>
                            <Typography variant="body1">Quantidade</Typography>
                            <Typography>{item.quantidade}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography variant="body1">Fator embalagem</Typography>
                            <Typography>{item.fator_embalagem}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography variant="body1">Data de validade</Typography>
                            <Typography>{item.lote}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography variant="body1">Lote</Typography>
                            <Typography>{item.fator_embalagem}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Typography variant="body1">Valor Unitário</Typography>
                            <Typography>{item.lote}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} display='flex' alignItems='center' justifyContent='center'>
                        <Grid display='flex' item xs={12} sm={1} justifyContent='end' alignContent='center' mb={1}>
                            <IconButton
                                onClick={()=>{onDeleteItem(index)}}
                            >
                                <DeleteOutlineTwoToneIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>    
            ))}
                <Divider />
                <Box display='flex' justifyContent={"end"} gap='10px' p={2}>
                    <Button variant="text" onClick={() => router.push('/movimentacao')}> Cancelar Edição</Button>
                    <Button variant="contained" onClick={() => onSave(state)}> Salvar</Button>
                </Box>  
            </Box>
        </AppLayout>
    )
}