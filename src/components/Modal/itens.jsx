import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Checkbox, CssBaseline, Divider, FormControl, FormControlLabel, Grid, IconButton, MenuItem, TextField } from "@mui/material";
import { useEffect } from 'react';
import { useState } from "react";
import { Modal } from '../Layouts/modal';    

export function NovoItem(props){
    const [item, setItem] = useState([{
        codigo:null,
        nome:'',
        principio_ativo_id:'',
        d_tipo:'',
        categoria_id:'',
        considera_lote_validade:false
    }])

    useEffect(()=>{
        if(props.editItem.id != null|| props.editItem.id != undefined){
           setItem([{
                codigo:props.editItem.codigo, 
                nome:props.editItem.nome, 
                principio_ativo_id:props.editItem.principio_ativo_id, 
                d_tipo:props.editItem.d_tipo, 
                categoria_id:props.editItem.categoria_id,
                considera_lote_validade:false,
            }])
       }
       else{
           limparItem()
       }
    },[props.editItem.id])

    function limparItem(){
        setItem([{ codigo:null,nome:'',principio_ativo_id:'',d_tipo:'', categoria_id:'',considera_lote_validade:false}])
    }
    function onAddItem(){
        // setItem([...item, ''])
        setItem([...item,{ codigo:null, nome:'',principio_ativo_id:'',d_tipo:'', categoria_id:'',considera_lote_validade:false}])
    }
    function onSetItem(e,index){
        if(e.target.name === 'd_tipo'){
            item[index].d_tipo = e.target.value;
            setItem([...item])
        }else if(e.target.name === 'categoria_id'){
            item[index].categoria_id = e.target.value;
            setItem([...item])
        }else if(e.target.name === 'codigo'){
            item[index].codigo = e.target.value;
            setItem([...item])
        }else if(e.target.name === 'nome'){
            item[index].nome = e.target.value;
            setItem([...item])
        }else if(e.target.name === 'principio_ativo_id'){
            item[index].principio_ativo_id = e.target.value;
            setItem([...item])
        }
        // else if(e.target.name === 'check'){
        //     item[index].categoria = e;
        //     // setItem([...item])
        // }
        
    }
    function onDeleteItem(position){
        if(item.length > 1){
            setItem([...item.filter((item,index) => index !== position)])
        }else{
            // setItem([...item.filter((item,index) => index !== position)])
            limparItem()
        }
    }

    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparItem()}}
            header='Itens'
            onSave = {()=>props.Save(props.editItem.id,item)}
        >
            
            <CssBaseline />      
                {item?.map((item, index)=>(
                    <Box sx={{flexGrow:1}} key={index} padding='10px' justifyContent='center' alignItems='center' my={2} >
                        <Grid container mb={3}>
                            <Grid item xs={11} container spacing={3}>
                                <Grid item md={1}>
                                    <TextField
                                    value={item.codigo}
                                    id="codigo"
                                    name="codigo"
                                    label="Código"
                                    fullWidth
                                    onChange={(e)=> onSetItem(e,index)}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,  
                                    }}
                                />
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <TextField
                                    value={item.nome}
                                    id="nome"
                                    name="nome"
                                    label="nome"
                                    onChange={(e)=> onSetItem(e,index)}
                                    fullWidth
                                    variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        select
                                        value={item.principio_ativo_id}
                                        id="principioAtivo"
                                        name="principio_ativo_id"
                                        label='Princípio ativo'
                                        onChange={(e)=> onSetItem(e,index)}
                                        fullWidth
                                        autoComplete="shipping address-line2"
                                        variant="outlined"
                                    >
                                        {props.princAtivo.map((princAtivo, index)=>(
                                            <MenuItem  key={index} value={princAtivo.id}>{princAtivo.nome}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>     
                            
                                <Grid item sm={4}>
                                    <TextField
                                        select
                                        value={item.d_tipo}
                                        id="tipo"
                                        name="d_tipo"
                                        label='Tipo'
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=> onSetItem(e,index)}
                                    >
                                        {props.tipo.map((tipo, index)=>(
                                            <MenuItem key={index} value={props.tipo[index].id}>{props.tipo[index].nome}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        select
                                        value={item.categoria_id}
                                        id="categoria"
                                        name="categoria_id"
                                        label='Categoria'
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=> onSetItem(e,index)}
                                    >
                                        {props.categoria.map((categoria, index)=>(
                                            <MenuItem key={index} value={props.categoria[index].id}>{props.categoria[index].nome}</MenuItem>
                                        ))}
                                    </TextField> 
                                </Grid>
                            
                                <Grid item sm={4}>
                                    <FormControl>
                                        <FormControlLabel
                                            name='check'
                                            onChange={(e)=> onSetItem(e.target.checked,index)}
                                            control={<Checkbox />} 
                                            label='Considera lote e validade' />    
                                        </FormControl>   
                                </Grid>
                            </Grid>
                            <Grid item xs={1} display='flex' alignItems='center' justifyContent='center'>
                                <Grid item xs={12} sm={1}>
                                    <IconButton
                                        
                                        onClick={()=>{onDeleteItem(index)}}
                                    >
                                        <ClearIcon sx={{color:'red'}} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider />
                    </Box>
                ))}
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
                

        </Modal>
    )
}