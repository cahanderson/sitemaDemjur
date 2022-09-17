import { Box, CssBaseline, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { Modal } from '../Layouts/modal';   

export function NovoFornecedor(props){
    const [state, setState] = useState({
        nome:'',
        email:'',
        telefone:'',
        cpfCnpj:'',
        cep:'',
        rua:'',
        numero:'',
        bairro:'',
    })

    function checkCep(){
        if(state.cep){
            
            setState(state.cep?.replace(/\D/g, ''))
            fetch(`https://viacep.com.br/ws/${state?.cep}/json/`).
            then(res => res.json()).
            then(data=>{
                setState({
                    ...state, 
                    bairro:data.bairro, 
                    rua:data.logradouro
                })
            })
        }else{
            setState({...state, rua:'',bairro:''})
        }
    }

    return(
        <Modal
            open={props.openModal}
            onClose={()=>props.onClose()}
            header='Novo Fornecedor'
            onSave = {()=>props.Save(state)}
            //enviando informações para o botão save

        >
            <CssBaseline />
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' >
                <Grid container spacing={3} mb={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                        id="nome"
                        name="nome"
                        label="Nome"
                        onChange={(e) => setState({...state, nome: e.target.value})}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,  
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                        id="email"
                        name="email"
                        label="E-mail"
                        onChange={(e) => setState({...state, email: e.target.value})}
                        fullWidth
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                        id="cnpj"
                        name="cnpj"
                        label='CNPJ'
                        onChange={(e) => setState({...state, cpfCnpj: e.target.value})}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                        id="telefone"
                        name="telefone"
                        label='Telefone'
                        onChange={(e) => setState({...state, telefone: e.target.value})}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="outlined"
                        />
                    </Grid>  
                    
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                        <TextField
                        onBlur={()=>checkCep()}
                        id="cep"
                        name="cep"
                        label="CEP"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, cep:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                        id="rua"
                        name="rua"
                        value={state.rua}
                        label="Rua"
                        onChange={(e) => setState({...state, rua: e.target.value})}
                        fullWidth
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <TextField
                        id="numero"
                        name="numero"
                        label='Nº'
                        onChange={(e) => setState({...state, numero: e.target.value})}
                        value={state.numero}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                        id="bairro"
                        name="bairro"
                        label='Bairro'
                        onChange={(e) => setState({...state, bairro: e.target.value})}
                        value={state.bairro}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="outlined"
                        />
                    </Grid>  
                </Grid>
                
            </Box>

        </Modal>
    )
}