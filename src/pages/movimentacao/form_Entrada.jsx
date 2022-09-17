import { Box, Button, Grid, IconButton, MenuItem, Paper, TextField, Typography } from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from "react";
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
        <AppLayout>
            <Typography variant='h5' component='h1' color='secondary'>
                Entradas
            </Typography>
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
                            <MenuItem value='doacão'>doacão</MenuItem>
                            <MenuItem value='aquisição'>aquisição</MenuItem>
                            <MenuItem value='empréstimo'>empréstimo</MenuItem>
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
                            <MenuItem></MenuItem>
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
                <Box display='flex' justifyContent='end' my={2}>
                    <Button
                        variant='text'
                        onClick={()=>{onAddItem()}}
                        startIcon={<AddCircleSharpIcon />}
                    >
                        Novo item
                    </Button>
                </Box>            
                
                {item.map((item, index)=>(
                    <Grid key={index} container spacing={3} mb={2}>
                        <Grid item xs={12} sm={4}>
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
                                {data.map((item, index)=>(
                                    <MenuItem key={index} value={item.princAtivo}>{item.princAtivo}</MenuItem>
                                ))}
                            </TextField>    
                        </Grid>
                        
                        <Grid item xs={12} sm={1}>
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

                        <Grid item xs={12} sm={1}>
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

                        <Grid item xs={12} sm={2}>
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

                        <Grid item xs={12} sm={1}>
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
                        <Grid display='flex' item xs={12} sm={1} justifyContent='end'>
                            <IconButton
                                
                                onClick={()=>{onDeleteItem(index)}}
                            >
                                <DeleteOutlineTwoToneIcon />
                            </IconButton>
                        </Grid>
                    </Grid>    
                ))}
                
            </Box>
        </AppLayout>
    )
}