import { Alert, Box, CssBaseline, Grid, MenuItem, Paper, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { Modal } from '../Layouts/modal';   

export function NovoItem(props){

    const [state, setState] = useState({
        id:Date.now(),
        item_id:'',
        lote:'',
        data_validade:'',
        fator_embalagem:'',
        qtd_atual:'',
        valor_atual:'',
        novoItem:true,
    })
    function limparFornecedor(){
        setState({
            id:Date.now(),
            item_id:'',
            lote:'',
            data_validade:'',
            fator_embalagem:'',
            qtd_atual:'',
            valor_atual:'',
            novoItem:true,
        })
    }
    const [retornoUsuario,setRetornoUsuario] = useState({
        openSnakebar:false,
        statusSnake:'success',
        message:'',
    })
    function closeSnakebar(){
        setRetornoUsuario({...retornoUsuario, openSnakebar:false})
    }
    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparFornecedor()}}
            header='Novo Item'
            onSave = {()=>{props.Save(state)}}
        >
            <CssBaseline />
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
                <Box component={Paper} padding='10px' justifyContent='center' alignItems='center'>
                <Grid item xs={12} container spacing={3}>
                    <Grid item xs={12} sm={9}>
                        <TextField
                            value={state.item_id}
                            select
                            name="item_id"
                            label='Item'
                            fullWidth
                            variant="outlined"
                            onChange={(e)=> setState({...state, item_id:e.target.value})}
                        >
                            {props.itens?.map((i, index)=>(
                                <MenuItem key={index} value={i.id}>{i.nome}</MenuItem>
                            ))}
                        </TextField>    
                    </Grid>
                    
                    <Grid item xs={12} sm={3}>
                        <TextField
                            value={state.data_validade}
                            type='date'
                            name="data_validade"
                            label='Data de validade'
                            fullWidth
                            variant="outlined"
                            onChange={(e)=> setState({...state, data_validade:e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={3} my={1}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            value={state.fator_embalagem}
                            name="fator_embalagem"
                            label='Fator emb'
                            fullWidth
                            variant="outlined"
                            onChange={(e)=> setState({...state, fator_embalagem:e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField
                            value={state.qtd_atual}
                            name="qtd_atual"
                            label='Quantidade'
                            fullWidth
                            variant="outlined"
                            onChange={(e)=> setState({...state, qtd_atual:e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField
                            value={state.lote}
                            name="lote"
                            label='Lote'
                            fullWidth
                            variant="outlined"
                            onChange={(e)=> setState({...state, lote:e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField
                            value={state.valor_atual}
                            name="valor_atual"
                            label='Valor'
                            fullWidth
                            variant="outlined"
                            onChange={(e)=> setState({...state, valor_atual:e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>                
                </Box>
            </Box>

        </Modal>
    )
}