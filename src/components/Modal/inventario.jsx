import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { Box, Button, Checkbox, CssBaseline, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Modal } from '../Layouts/modal';


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

    }
];    

export function NovoInventario(props){
    const [state, setState] = useState({
        codigo:'',
        descricao:'',
        princAtivo:'',
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
            header='Itens'
            // onSave = {()=>props.onSave(props.usuario.id,state)}
            //enviando informações para o botão save

        >
            <CssBaseline />
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mt={2}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                        type='date'
                        id="data"
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
                <Box display='flex' justifyContent='end'my={1}>
                    {/* <Typography variant='h5' component='h1' my={3}>
                        Itens
                    </Typography> */}
                    <Button
                        variant='text'
                        onClick={()=>{onAddItem()}}
                    >
                        <Box mr='10px' mt='4px'>
                            <AddCircleSharpIcon />
                        </Box>
                        Novo item
                    </Button>
                </Box>            
                
                {item.map((item, index)=>(
                    <Grid key={index} container spacing={3} mb={5}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                value={item.tipo}
                                id="itens"
                                name="itens"
                                label='Itens'
                                fullWidth
                                variant="outlined"
                                onChange={(e)=> onSetItem(e,index)}
                            >
                                {data.map((item, index)=>(
                                    <MenuItem key={index} value={item.princAtivo}>{item.princAtivo}</MenuItem>
                                ))}
                            </TextField>    
                        </Grid>
                        
                        <Grid item xs={12} sm={2}>
                            <TextField
                                select
                                value={item.FreqEntrega}
                                id="categoria"
                                name="categoria"
                                label='Qtd anterior'
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
                                value={item.FreqEntrega}
                                id="categoria"
                                name="categoria"
                                label='Qtd atual'
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
                                value={item.FreqEntrega}
                                id="categoria"
                                name="categoria"
                                label='valor atual'
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
                                value={item.FreqEntrega}
                                id="categoria"
                                name="categoria"
                                label='Dif.Qtd'
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
                                value={item.FreqEntrega}
                                id="categoria"
                                name="categoria"
                                label='Dif.valor'
                                fullWidth
                                variant="outlined"
                                onChange={(e)=> onSetItem(e,index)}
                                InputLabelProps={{
                                    shrink: true,  
                                }}
                            />
                        </Grid>        

                        <Grid display='flex' item xs={12} sm={8} justifyContent='end'>
                        <IconButton
                            
                            onClick={()=>{onDeleteItem(index)}}
                        >
                            <DeleteOutlineTwoToneIcon />
                        </IconButton>
                        </Grid>
                        <Divider/>
                    </Grid>
                ))}
                
            </Box>

        </Modal>
    )
}