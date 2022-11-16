import { Box, CssBaseline, Grid, Paper, TextField } from "@mui/material";
import { useEffect,useState } from "react";
import { Modal } from '../Layouts/modal';   
import { mask, unMask } from 'remask'

export function NovoFornecedor(props){
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
    useEffect(()=>{
        if(props.fornecedor?.id != null|| props.fornecedor?.id != undefined){
           setState({
                nome:props.fornecedor.nome,
                email:props.fornecedor.email, 
                telefone:props.fornecedor.telefone,
                cpf:props.fornecedor.cpf,
                cnpj:props.fornecedor.cnpj,
                cep:props.fornecedor.cep,
                rua:props.fornecedor.rua,
                numero:props.fornecedor.numero, 
                bairro:props.fornecedor.bairro,
            })
       }
       else{
        limparFornecedor()
       }
    },[props.fornecedor?.id])
    // function checkCep(){
    //     if(state.cep){
            
    //         setState(state.cep?.replace(/\D/g, ''))
    //         fetch(`https://viacep.com.br/ws/${state?.cep}/json/`).
    //         then(res => res.json()).
    //         then(data=>{
    //             setState({
    //                 ...state, 
    //                 bairro:data.bairro, 
    //                 rua:data.logradouro
    //             })
    //         })
    //     }
    // }
    function checkCep(){
        if(state.cep){
            fetch(`https://viacep.com.br/ws/${state.cep}/json/`).
            then(res => res.json()).
            then(data=>{
                setState({...state, bairro:data.bairro, rua:data.logradouro})
                })
        }else{
            setState({...state, rua:'',bairro:''})
        }
    }
    useEffect(()=>{
        if(state.cep.length == 8){
            checkCep()
        }
    },[state.cep])
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
        "is_beneficiario": false,
        "is_prescritor": false,
        "is_fornecedor": true})
    }
    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparFornecedor()}}
            header='Novo Fornecedor'
            onSave = {()=>{props.Save(state,props.fornecedor?.id),console.log(state);}}

        >
            <CssBaseline />
            <Box >
                <Box component={Paper} padding='10px' justifyContent='center' alignItems='center'>
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
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="cpf"
                                label='CPF'
                                value={mask(unMask(state.cpf),['999.999.999-99'])}
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="outlined"
                                onChange={(e) => setState({...state, cpf:unMask(e.target.value)})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="cnpj"
                                name="cnpj"
                                label='CNPJ'
                                value={mask(unMask(state.cnpj),['99.999.999/9999-99'])}
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="outlined"
                                onChange={(e) => setState({...state, cnpj:unMask(e.target.value)})}
                            />
                        </Grid>  
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="telefone"
                                name="telefone"
                                label='Telefone'
                                value={mask(unMask(state.telefone),['(99)99999999','(99)9 99999999'])}
                                onChange={(e) => setState({...state, telefone:unMask(e.target.value)})}
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="outlined"
                            />
                        </Grid>  
                        
                    </Grid>
                    <Grid container spacing={3}mb={4}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                value={mask(unMask(state.cep),['99.999-999'])}
                                id="cep"
                                name="cep"
                                label="CEP"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setState({...state, cep:unMask(e.target.value)})}
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