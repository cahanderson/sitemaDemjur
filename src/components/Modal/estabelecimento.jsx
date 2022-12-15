import { Box, CssBaseline, Grid, Paper, TextField } from "@mui/material";
import { useEffect,useState } from "react";
import { Modal } from '../Layouts/modal';
import { mask, unMask } from 'remask' 

export function NovoEstabelecimento(props){
    const [state, setState] = useState({
        nome:'',
        telefone:'',
        cnpj:'',
        cep:'',
        rua:'',
        numero:'',
        bairro:'',
        is_beneficiario: false,
        is_prescritor: false,
        is_fornecedor: false,
        is_estabelecimento: true
    })

    useEffect(()=>{
        if(props.editEstabelecimento?.id != null|| props.editEstabelecimento?.id != undefined){
           setState({
                nome:props.editEstabelecimento.nome,
                telefone:props.editEstabelecimento.telefone,
                cnpj:props.editEstabelecimento.cnpj,
                cep:props.editEstabelecimento.cep,
                rua:props.editEstabelecimento.rua,
                numero:props.editEstabelecimento.numero, 
                bairro:props.editEstabelecimento.bairro,
            })
       }
       else{
        limparEstabelecimento()
       }
    },[props.editEstabelecimento?.id])

    function limparEstabelecimento(){
        setState({
            nome:'',
            telefone:'',
            cnpj:'',
            cep:'',
            rua:'',
            numero:'',
            bairro:'',
            is_beneficiario: false,
            is_prescritor: false,
            is_fornecedor: false,
            is_estabelecimento: true
    })
    }
    function checkCep(){
        if(state.cep){
            fetch(`https://viacep.com.br/ws/${state.cep}/json/`).
            then(res => res.json()).
            then(data=>{
                setState({...state, bairro:data.bairro, rua:data.logradouro})
                })
        }else{
            setState({...state, beneficiario:{...state, bairro:'', rua:''}})
        }
    }
    useEffect(()=>{
        if(state.cep && state.cep?.length == 8){
            checkCep()
        }
    },[state.cep])
    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparEstabelecimento()}}
            header='Novo estabelecimento'
            onSave = {()=>{props.Save(state,props.fornecedor?.id),limparEstabelecimento()}}


        >
            <CssBaseline />
            <Box >
                <Box component={Paper} padding='10px' justifyContent='center' alignItems='center'>
                    <Grid container spacing={3} mb={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Nome"
                                value={state.nome}
                                onChange={(e) => setState({...state, nome: e.target.value})}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Telefone'
                                value={state.telefone ? mask(unMask(state.telefone),['(99)99999999','(99)9 99999999']):null}
                                onChange={(e) => setState({...state, telefone:unMask(e.target.value)})}
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="outlined"
                            />
                        </Grid> 
                    </Grid>
                    <Grid container spacing={3} mb={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='CNPJ'
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="outlined"
                                value={state.cnpj ? mask(unMask(state.cnpj),['99.999.999/9999-99']) : null}
                                onChange={(e) => setState({...state, cnpj:unMask(e.target.value)})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="CEP"
                                fullWidth
                                variant="outlined"
                                value={state.cep ? mask(unMask(state.cep),['99.999-999']) : null}
                                onChange={(e) => setState({...state, cep:unMask(e.target.value)})}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                value={state.rua}
                                label="Rua"
                                onChange={(e) => setState({...state, rua:e.target.value})}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                label='Bairro'
                                value={state.bairro}
                                onChange={(e) => setState({...state, bairro:e.target.value})}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                label='Nº'
                                value={state.numero}
                                onChange={(e) => setState({...state, numero:e.target.value})}
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