import AppLayout from "@/components/Layouts/AppLayout"
import { Categoria } from "@/lib/categoria";
import { Itens } from "@/lib/item";
import { PrincAtivo } from "@/lib/princAtivo";
import { Box, Button, Container, CssBaseline, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react";

export default function Relatorio() {
    const [categoria, setCategoria] = useState()
    const [principioAtivo, setPrincipioAtivo] = useState()
    const [itens, setItens] = useState()
    const [onRelatorio, setOnRelatorio] = useState(false)
    const [state, setState] = useState({
        categoria:'',
        principioAtivo:'',
        itens:'',
    })
    function gerarRelatorio(){
        if(!onRelatorio){
            const url = `http://reportserver.sms.fortaleza.ce.gov.br:8080/jasperserver/flow.html?j_username=jasperadmin&j_password=jasperadmin&_flowId=viewReportFlow&_flowId=viewReportFlow&standAlone=true&output=pdf&ParentFolderUri=Relat%C3%B3rios/DEMJUR/Din%C3%A2micos&reportUnit=/Relat%C3%B3rios/DEMJUR/Din%C3%A2micos/ESTOQUE_SIMPLIFICADO&CATEGORIA_ID=${state.categoria}`
            const win = window.open(url, 'blank')
            // console.log(url);
            win.focus()
            setState({...state, categoria:''})
        }else{
            const url = `http://reportserver.sms.fortaleza.ce.gov.br:8080/jasperserver/flow.html?j_username=jasperadmin&j_password=jasperadmin&_flowId=viewReportFlow&_flowId=viewReportFlow&standAlone=true&output=pdf&ParentFolderUri=Relat%C3%B3rios/DEMJUR/Din%C3%A2micos&reportUnit=/Relat%C3%B3rios/DEMJUR/Din%C3%A2micos/ESTOQUE_DETALHADO&CATEGORIA_ID=${state.categoria}&ITEM_ID=${state.itens}&PRINCIPIO_ATIVO_ID=${state.principioAtivo}`
            const win = window.open(url, 'blank')
            win.focus()
            setState({...state, categoria:'',itens:'',principioAtivo:''})
        }
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

        PrincAtivo.getAll()
        .then((result)=>{
            if(result instanceof Error){
                // setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setPrincipioAtivo(result.data.data)
        });

        Itens.getAll()
        .then((result)=>{
            if(result instanceof Error){
                // setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setItens(result.data.data)
        });
    }
    useEffect(()=>{
        onLoad();
    },[])
    console.log(onRelatorio);
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
                            {onRelatorio?"Relatório detalhado do estoque":"Relatório simplificado do estoque"}
                        </Typography>
                    </Box>

                    <Box alignItems='center' display='flex'>
                        <Button
                        variant="outlined"
                            onClick={() => {setOnRelatorio(!onRelatorio)}} 
                        >
                            {onRelatorio ? "Relatório simplificado do estoque" : "Relatório detalhado do estoque"}
                        </Button>
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
                        {onRelatorio? 
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    variant="outlined"
                                    label='Item'
                                    fullWidth
                                    value={state.itens}
                                    name='itens'
                                    onChange={(e)=> setState({...state,itens:e.target.value})}
                                >
                                    {itens?.map((item, index)=>(
                                        <MenuItem key={index} value={item.id}>{item.nome} </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            :
                            <Grid item xs={12} sm={6} display='flex'justifyContent='end' alignItems='baseline' >
                                <Button
                                    onClick={()=> gerarRelatorio()}
                                    variant="contained"
                                >
                                    Gerar relatório
                                </Button>
                            </Grid>
                        }
                    </Grid>
                    {onRelatorio?
                    <Grid container spacing={12}>
                        <Grid item xs={12} sm={6} mb={5}>
                            <TextField
                                select
                                variant="outlined"
                                label='Principio ativo'
                                fullWidth
                                value={state.principioAtivo}
                                name='principioAtivo'
                                onChange={(e)=> setState({...state,principioAtivo:e.target.value})}
                            >
                                {principioAtivo?.map((princ, index)=>(
                                     <MenuItem key={index} value={princ.id}>{princ.nome} </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} display='flex' alignItems='baseline' justifyContent='end'>
                            <Button
                                onClick={()=> gerarRelatorio()}
                                variant="contained"
                            >
                                Gerar relatório
                            </Button>
                        </Grid>
                    </Grid>
                    :
                    null
                }

                </Box>
            </Container>


    </AppLayout>       
  )
}