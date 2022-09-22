import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Checkbox, CssBaseline, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Modal } from '../Layouts/modal';    

export function NovoInventario(props){
    const [state, setState] = useState({
        codigo:'',
        descricao:'',
        princAtivo:'',
        data:[],
    })
    const [item, setItem] = useState([{
        tipo:'',
        categoria:'',
        loteEValidade:false
    }])

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
            console.log('teste');
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


    return(
        <Modal
            open={props.openModal}
            onClose={()=>props.onClose()}
            header='Inventário'
            // onSave = {()=>props.onSave(props.usuario.id,state)}
            //enviando informações para o botão save

        >
            <CssBaseline />
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mt={2}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                        type='date'
                        name="data"
                        label="Data"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,  
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                        id="princAtivo"
                        name="princAtivo"
                        label='Responsável'
                        fullWidth
                        placeholder='Usuário responsável pelo inventário'
                        autoComplete="shipping address-line2"
                        variant="outlined"
                        />
                    </Grid>  
                </Grid>            
                
                {item.map((itens, index)=>(
                    <Grid key={index} container my={3}>
                        <Grid item xs={11} container spacing={3}>
                            <Grid item xs={5}>
                                <TextField
                                    // value={itens.item_id}
                                    name="item_id"
                                    label='Itens'
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e)=> onSetItem(e,index)}
                                    // {...register(`itens.${index}.item_id`)}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <TextField
                                // value={itens.quantidade_mensal}
                                id="quantidade_mensal"
                                name="quantidade_mensal"
                                label='Quantidade anterior'
                                fullWidth
                                variant="outlined"
                                onChange={(e)=> onSetItem(e,index)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                // {...register(`itens.${index}.quantidade_mensal`)}
                            />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    // value={itens.d_frequencia_entrega}
                                    // select
                                    id='d_frequencia_entrega'
                                    name="d_frequencia_entrega"
                                    label='Quantidade Atual'
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e)=> onSetItem(e,index)}
                                    // {...register(`itens.${index}.d_frequencia_entrega`)}
                                >
                                    {/* {freq.map((f, index)=>(
                                    <MenuItem key={index} value={f.descricao}>{f.descricao}</MenuItem>
                                    ))} */}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="quantidade_limite"
                                    name="quantidade_limite"
                                    label='Valor atual'
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e)=> onSetItem(e,index)}
                                    // {...register(`itens.${index}.quantidade_limite`)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="quantidade_limite"
                                    name="quantidade_limite"
                                    label='Diferença de quantidade'
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e)=> onSetItem(e,index)}
                                    // {...register(`itens.${index}.quantidade_limite`)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="quantidade_limite"
                                    name="quantidade_limite"
                                    label='Diferença de valor'
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e)=> onSetItem(e,index)}
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