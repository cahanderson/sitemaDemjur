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
    const [retornoUsuario,setRetornoUsuario] = useState({
        openSnakebar:false,
        statusSnake:'success',
        message:'',
    })
    const [state, setState] = useState({
        categoria:'',
        principioAtivo:'',
        itens:'',
    })
    function gerarRelatorio(){
            const url = `http://reportserver.sms.fortaleza.ce.gov.br:8080/jasperserver/flow.html?j_username=jasperadmin&j_password=jasperadmin&_flowId=viewReportFlow&_flowId=viewReportFlow&standAlone=true&output=pdf&ParentFolderUri=Relat%C3%B3rios/DEMJUR/Din%C3%A2micos&reportUnit=/Relat%C3%B3rios/DEMJUR/Din%C3%A2micos/ESTOQUE_DETALHADO&CATEGORIA_ID=${state.categoria}&ITEM_ID=${state.itens}&PRINCIPIO_ATIVO_ID=${state.principioAtivo}`
            const win = window.open(url, 'blank')
            win.focus()
            setState({...state, categoria:'',itens:'',principioAtivo:''})
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
    function closeSnakebar(){
        setRetornoUsuario({...retornoUsuario, openSnakebar:false})
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
                        Relat??rio detalhado do estoque
                    </Typography>
                </Box>
            </Box>
            <Snackbar 
                open={retornoUsuario.openSnakebar} 
                autoHideDuration={3000} 
                onClose={closeSnakebar}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "top",
                }}
            >
                <Alert onClose={closeSnakebar} severity={retornoUsuario.statusSnake} sx={{ width: '100%' }}>
                    {retornoUsuario.message}
                </Alert>
            </Snackbar>
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
                </Grid>
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
                            Gerar relat??rio
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </AppLayout>       
  )
}