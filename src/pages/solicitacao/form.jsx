import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Box, Button, CssBaseline, Divider, Grid, IconButton, MenuItem, Paper, TextField, Typography } from "@mui/material";
import useSolicitacaoStore from "@/hooks/solicitacao";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ClearIcon from '@mui/icons-material/Clear';
import AppLayout from "@/components/Layouts/AppLayout";
import { Solicitacao } from "@/lib/solicitacao";
import { NovoPrescritor } from "@/components/Modal/novoPrescritor";
import { Itens } from "@/lib/item";


export default function NovaSolicitacao(){
    const router = useRouter();
    const [estabelecimento, setEstabelecimento] = useState([''])
    const [acao, setAcao] = useState(['']);
    const [representante, setRepresentante] = useState(['']);
    const [reu, setReu] = useState(['']);
    const [cid, setCid] = useState(['']);
    const [prescritor, setPrescritor] = useState(['']);
    const [sexo, setSexo] = useState([''])
    const [freq, setFreq] = useState([''])
    const [dataItens, setDataItens] = useState([''])
    const [openModal, setOpenModal] = useState(false)
    const [state, setState] = useState({
        numero_solicitacao: '',
        d_tipo: '',
        d_representante_legal: '',
        vara: '',
        juiz:'',
        reu_acao:'',
        data_entrada:'',
        cid_id:'',
        estabelecimento_id:'',
        prescritor_id:'',
        local_tratamento:'',
        data_atendimento:'',
        beneficiario: {
            id:null,
            cpf:'',
            nome:'',
            nome_mae:'',
            data_nascimento:'',
            rg:'',
            cns:'',
            telefone:'',
            email:'',
            d_sexo:'',
            cep:'',
            rua:'',
            numero:'',
            bairro:'',
            complemento:''
        },
        itens: [
            {
                item_id: '',
                quantidade_mensal: '',
                d_frequencia_entrega: '',
                quantidade_limite: ''
            }
        ]
    })
    const [pessoa, setPessoa] = useState({
        "is_beneficiario": false,
        "is_prescritor": true,
        "is_fornecedor": false,
    })
    const [message, setMessage] = useState({
        openSnakebar:false,
        message:'',
        statusSnake:'success'
    })
    function checkCpf(cpf){
        Solicitacao.getPessoaByCpf(cpf)
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setState({...state, beneficiario: result})
        });
    }
    console.log(state);
    function checkCep(){
        if(solicitante.cep){
            setSolicitante(solicitante.cep?.replace(/\D/g, ''))
            fetch(`https://viacep.com.br/ws/${solicitante?.cep}/json/`).
            then(res => res.json()).
            then(data=>{
                setSolicitante({
                    ...solicitante, 
                    bairro:data.bairro, 
                    rua:data.logradouro
                })
            })
        }else{
            setSolicitante({...solicitante, logradouro:'',bairro:''})
        }
    }
    const [item, setItem] = useState([{
        item_id: '',
        quantidade_mensal: '',
        d_frequencia_entrega: '',
        quantidade_limite: ''
    }])
    function onLoad(pessoa){
        Solicitacao.getEstabelecimento()
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setEstabelecimento(result.data.data)
        });
        Solicitacao.getTipoAcao()
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setAcao(result.data.dados)
        });

        Solicitacao.getTipoRepresentante()
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setRepresentante(result.data.dados)
        });

        Solicitacao.getTipoReu()
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setReu(result.data.dados)
        });

        Solicitacao.getCids()
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setCid(result.data.data)
        });

        Solicitacao.getPessoa(pessoa)
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setPrescritor(result.data.data)
        });
        Solicitacao.getSexo()
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setSexo(result.data.dados)
        });
        Solicitacao.getFrequenciaEntrega()
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setFreq(result.data.dados)
        });
        Itens.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setDataItens(result.data.data)
        });
    }
    function onAddItem(){
        setItem([...item,{ item_id:'',quantidade_mensal:'',d_frequencia_entrega:'',quantidade_limite:''}])
        setState({...state, itens:[...state.itens, {item_id:'',quantidade_mensal:'',d_frequencia_entrega:'',quantidade_limite:''}]})
    }
    function onSetItem(e,index){
        if(e.target.name === 'item_id'){
            item[index].item_id = e.target.value;
            setState({...state,itens:[...item]})
        }else if(e.target.name === 'quantidade_mensal'){
            item[index].quantidade_mensal = e.target.value;
            setState({...state,itens:[...item]})
        }else if(e.target.name === 'd_frequencia_entrega'){
            item[index].d_frequencia_entrega = e.target.value;
            setState({...state,itens:[...item]})
        }else if(e.target.name === 'quantidade_limite'){
            item[index].quantidade_limite = e.target.value;
            setState({...state,itens:[...item]})     
        }
    }
    function onDeleteItem(position){
        if(itens.length > 1){
            setItens([...itens.filter((item,index) => index !== position)])
        }else{
            // setItem([...item.filter((item,index) => index !== position)])
            setItens([{ item_id:'',quantidade_mensal:'',d_frequencia_entrega:'',quantidade_limite:''}])
        }
    }
    function onSave(data,id){
        // if(id){
        //     Fornecedor.updateById(id, fornecedor).
        //     then((result)=>{
        //         if(result instanceof Error){
        //             setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
        //             return;
        //         }
        //         setState({...state,openModal:false})
        //     })   
        // }else{
            Solicitacao.create(data).
            then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});                   
                    return;
                }
            })
        // }
    }
    function salvarPrescritor(data){
        Solicitacao.createPrescritor(data).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setOpenModal(false)
        })  
    }
    // function onLoadEdit(){
    //     console.log(dataEdit);
    //         setValue('data',dataEdit)
    // }

    useEffect(()=>{ 
        onLoad(pessoa)
    },[openModal])

    // useEffect(()=>{
    //     if(solicitacao){
    //         onSave(solicitacao.data)
    //     }
    // },[solicitacao])

    // useEffect(()=>{
    //     if(dataEdit){
    //         onLoadEdit()
    //     }
    // },[dataEdit])
    return(
        <AppLayout>
            <CssBaseline />
            <Box
                display= 'flex'
                justifyContent='space-between'
                mb={4}
             >
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                        
                >
                    <Typography variant='h5' component='h1'>
                        Nova solicitação
                    </Typography>
                    
                </Box>
            </Box>
            <Box component="main">
                <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mb={2} >
                    <Typography variant='h5' component='h1' mb={2}>
                        Processo
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                type='text'
                                name='numero_solicitacao'
                                label="Nº da solicitação"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => {setState({...state,numero_solicitacao: e.target.value})}}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <TextField
                                select
                                defaultValue={1}
                                name="d_tipo"
                                label="d_tipo"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => {setState({...state,d_tipo: e.target.value})}}
                            >
                                {acao.map((a, index)=>(
                                    <MenuItem key={index} value={a.id}>{a.descricao}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                            select
                            defaultValue={3}
                            name="d_representante_legal"
                            label='Representante legal'
                            fullWidth
                            onChange={(e) => {setState({...state,d_representante_legal: e.target.value})}}
                            variant="outlined"
                            >
                                {representante.map((r, index)=>(
                                <MenuItem key={index} value={r.id}>{r.descricao}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                            name="vara"
                            label="Vara"
                            onChange={(e) => {setState({...state,vara: e.target.value})}}
                            fullWidth
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                            name="juiz"
                            label="Juiz"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => {setState({...state,juiz: e.target.value})}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                select
                                defaultValue={6}
                                id="reuAcao"
                                name="reu_acao"
                                label="Réu da ação"
                                fullWidth
                                onChange={(e) => {setState({...state,reu_acao: e.target.value})}}
                                variant="outlined"
                            >
                                {reu.map((r, index)=>(
                                    <MenuItem key={index} value={r.id}>{r.descricao}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            {/* <Typography>Data de entrada</Typography> */}
                            <TextField
                            type='date'
                            name="data_entrada"
                            label='data de entrada'
                            fullWidth
                            onChange={(e) => {setState({...state,data_entrada: e.target.value})}}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                defaultValue={1}
                                name="cid_id"
                                label="CID"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => {setState({...state,cid_id: e.target.value})}}
                            >
                                {cid.map((r, index)=>(
                                    <MenuItem key={index} value={r.id}>{r.nome}</MenuItem>
                                ))}
                            </TextField>  
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                defaultValue={1}
                                name="estabelecimento"
                               onChange={(e) => {setState({...state,estabelecimento: e.target.value})}}
                                label='Estabelecimento'
                                fullWidth
                                variant="outlined"
                            >
                                {estabelecimento.map((e, index)=>(
                                    <MenuItem key={index} value={e.id}>{e.nome}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                defaultValue={1}
                                name="prescritor_id"
                                label="Prescritor"
                                fullWidth
                                variant="outlined"
                               onChange={(e) => {setState({...state,prescritor_id: e.target.value})}}
                            >
                                {prescritor.map((p, index)=>(
                                    <MenuItem key={index} value={p.id}>{p.nome}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {/* <Typography>Data de entrada</Typography> */}
                            <TextField
                            id="address2"
                            name="address2"
                            // value={prescritor[prescritor_id].conselho_regional}
                            label='Conselho regional'
                            fullWidth
                            variant="outlined"
                            disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                            name="registro_conselho"
                            // value={prescritor[prescritor_id].registro_conselho}
                            label="Nº Registro no conselho"
                            fullWidth
                            variant="outlined"
                            disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Box display='flex' p={1}>
                                <Button onClick={()=>setOpenModal(true)} variant='contained'> Novo Prescritor</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                            name="local_tratamento"
                            label="Local do Tratamento"
                            fullWidth
                            variant="outlined"
                           onChange={(e) => {setState({...state,local_tratamento: e.target.value})}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            {/* <Typography>Data de entrada</Typography> */}
                            <TextField
                            name="data_atendimento"
                            type='date'
                            label='Data do atendimento'
                            fullWidth
                            variant="outlined"
                           onChange={(e) => {setState({...state, data_atendimento: e.target.value})}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Grid>
                    </Grid>

                    <Typography variant='h5' component='h1' my={2}>
                        Solicitante
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                            <TextField
                            // value={beneficiario.cpf}
                            onBlur={()=>checkCpf(state.beneficiario.cpf)}
                            name="cpf"
                            label="CPF"
                           onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, cpf: e.target.value}})}
                            fullWidth
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                            value={state.beneficiario.nome}
                            name="nome"
                            label="Nome"
                            fullWidth
                            variant="outlined"

                            onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, nome: e.target.value}})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                            value={state.beneficiario.nome_mae}
                            name="nome_mae"
                            label='Nome da mãe'
                            fullWidth
                            autoComplete="shipping address-line2"
                            variant="outlined"

                            onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, nome_mae: e.target.value}})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                value={state.beneficiario.data_nascimento}
                                type='date'
                                name="data_nascimento"
                                label="Data de nascimento"
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="outlined"
                                onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, data_nascimento: e.target.value}})}
                                InputLabelProps={{
                                    shrink: true,
                            }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                value={state.beneficiario.d_sexo}
                                select
                                name="d_sexo"
                                label="Sexo"
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="outlined"

                                onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, d_sexo: e.target.value}})}
                            >
                                {sexo.map((s, index)=>(
                                <MenuItem key={index} value={s.valor}>{s.descricao}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                            value={state.beneficiario.cns}
                            name="cns"
                            label="CNS"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, cns: e.target.value}})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                            value={state.beneficiario.rg}
                            name="rg"
                            label='RG'
                            fullWidth
                            variant="outlined"

                            onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, rg: e.target.value}})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                            value={state.beneficiario.telefone}
                            name="telefone"
                            label="Telefone"
                            fullWidth
                            variant="outlined"

                            onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, telefone: e.target.value}})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                            value={state.beneficiario.email}
                            name="email"
                            label='E-mail'
                            fullWidth
                            variant="outlined"

                            onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, email: e.target.value}})}
                            />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <TextField
                            onBlur={()=>checkCep()}
                            value={state.beneficiario.cep}
                            id="cep"
                            name="cep"
                            label="CEP"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, cep: e.target.value}})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                            value={state.beneficiario.rua}
                            name="rua"
                            label="Rua"
                            fullWidth
                            variant="outlined"

                            onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, rua: e.target.value}})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <TextField
                            value={state.beneficiario.numero}
                            name="numero"
                            label="Número"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, numero: e.target.value}})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                            value={state.beneficiario.bairro}
                            id="bairro"
                            name="bairro"
                            label="Bairro"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, bairro: e.target.value}})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {/* <Typography>Data de entrada</Typography> */}
                            <TextField
                            value={state.beneficiario.complemento}
                            id="complemento"
                            name="complemento"
                            label='Complemento'
                            fullWidth
                            variant="outlined"

                            onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, complemento: e.target.value}})}
                            />
                        </Grid>
                    </Grid>    
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant='h5' component='h1' my={3}>
                            Itens
                        </Typography>
                    </Box>      
                    
                    {item.map((itens, index)=>(
                        <Grid key={index} container mb={2}>
                            <Grid item xs={11} container spacing={3}>
                                <Grid item xs={5}>
                                    <TextField
                                        select
                                        id="item_id"
                                        name="item_id"
                                        label='Item'
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=> onSetItem(e,index)}
                                    >
                                        {dataItens.map((i, index)=>(
                                            <MenuItem key={index} value={i.id}>{i.nome}</MenuItem>
                                        ))}   
                                    </TextField>
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                    // value={itens.quantidade_mensal}
                                    id="quantidade_mensal"
                                    name="quantidade_mensal"
                                    label='Qtd Mensal'
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e)=> onSetItem(e,index)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        // value={itens.d_frequencia_entrega}
                                        select
                                        id='d_frequencia_entrega'
                                        name="d_frequencia_entrega"
                                        label='Freq da entrega'
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=> onSetItem(e,index)}
                                    >
                                        {freq.map((f, index)=>(
                                        <MenuItem key={index} value={f.valor}>{f.descricao}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        id="quantidade_limite"
                                        name="quantidade_limite"
                                        label='Qtd limite'
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=> onSetItem(e,index)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={1} display='flex' alignItems='center' justifyContent='center'>
                                <Grid display='flex' item xs={12} sm={1}>
                                <IconButton
                                    
                                    onClick={()=>{onDeleteItem(index)}}
                                >
                                    <ClearIcon sx={{color:'red'}} />
                                </IconButton>
                                </Grid>
                            </Grid>    
                        </Grid>
                    ))}
                    <Divider />
                    <Box display='flex' justifyContent={'center'} my={2}>
                        <Button
                            variant='outlined'
                            onClick={()=>{onAddItem()}}
                        >
                            <Box mr='10px' mt='4px'>
                                <AddCircleSharpIcon />
                            </Box>
                            Novo item
                        </Button>
                    </Box>

                    <Box display='flex' justifyContent={"end"} gap='10px' p={2}>
                        <Button variant="text" onClick={()=> router.push('/solicitacao')}>Cancelar alterações</Button>
                        <Button type="submit" variant="contained"> Salvar</Button>
                    </Box>
                </Box>
                <NovoPrescritor
                    openModal={openModal} 
                    onClose={() => setOpenModal(false)} 
                    Save = {(data)=> salvarPrescritor(data)}
                />
            </Box>

        </AppLayout>
    )
}