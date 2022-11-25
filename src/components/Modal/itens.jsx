import { useEffect, useState } from 'react';
import { Autocomplete, Box, Checkbox, createFilterOptions, CssBaseline, FormControl, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Modal } from '../Layouts/modal';    
import { PrincAtivo } from '../../lib/princAtivo';
import { Categoria } from '../../lib/categoria';

export function NovoItem(props){
    const filter = createFilterOptions();
    const [dataPrincAtivo, setDataPrincAtivo] = useState({})
    const [valuePrincAtivo, setValuePrincAtivo] = useState(null)
    const [dataCategoria, setDataCategoria] = useState({})
    const [valueCategoria, setValueCategoria] = useState(null)
    const [id, setId] = useState(null)
    const [item, setItem] = useState({
        nome:'',
        principio_ativo_id:null,
        d_tipo:'',
        categoria_id:'',
        considera_lote_validade:false,
    })
    function limparItem(){
        setItem({nome:'',principio_ativo_id:'',d_tipo:'', categoria_id:'',considera_lote_validade:false})
        setId('')
        setDataPrincAtivo('')
        setDataCategoria('')
    }
    useEffect(()=>{
        if(props.editItem?.id != null|| props.editItem?.id != undefined){
           setItem({
                id:props.editItem.id,
                nome:props.editItem.nome, 
                principio_ativo_id:props.editItem.principio_ativo_id, 
                d_tipo:props.editItem.d_tipo, 
                categoria_id:props.editItem.categoria_id,
                considera_lote_validade:props.editItem.considera_lote_validade
            })
            setId(props.editItem.id)

            PrincAtivo.getById(props.editItem.principio_ativo_id).
            then((result)=>{
                setDataPrincAtivo(result.data)
            })

            Categoria.getById(props.editItem.categoria_id).
            then((result)=>{
                setDataCategoria(result.data)
            })
        }else{
           limparItem()
       }
    },[props.editItem?.id])

    useEffect(()=>{
       if(dataPrincAtivo.id){
        setValuePrincAtivo({id:dataPrincAtivo.id, nome:dataPrincAtivo.nome})
       }else{
        setValuePrincAtivo(null)
       }
    },[dataPrincAtivo])

    useEffect(()=>{
        if(dataCategoria.id){
            setValueCategoria({id:dataCategoria.id, nome:dataCategoria.nome})
       }else{
            setValueCategoria(null)
       }
    },[dataCategoria])

    useEffect(()=>{
        if(props.newPrincAtivo){
            setItem({...item, principio_ativo_id:props.newPrincAtivo})
        }
    },[props.newPrincAtivo])
    console.log(props.categoria);

    useEffect(()=>{
        if(props.newCategoria){
            setItem({...item,categoria_id:props.newCategoria})
        }
    },[props.newCategoria])

    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparItem()}}
            header='Itens'
            onSave = {()=>{props.Save(id,item),limparItem()}}
        >
            
            <CssBaseline />      
                <Box sx={{flexGrow:1}} padding='10px' justifyContent='center' alignItems='center' my={2} >
                    <Grid item xs={12} container spacing={3}mb={3}>
                        <Grid item md={1}>
                            <Typography align='center'>Código</Typography>
                            <Typography align='center'>{id}</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                            value={item.nome}
                            id="nome"
                            name="nome"
                            label="nome"
                            onChange={(e)=> setItem({...item,nome: e.target.value})}
                            fullWidth
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item md={7}>
                            <Autocomplete
                                value={valuePrincAtivo}
                                onChange={(_, newValue) => {
                                    if (typeof newValue === 'string') {
                                        setItem({...item, principio_ativo_id: newValue.id})
                                    } else if (newValue && newValue.inputValue) {
                                        props.addPrincAtivo({"nome":newValue.inputValue})
                                    } 
                                    else { 
                                        setItem({...item, principio_ativo_id: newValue?.id})
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    const { inputValue } = params;
                                    const isExisting = options.some((option) => inputValue === option.nome);
                                    if (inputValue !== '' && !isExisting) {
                                        filtered.push({
                                            inputValue,
                                            nome: `Adicionar princípio ativo : "${inputValue}"`,
                                        });
                                    }
                                    return filtered;
                                }}
                                selectOnFocus
                                handleHomeEndKeys
                                id="free-solo-with-text-demo"
                                options={props.princAtivo}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option.nome === 'string') {
                                    return option.nome;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                    return option.inputValue;
                                    }
                                    // Regular option
                                    return option.nome;
                                }}
                                renderOption={(props, option) => <li {...props}>{option.nome}</li>}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} 
                                        label="Principio Ativo" 
                                        onChange={(e)=>props.searchPrincAtivo({nome:e.target.value})}
                                    />

                                )}
                            />
                        </Grid>
                    
                        <Grid item sm={6}>
                            <TextField
                                select
                                value={item.d_tipo}
                                name="d_tipo"
                                label='Tipo'
                                fullWidth
                                variant="outlined"
                                onChange={(e)=> setItem({...item, d_tipo: e.target.value})}
                            >
                                {props.tipo?.map((tipo, index)=>(
                                    <MenuItem key={index} value={tipo.valor}>{tipo.descricao}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item sm={6}>
                            <Autocomplete
                                value={valueCategoria}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                        setItem({...item, categoria_id: newValue.id})
                                    } else if (newValue && newValue.inputValue) {
                                        props.addCategoria({"nome":newValue.inputValue})
                                    } else {
                                    setItem({...item, categoria_id: newValue?.id})
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    const { inputValue } = params;
                                    const isExisting = options.some((option) => inputValue === option.nome);
                                    if (inputValue !== '' && !isExisting) {
                                        filtered.push({
                                            inputValue,
                                            nome: `Adicionar categoria : "${inputValue}"`,
                                        });
                                    }
                                    return filtered;
                                }}
                                selectOnFocus
                                handleHomeEndKeys
                                options={props.categoria}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option.nome === 'string') {
                                    return option.nome;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                    return option.inputValue;
                                    }
                                    // Regular option
                                    return option.nome;
                                }}
                                renderOption={(props, option) => <li {...props}>{option.nome}</li>}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} 
                                        label="Categoria" 
                                        onChange={(e)=>props.searchCategoria({nome:e.target.value})}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container spacing={3}>
                        <Grid item sm={4}>
                            <FormControl>
                                <FormControlLabel
                                    name='check'
                                    onChange={(e)=> setItem({...item, considera_lote_validade: e.target.checked})}
                                    control={<Checkbox />} 
                                    label='Considera lote e validade' />    
                                </FormControl>   
                        </Grid>
                    </Grid>
                </Box>
                

        </Modal>
    )
}