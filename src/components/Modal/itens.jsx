import { useEffect, useMemo,useState } from 'react';
import { Autocomplete, Box, Checkbox, createFilterOptions, CssBaseline, FormControl, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Modal } from '../Layouts/modal';    

export function NovoItem(props){
    const filter = createFilterOptions();
    const [opcaoCategoria, setOpcaoCategoria] = useState()
    const [opcaoPrincAtivo, setOpcaoPrincAtivo] = useState()
    const [id, setId] = useState(null)
    const [item, setItem] = useState({
        nome:'',
        principio_ativo_id:'',
        d_tipo:'',
        categoria_id:'',
        considera_lote_validade:false,
    })
    
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
       }
       else{
           limparItem()
       }
    },[props.editItem?.id])

    useEffect(()=>{
       if(props.categoria){
        setOpcaoCategoria(props.categoria.map(cat=>({id:cat.id, label:cat.nome})))
        setOpcaoPrincAtivo(props.princAtivo.map(princ=>({id:princ.id, label:princ.nome})))
       } 
    },[props.categoria, props.princAtivo])

    useEffect(()=>{
        if(props.newPrincAtivo){
            setItem({...item, principio_ativo_id:props.newPrincAtivo})
        }
    },[props.newPrincAtivo])
    
    //Use memo para popular valor dos AutoComplete's
    const autoCompleteOptionCategoria = useMemo(()=>{
        if(!opcaoCategoria) return null
        const selectedCategoria = opcaoCategoria.find(opcao => opcao.id === item.categoria_id);
        if(!selectedCategoria) return null
        return selectedCategoria;

    },[item.categoria_id]);

    const autoCompleteOptionPrincAtivo = useMemo(()=>{
        if(!opcaoPrincAtivo) return null
        const selectedPrincAtivo = opcaoPrincAtivo.find(opcao => opcao.id === item.principio_ativo_id);
        if(!selectedPrincAtivo) return null
        return selectedPrincAtivo;

    },[item.principio_ativo_id]);

    function limparItem(){
        setItem({nome:'',principio_ativo_id:'',d_tipo:'', categoria_id:'',considera_lote_validade:false})
        setId('')
    }
    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparItem()}}
            header='Itens'
            onSave = {()=>props.Save(id,item)}
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
                                value={autoCompleteOptionPrincAtivo}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                        setItem({...item, principio_ativo_id: newValue.id})
                                    } else if (newValue && newValue.inputValue) {
                                        props.addPrincAtivo({"nome":newValue.inputValue})
                                    } else {
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
                                            label: `Adicionar princípio ativo : "${inputValue}"`,
                                        });
                                    }
                                    return filtered;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                options={opcaoPrincAtivo}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option.label === 'string') {
                                    return option.label;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                    return option.inputValue;
                                    }
                                    // Regular option
                                    return option.label;
                                }}
                                renderOption={(props, option) => <li {...props}>{option.label}</li>}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} label="Principio Ativo" />
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
                            {/* <Autocomplete
                                onChange={(event, newValue) => {
                                    setItem({...item, categoria_id: newValue.id})
                                }}
                                value={autoCompleteOptionCategoria}
                                freeSolo
                                options={opcaoCategoria}
                                renderInput={(params) => <TextField {...params} label="Categoria" />}
                            />  */}

                            <Autocomplete
                                value={autoCompleteOptionCategoria}
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
                                            label: `Adicionar categoria : "${inputValue}"`,
                                        });
                                    }
                                    return filtered;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                options={opcaoCategoria}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option.label === 'string') {
                                    return option.label;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                    return option.inputValue;
                                    }
                                    // Regular option
                                    return option.label;
                                }}
                                renderOption={(props, option) => <li {...props}>{option.label}</li>}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} label="Categoria" />
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