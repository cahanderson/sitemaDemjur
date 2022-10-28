import { Box, CssBaseline, Grid, Paper, TextField } from "@mui/material";
import { useEffect,useState } from "react";
import { Modal } from '../Layouts/modal';   

export function NovoFornecedor(props){

            // "estoque_item_id": null,
            // "id": null,
            // "item_id": 27,
            // "lote": "XYZ0001",
            // "valor_anterior": 10,
            // "qtd_anterior": 250,
            // "valor_atual": 65.0,
            // "qtd_atual": 10

    const [state, setState] = useState({
        nome:'',
        email:'',
        telefone:'',
        cpf:'',
        cnpj:'',
        cep:'',
        rua:'',
        numero:'',
        bairro:'',
        "is_beneficiario": false,
        "is_prescritor": false,
        "is_fornecedor": true
    })
    function checkCep(){
        if(state.cep){
            setState(state.cep?.replace(/\D/g, ''))
            fetch(`https://viacep.com.br/ws/${state.cep}/json/`).
            then(res => res.json()).
            then(data=>{
                setState({...state, bairro:data.bairro, rua:data.logradouro, cnpj:''})
                })
        }else{
            setState({...state, rua:'',bairro:'',cnpj:''})
        }
    }
    function limparFornecedor(){
        setState({
            nome:'',
            email:'',
            telefone:'',
            cpf:'',
            cnpj:'',
            cep:'',
            rua:'',
            numero:'',
            bairro:'',
        })
    }
    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparFornecedor()}}
            header='Novo Item'
            onSave = {()=>{props.Save(state,props.fornecedor?.id)}}

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
                        <Grid item xs={12} sm={6}>
                            <TextField
                            id="email"
                            name="email"
                            label="E-mail"
                            value={state.email}
                            onChange={(e) => setState({...state, email: e.target.value})}
                            fullWidth
                            variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} mb={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            id="cnpj"
                            name="cnpj"
                            label='CNPJ'
                            value={state.cnpj}
                            onChange={(e) => setState({...state, cnpj: e.target.value})}
                            fullWidth
                            autoComplete="shipping address-line2"
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            id="telefone"
                            name="telefone"
                            label='Telefone'
                            // value={mask(state.telefone,['(99)99999999','(99)9 99999999'])}
                            value={state.telefone}
                            onChange={(e) => setState({...state, telefone: e.target.value})}
                            fullWidth
                            autoComplete="shipping address-line2"
                            variant="outlined"
                            />
                        </Grid>  
                        
                    </Grid>
                    <Grid container spacing={3}mb={4}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            value={state.cep}
                            onBlur={()=>checkCep()}
                            id="cep"
                            name="cep"
                            label="CEP"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, cep:e.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                            id="rua"
                            name="rua"
                            value={state.rua}
                            label="Rua"
                            onChange={(e) => setState({...state, rua:e.target.value})}
                            fullWidth
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                            id="numero"
                            name="numero"
                            label='Nº'
                            value={state.numero}
                            onChange={(e) => setState({...state, numero:e.target.value})}
                            fullWidth
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                            id="bairro"
                            name="bairro"
                            label='Bairro'
                            value={state.bairro}
                            onChange={(e) => setState({...state, bairro:e.target.value})}
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