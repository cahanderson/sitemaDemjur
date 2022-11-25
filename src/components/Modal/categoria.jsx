import { Box, CssBaseline, Grid, Paper, TextField } from "@mui/material";
import { useEffect,useState } from "react";
import { Modal } from '../Layouts/modal';   

export function NovaCategoria(props){
    const [state, setState] = useState({
        nome:'',
    })

    useEffect(()=>{
        if(props.editCategoria?.id != null|| props.editCategoria?.id != undefined){
           setState({
                nome:props.editCategoria.nome,
            })
       }
       else{
        limparFornecedor()
       }
    },[props.editCategoria?.id])
    function limparFornecedor(){
        setState({
        nome:'',
        })
    }
    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparFornecedor()}}
            header='Nova Categoria'
            onSave = {()=>{props.Save(state,props.editCategoria?.id),limparFornecedor()}}

        >
            <CssBaseline />
            <Box >
                <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' >
                    <Grid container spacing={3} mb={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="nome"
                                name="nome"
                                label="Nome"
                                value={state.nome}
                                onChange={(e) => setState({...state, nome: e.target.value})}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Modal>
    )
}