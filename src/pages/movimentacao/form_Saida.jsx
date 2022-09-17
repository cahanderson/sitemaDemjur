import { Box, Button, Grid, IconButton, MenuItem, Paper, TextField, Typography } from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from "react";
import Label from "@/components/Label";
import { Dispensacao } from "@/components/Modal/dispensacao";
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

export default function Saidas(){

    const [state, setState] = useState({
        codigo:'',
        descricao:'',
        princAtivo:'',
        openModal: false,
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
                Saidas
            </Typography>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mt={2}>
                <Grid container spacing={3} mb={1}>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            select
                            id="tipo_Saida"
                            name="tipo_Saida"
                            label="Tipo de saída"
                            fullWidth
                            variant="outlined"
                        >
                            <MenuItem></MenuItem>
                            {/* <MenuItem value='doacão'>Perca por validade</MenuItem>
                            <MenuItem value='aquisição'>Doação</MenuItem>
                            <MenuItem value='empréstimo'>Empréstimo</MenuItem>
                            <MenuItem value='empréstimo'>Outras percas</MenuItem> */}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            select
                            id="destinoSaida"
                            name="destinoSaida"
                            label='Destino da saída'
                            fullWidth
                            variant="outlined"
                        >
                            <MenuItem></MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            type='date'
                            id="dtMovimentacao"
                            name="dtMovimentacao"
                            label='Data da movimentacao'
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>    
                <Grid container spacing={3} my={1} mb={2} justifyContent='start'>
                    <Grid item xs={12} sm={1} >
                        {/* <Typography>Documento da dispensação</Typography> */}
                        <Button
                            variant="outlined" 
                            component="label"
                            startIcon={<AttachFileIcon />}
                        >
                            Anexar
                            <input hidden multiple type="file" />
                        </Button>
                    </Grid>     
                </Grid>    
                <Box display='flex' justifyContent='end'>
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                id="tipo"
                                name="tipo"
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
                                id="qtdSaida"
                                name="qtdSaida"
                                label='Qtd Saida'
                                fullWidth
                                variant="outlined"
                                onChange={(e)=> onSetItem(e,index)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={1} mt='6px'>
                            <Button
                                variant="outlined"
                                onClick={() => {setState({...state, openModal:true})}}
                            >
                                Dispensação
                            </Button>
                        </Grid>
                        <Grid display='flex' item xs={12} sm={1} justifyContent='end' alignContent='center' mb={1}>
                            <IconButton
                                
                                onClick={()=>{onDeleteItem(index)}}
                            >
                                <DeleteOutlineTwoToneIcon />
                            </IconButton>
                        </Grid>
                    </Grid>    
                ))}
               <Dispensacao
                    openModal={state.openModal} 
                    onClose={() => setState({...state, openModal: false})} 
                    onSave = {(id,data)=> onSave(id,data)}
                /> 
            </Box>
        </AppLayout>
    )
}