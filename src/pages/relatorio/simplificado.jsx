import AppLayout from "@/components/Layouts/AppLayout"
import { Categoria } from "@/lib/categoria";
import { Itens } from "@/lib/item";
import { PrincAtivo } from "@/lib/princAtivo";
import { Box, Button, Container, CssBaseline, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react";

export default function Relatorio() {
    const [categoria, setCategoria] = useState()
    const [state, setState] = useState({
        categoria:'',
    })
    function gerarRelatorio(){
        const url = `http://reportserver.sms.fortaleza.ce.gov.br:8080/jasperserver/flow.html?j_username=jasperadmin&j_password=jasperadmin&_flowId=viewReportFlow&_flowId=viewReportFlow&standAlone=true&output=pdf&ParentFolderUri=Relat%C3%B3rios/DEMJUR/Din%C3%A2micos&reportUnit=/Relat%C3%B3rios/DEMJUR/Din%C3%A2micos/ESTOQUE_SIMPLIFICADO&CATEGORIA_ID=${state.categoria}`
        const win = window.open(url, 'blank')
        win.focus()
        setState({...state, categoria:''})
    }

    function onLoad(){
        Categoria.getAll()
        .then((result)=>{
            if(result instanceof Error){
                // setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setCategoria(result.data.data)
        });
    }
    useEffect(()=>{
        onLoad();
    },[])
  return (
    <AppLayout>
        <CssBaseline />
            <Container component={Paper}>
                <Box
                    display= 'flex'
                    padding='2px'
                    height='8rem'
                    justifyContent='space-between'
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                    >
                        <Typography variant='h5' component='h1' color='secondary'>
                            Relatório simplificado do estoque
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Grid container spacing={12}>
                        <Grid item xs={12} sm={6} mb={5}>
                            <TextField
                                select
                                variant="outlined"
                                label='Categoria'
                                fullWidth
                                value={state.categoria}
                                name='categoria'
                                onChange={(e)=> setState({...state, categoria:e.target.value})}
                            >
                                {categoria?.map((cat, index)=>(
                                     <MenuItem key={index} value={cat.id}>{cat.nome} </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} mb={5} display='flex' justifyContent='flex-end' alignItems="baseline" >
                            <Button
                                onClick={()=> gerarRelatorio()}
                                variant="contained"
                            >
                                Gerar relatório
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>


    </AppLayout>       
  )
}