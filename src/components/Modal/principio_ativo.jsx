import { Box, CssBaseline, Grid, Paper, TextField } from "@mui/material";
import { useEffect,useState } from "react";
import { Modal } from '../Layouts/modal';   

export function NovoPrincipioAtivo(props){
    const [state, setState] = useState({
        nome:'',
    })

    useEffect(()=>{
        if(props.editPrincipioAtivo?.id != null|| props.editPrincipioAtivo?.id != undefined){
           setState({
                nome:props.editPrincipioAtivo.nome,
            })
       }
       else{
        limparPrincipioAtivo()
       }
    },[props.editPrincipioAtivo?.id])
    function limparPrincipioAtivo(){
        setState({
        nome:'',
        })
    }
    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparPrincipioAtivo()}}
            header='Novo Principio ativo'
            onSave = {()=>{props.Save(state,props.editPrincipioAtivo?.id), limparPrincipioAtivo()}}
        >
            <CssBaseline />
            <Box>
                <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' >
                    <Grid container spacing={3} mb={4}>
                        <Grid item xs={12} sm={12}>
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