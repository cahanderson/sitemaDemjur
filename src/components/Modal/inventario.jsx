import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, CssBaseline, Divider, Grid, IconButton, InputAdornment, MenuItem, Paper, TextField } from "@mui/material";
import { useEffect } from 'react';
import { useState } from "react";
import { Modal } from '../Layouts/modal';    

export function NovoInventario(props){
    const [state, setState] = useState({
        data:'',
        responsavel_id:'',
        itens:[{
            item_id:'',
            qtd_atual:'',
            valor_atual:'',
            valor_anterior:'',
            qtd_anterior: '',
            lote:''
            }]
    })
    const [item, setItem] = useState([{
        item_id:'',
        qtd_atual:'',
        valor_atual:'',
        valor_anterior:'',
        qtd_anterior: '',
        lote:''
    }])
    const [calc, setCalc] = useState([{
        diferenca_qtd:'',
        diferenca_valor:'',
    }])

    function onAddItem(){
        setCalc([...calc,{ diferenca_qtd:'',diferenca_valor:''}])
        setItem([...item,{ item_id:'',qtd_atual:'',valor_atual:'',valor_anterior:'',qtd_anterior:'',lote:''}])
        setState({...state, itens:[...state.itens, {item_id:'',qtd_atual:'',valor_atual:'',valor_anterior:'',qtd_anterior:'',lote:''}]})
    }
    function onSetItem(e,index){
        if(e.target.name === 'item_id'){
            item[index].item_id = e.target.value;
            item[index].qtd_anterior = props.estoque[item[index].item_id-1]?.quantidade,
            item[index].lote = props.estoque[item[index].item_id-1]?.lote,
            item[index].valor_anterior = props.estoque[item[index].item_id-1]?.valor_atual,
            setState({...state,itens:[...item]})
            console.log(index);
        }else if(e.target.name === 'qtd_atual'){
            item[index].qtd_atual = e.target.value;
            calc[index].diferenca_qtd = item[index].qtd_anterior - e.target.value;
            setCalc([...calc])
            setState({...state,itens:[...item]})
        }else if(e.target.name === 'valor_atual'){
            item[index].valor_atual = e.target.value;
            calc[index].diferenca_valor = props.estoque[item[index].item_id-1]?.valor_atual - e.target.value,
            setState({...state,itens:[...item]})
            setCalc([...calc])
        }    
    }
    function onDeleteItem(position){
        if(state.itens.length > 1){
            setState({...state, itens:[...state.itens.filter((item,index)=>index !== position)]})
        }else{
            setState({...state, itens:[{item_id:'',qtd_atual:'',valor_atual:'',valor_anterior:'',qtd_anterior:'',diferenca_qtd:'',diferenca_valor:'',lote:''}]})
        }
    }
    function limparItem(){
        setState({data:'',responsavel_id:'',itens:[{item_id:'',qtd_atual:'',valor_atual:'',valor_anterior:'',qtd_anterior:'',diferenca_qtd:'',diferenca_valor:'',lote:''}]})
        setCalc([{diferenca_qtd:'',diferenca_valor:''}])
    }
    useEffect(()=>{
        if(props.inventario?.id != null|| props.inventario?.id != undefined){
            setState({...state,data:props.inventario.data.split('-').reverse().join('/'), responsavel_id:props.inventario.responsavel_id})
            props.inventario?.itens.map((item)=>{
            setState({...state,itens:[{item_id:item.item_id, qtd_atual:item.qtd_atual, valor_atual:item.valor_atual, valor_anterior:item.valor_anterior, qtd_anterior:item.qtd_anterior, lote:item.lote}]})
        })
       }else{
           limparItem()
       }
   },[props.inventario?.id])

    useEffect(()=>{
        setState({...state,itens:item})
    },[])
    console.log(state);
    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparItem()}}
            header='Inventário'
            onSave = {()=>props.onSave(props.inventario?.id ,state)}
            //enviando informações para o botão save
        >
            <CssBaseline />
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mt={2}>
                <Grid container spacing={3}>
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
                            {props.usuario?.map((user, index)=>(
                                <MenuItem key={index} value={user.id}>{user.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>  
                </Grid>            
                
                {state.itens?.map((itens, index)=>(
                    <Grid key={index} container my={3}>
                        <Grid item xs={11} container spacing={3}>
                            <Divider />
                            <Grid item xs={8}>
                                <TextField
                                    select
                                    value={itens.item_id}
                                    name="item_id"
                                    label='Itens'
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e)=> onSetItem(e,index)}
                                    // {...register(`itens.${index}.item_id`)}
                                >
                                    {props.estoque?.map((item, index)=>(
                                        <MenuItem key={index} value={item.item_id}>{`${props.itens[item.item_id]?.codigo} - ${props.itens[item.item_id]?.nome} - Lote: ${item.lote} - Validade: ${item.data_validade.split('-').reverse().join('/')} - Fator embalagem: ${item.fator_embalagem}`}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={2}>
                                <TextField
                                    value={itens.qtd_atual}
                                    name="qtd_atual"
                                    label='Qtd Atual'
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e)=> onSetItem(e,index)}
                                    // {...register(`itens.${index}.d_frequencia_entrega`)}
                                />
                            </Grid>
                            
                            <Grid item xs={2}>
                                <TextField
                                    value={itens.valor_atual}
                                    name="valor_atual"
                                    label='Valor atual'
                                    fullWidth
                                    variant="outlined"
                                    // startAdornment='R$'
                                    onChange={(e)=> onSetItem(e,index)}
                                    // {...register(`itens.${index}.quantidade_limite`)}
                                />
                            </Grid>


                            <Grid item xs={2}>
                                <TextField
                                    value={itens.qtd_anterior}
                                    name="qtd_anterior"
                                    label='Quantidade anterior'
                                    fullWidth
                                    variant="filled"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                            />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    value={calc[index]?.diferenca_qtd}
                                    name="diferenca_qtd"
                                    label='Diferença de quantidade'
                                    fullWidth
                                    variant="filled"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    // {...register(`itens.${index}.quantidade_limite`)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    value={calc[index]?.diferenca_valor}
                                    name="diferenca_valor"
                                    label='Diferença de valor'
                                    fullWidth
                                    variant="filled"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    // {...register(`itens.${index}.quantidade_limite`)}
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
            </Box>

        </Modal>
    )
}