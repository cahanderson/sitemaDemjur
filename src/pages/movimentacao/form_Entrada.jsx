import { useEffect, useState } from "react";

import { Box, Button, Divider, Grid, IconButton, MenuItem, Paper, TextField, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';

import AppLayout from "@/components/Layouts/AppLayout";
import { Movimentacoes } from "@/lib/movimentacao";
import { Itens } from "@/lib/item";
// import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Entradas(){
    const router = useRouter()
    // const {register, handleSubmit, setValue} = useForm()
    const [tipo, setTipo] = useState([''])
    const [fornecedor, setFornecedor] = useState([''])
    const [itens, setItens] = useState([''])
    const [estabelecimento, setEstabelecimento] = useState()
    const [file, setFile] = useState()
    const [movimentacaoId, setMovimentacaoId] = useState()
    const [pessoa, setPessoa] = useState({
        "is_beneficiario": true,
        "is_prescritor": false,
        "is_fornecedor": false,
        "is_doacao": false,
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
    const [item, setItem] = useState([{
        item_id:'',
        quantidade:'',
        fator_embalagem:'',
        data_validade:'',
        lote:'',
        valor_unit:'',
    }])
    function onLoad(pessoa){
        Movimentacoes.getMovimentacao()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setTipo(result.data.dados.filter((tipos)=>{return tipos.metadata?.includes("entrada")}))
        });

        Movimentacoes.getPessoa(pessoa)
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }if(pessoa.is_beneficiario === ''){
                setFornecedor(estabelecimento)
            }else{
                setFornecedor(result.data.data)
            }
        });

        Itens.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setItens(result.data.data)
        });

        Movimentacoes.getEstabelecimento()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setEstabelecimento(result.data.data)
        })
    }          
    function onAddItem(){
        // setItem([...item, ''])
        setItem([...item,{ item_id:'',quantidade:'',fator_embalagem:'',data_validade:'',lote:'',valor_unit:''}])
        setState({...state, itens:[...state.itens, {item_id:'',quantidade:'',fator_embalagem:'',data_validade:'',lote:'',valor_unit:''}]})
    }
    function onSetItem(e,index){
        if(e.target.name === 'item_id'){
            item[index].item_id = e.target.value;
            setState({...state,itens:[...item]})
        }else if(e.target.name === 'quantidade'){
            item[index].quantidade = e.target.value;
            setState({...state,itens:[...item]})
        }else if(e.target.name === 'fator_embalagem'){
            item[index].fator_embalagem = e.target.value;
            setState({...state,itens:[...item]})
        }else if(e.target.name === 'data_validade'){
            item[index].data_validade = e.target.value;
            setState({...state,itens:[...item]})
        }else if(e.target.name === 'lote'){
            item[index].lote = e.target.value;
            setState({...state,itens:[...item]})
        }else if(e.target.name === 'valor_unit'){
            item[index].valor_unit = e.target.value;
            setState({...state,itens:[...item]})
        }     
    }
    function onDeleteItem(position){
        if(state.itens.length > 1){
            setState({...state, itens:[...state.itens.filter((item,index)=>index !== position)]})
        }else{
            setState({...state, itens:[{item_id:'',quantidade:'',fator_embalagem:'',data_validade:'',lote:'',valor_unit:''}]})
        }
    }
    function reload(valor){
        if(valor === "1"){
            setPessoa({"is_beneficiario": false,"is_prescritor": false,"is_fornecedor": true,"is_doacao": false,})
        }else if(valor === "3"){
            setPessoa({ "is_beneficiario": false,"is_prescritor": false,"is_fornecedor": false,"is_doacao": true})
        }else if(valor === "2"){
            setPessoa({"is_beneficiario": '',"is_prescritor": '',"is_fornecedor": '',"is_doacao": '',})
            setFornecedor(estabelecimento)
        }
    }
    function onFile(e){
        e.preventDefault();

    }
    function onSave(data){
        Movimentacoes.create(data).then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                   
                    return;
                }
                setMovimentacaoId(result.dados.id)
        })
    }
    function onSaveFile(file,movimentacaoId){
        const formData = new FormData();

        formData.append('movimentacao_id', movimentacaoId);
        formData.append('file', file);
        
        Movimentacoes.updateFile(formData).then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                   
                return;
            }
            router.push('/movimentacao')
        })
    }
    useEffect(()=>{
        onLoad(pessoa)
    },[pessoa])
    console.log(movimentacaoId);

    useEffect(()=>{
        if(movimentacaoId){
            onSaveFile(file, movimentacaoId)
        }
    },[movimentacaoId])

    console.log(movimentacaoId);

    return(
        <AppLayout>
            <Typography variant='h5' component='h1' color='secondary'>
                Entradas
            </Typography>
            {/* onSubmit={handleSubmit(onSubmit)} */}
            <Box component="form" >
                <Box  padding='10px' component={Paper} justifyContent='center' alignItems='center' mt={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                select
                                name="d_tipo_movimentacao"
                                label="Tipo de entrada"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => {setState({...state, d_tipo_movimentacao: e.target.value}),reload(e.target.value)}}
                                // {...register('tipo_Entrada')}
                            >
                                {tipo.map((tipo, index)=>(
                                    <MenuItem key={index} value={tipo.valor}>{tipo.descricao}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                            select
                            name="fornecedor"
                            label="Fornecedor"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => {setState({...state, movimentable_id: e.target.value})}}
                            // {...register('fornecedor')}
                            >
                                {fornecedor?.map((f, index)=>(
                                    <MenuItem key={index} value={f.id}>{f.nome}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} mt={3}>    
                        <Grid item xs={12} sm={3}>
                            <TextField
                                type='date'
                                name="data"
                                label='Data'
                                fullWidth
                                variant="outlined"
                                onChange={(e) => {setState({...state,data: e.target.value})}}
                                // {...register('data')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                name="valor"
                                label='Valor'
                                fullWidth
                                variant="outlined"
                                onChange={(e) => {setState({...state,valor: e.target.value})}}
                                // {...register('valor')}
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

                        <Grid item xs={12} sm={4} padding='15px'>
                            <Box
                                display='flex'
                                justifyContent='end'
                            >
                                <Button
                                    sx={{marginTop:'6px'}}
                                    variant = {state.is_efetivado ? "outlined" : "contained"}
                                    component="label"
                                    onClick={()=>setState({...state, is_efetivado: !state.is_efetivado })}    
                                >
                                    {state.is_efetivado ? "Efetivado" : "Efetivar"}
                                </Button>
                            </Box>
                        </Grid>   
                        
                    </Grid>   
                    <Box component='div'my={4}>
                    <Divider />
                    </Box>
                    {item.map((item, index)=>(
                        <Grid key={index} container mb={4}>
                            <Grid item xs={11} container spacing={3}>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        select
                                        name="item_id"
                                        label='Item'
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=> onSetItem(e,index)}
                                        // {...register('itens.tipo')}
                                    >
                                        {itens.map((i, index)=>(
                                            <MenuItem key={index} value={i.id}>{i.nome}</MenuItem>
                                        ))}
                                    </TextField>    
                                </Grid>
                                
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        name="quantidade"
                                        label='Quantidade'
                                        fullWidth
                                        variant="outlined"
                                        // {...register('itens.quantidade')}
                                        onChange={(e)=> onSetItem(e,index)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={2}>
                                    <TextField
    
                                        name="fator_embalagem"
                                        label='Fator emb'
                                        fullWidth
                                        variant="outlined"
                                        // {...register('itens.fatorEmbalagem')}
                                        onChange={(e)=> onSetItem(e,index)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        type='date'
                                        name="data_validade"
                                        label='Data de validade'
                                        fullWidth
                                        variant="outlined"
                                        // {...register('itens.dtValidade')}
                                        onChange={(e)=> onSetItem(e,index)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        name="lote"
                                        label='Lote'
                                        fullWidth
                                        variant="outlined"
                                        // {...register('itens.lote')}
                                        onChange={(e)=> onSetItem(e,index)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        name="valor_unit"
                                        label='valor Unitario'
                                        fullWidth
                                        variant="outlined"
                                        // {...register('itens.V_Unitario')}
                                        onChange={(e)=> onSetItem(e,index)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={1} display='flex' alignItems='center' justifyContent='center'>
                                <Grid display='flex' item xs={12} sm={1}>
                                    <IconButton
                                        
                                        onClick={()=>{onDeleteItem(index)}}
                                    >
                                        <ClearIcon sx={{color:'red'}} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>    
                    ))}
                    <Divider />
                    <Box display='flex' justifyContent={'center'} my={2}>
                        <Button
                            variant='outlined'
                            onClick={()=>{onAddItem()}}
                        >
                            <Box mr='10px' mt='4px'>
                                <AddCircleSharpIcon />
                            </Box>
                            Novo item
                        </Button>
                    </Box>
                    <Box display='flex' justifyContent={"end"} gap='10px' p={2}>
                        <Button variant="text" onClick={() => router.push('/movimentacao')}> Cancelar Edição</Button>
                        <Button variant="contained" onClick={() => onSave(state)}> Salvar</Button>
                    </Box>  
                </Box>

            </Box>
        </AppLayout>
    )
}