import { useEffect, useState } from "react";

import { Box, Button, Divider, Grid, IconButton, MenuItem, Paper, TextField, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';

import AppLayout from "@/components/Layouts/AppLayout";
import { Movimentacoes } from "@/lib/movimentacao";
import { Fornecedor } from "@/lib/fornecedor";
import { Itens } from "@/lib/item";
import { useForm } from "react-hook-form";

const data = [
    {
        "solicitacoes":"123",
        "nome":"Carlos",
        "cpf":"12345678910",
        "nome_da_mae":"Maria",
        "dt_nascimento":"01/01/1995",

    },
    {
        "solicitacoes":"123456",
        "nome":"Carlos",
        "cpf":"12345678910",
        "nome_da_mae":"Maria",
        "dt_nascimento":"01/01/1995",

    },
    {
        "solicitacoes":"123456",
        "nome":"Carlos",
        "cpf":"06060206328",
        "nome_da_mae":"Maria",
        "dt_nascimento":"01/01/1995",

    },
    {
        "solicitacoes":"123456",
        "nome":"Carlos",
        "cpf":"17316200302",
        "nome_da_mae":"Maria",
        "dt_nascimento":"01/01/1995",

    }
];  

export default function Entradas(){
    const {register, handleSubmit, setValue} = useForm()
    const [tipo, setTipo] = useState([''])
    const [fornecedor, setFornecedor] = useState([''])
    const [itens, setItens] = useState([''])
    const [state, setState] = useState({
        codigo:'',
        descricao:'',
        princAtivo:'',
        pessoa:{
            "is_beneficiario": false,
            "is_prescritor": false,
            "is_fornecedor": true,
        },
    })
    const [item, setItem] = useState([{
        tipo:'',
        categoria:'',
        loteEValidade:false
    }])

    const onSubmit = (data)=>{
        console.log(data);
    }

    function onLoad(pessoa){
        Movimentacoes.getMovimentacao()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setTipo(result.data.dados.filter((tipos)=>{return tipos.metadata?.includes("entrada")}))
        });

        Fornecedor.getPessoa(pessoa)
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setFornecedor(result.data.data)
        });

        Itens.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setItens(result.data.data)
        })
    }            
    function onAddItem(){
        // setItem([...item, ''])
        setItem([...item,{ item:'',qtdMensal:'',PrevDt:'',FreqEntrega:''}])
    }
    function onSetItem(e,index){
        if(e.target.name === 'tipo'){
            item[index].tipo = e.target.value;
            setItem([...item])
        }else if(e.target.name === 'categoria'){
            item[index].categoria = e.target.value;
            setItem([...item])
        }else if(e.target.name === 'check'){
            item[index].categoria = e;
            // setItem([...item])
        }
        
    }
    function onDeleteItem(position){
        if(item.length > 1){
            setItem([...item.filter((item,index) => index !== position)])
        }else{
            // setItem([...item.filter((item,index) => index !== position)])
            setItem([{ item:'',qtdMensal:'',PrevDt:'',FreqEntrega:''}])
        }
    }

    useEffect(()=>{
        onLoad(state.pessoa)
    },[])
    // console.log(itens);

    return(
        <AppLayout>
            <Typography variant='h5' component='h1' color='secondary'>
                Entradas
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mt={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                select
                                id="tipo_Entrada"
                                name="tipo_Entrada"
                                label="Tipo de entrada"
                                fullWidth
                                variant="outlined"
                            >
                                {tipo.map((tipo, index)=>(
                                    <MenuItem key={index} value={tipo.id}>{tipo.descricao}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <TextField
                            select
                            id="fornecedor"
                            name="fornecedor"
                            label="Fornecedor"
                            fullWidth
                            variant="outlined"
                            >
                                {fornecedor.map((f, index)=>(
                                    <MenuItem key={index} value={f.id}>{f.nome}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} mt={3}>    
                        <Grid item xs={12} sm={3}>
                            <TextField
                                type='date'
                                id="data"
                                name="data"
                                label='Data'
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                // type=''
                                id="valor"
                                name="valor"
                                label='Valor'
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                sx={{marginTop:'7px'}}
                                variant="outlined" 
                                component="label">
                                Anexar
                                <AttachFileIcon sx={{marginBottom:'5px'}} />
                                <input hidden multiple type="file" />
                            </Button>
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
                                        value={item.tipo}
                                        select
                                        id="tipo"
                                        name="tipo"
                                        label='Item'
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=> onSetItem(e,index)}
                                    >
                                        {itens.map((i, index)=>(
                                            <MenuItem key={index} value={i.id}>{i.nome}</MenuItem>
                                        ))}
                                    </TextField>    
                                </Grid>
                                
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        id="quantidade"
                                        name="quantidade"
                                        label='Quantidade'
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=> onSetItem(e,index)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        id="fatorEmbalagem"
                                        name="fatorEmbalagem"
                                        label='Fator emb'
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=> onSetItem(e,index)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        type='date'
                                        id="dtValidade"
                                        name="dtValidade"
                                        label='Data de validade'
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=> onSetItem(e,index)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        id="dtValidade"
                                        name="dtValidade"
                                        label='Lote'
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=> onSetItem(e,index)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        id="V_Unitario"
                                        name="V_Unitario"
                                        label='valor Unitario'
                                        fullWidth
                                        variant="outlined"
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
                    <Box display='flex' justifyContent={"end"} gap={3} p={2} borderRadius={3}>
                        <Button variant="text" onClick={()=>props.onClose()}> Cancelar Edição</Button>
                        <Button type='submit' variant="contained" onClick={() => props.onSave()}> Salvar</Button>
                    </Box>
                    
                </Box>
            </Box>
        </AppLayout>
    )
}