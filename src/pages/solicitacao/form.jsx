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


export default function NovaSolicitacao(){
    const datas = useSolicitacaoStore(state=>state.datas);
    const router = useRouter();
    console.log(datas);

    const {register, handleSubmit, setValue} = useForm()
    const [estabelecimento, setEstabelecimento] = useState([''])
    const [acao, setAcao] = useState(['']);
    const [representante, setRepresentante] = useState(['']);
    const [reu, setReu] = useState(['']);
    const [cid, setCid] = useState(['']);
    const [prescritor, setPrescritor] = useState(['']);
    const [sexo, setSexo] = useState([''])
    const [freq, setFreq] = useState([''])
    const [solicitacao, setSolicitacao]=useState([])
    const [beneficiario, setBeneficiario] = useState({})
    const [openModal, setOpenModal] = useState(false)

    const [pessoa, setPessoa] = useState({
        "is_beneficiario": false,
        "is_prescritor": true,
        "is_fornecedor": false,
    })
    const [itens, setItens] = useState([{
        item_id:'',
        quantidade_mensal:'',
        d_frequencia_entrega:'',
        quantidade_limite:''
    }])
    const onSubmit = (data)=>{
        setSolicitacao(data)
    }
    const [message, setMessage] = useState({
        openSnakebar:false,
        message:'',
        statusSnake:'success'
    })
    function checkCpf(){
        data.map( data => {
            if(beneficiario.cpf === data.cpf){
                setSolicitante({...solicitante, nome: data.nome, nomeMae: data.nome_da_mae, dtNascimento: data.dt_nascimento})
            }
        })
    }
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
    // Requisição Ajax para banco
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
        })
    }
    //funções para adicionar novas linhas aos Itens
    function onAddItem(){
        setItens([...itens,{ item_id:'',quantidade_mensal:'',d_frequencia_entrega:'',quantidade_limite:''}])
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
            // setState({...state, openModal:false})
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
    function onLoadEdit(){
        if(datas){
            setValue('beneficiario',datas)
        }
    }

    useEffect(()=>{
        onLoad(pessoa)
    },[openModal])

    // useEffect(()=>{
    //     onSave(solicitacao)
    // },[solicitacao])

    useEffect(()=>{
        onLoadEdit()
    },[datas])




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
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mb={2} >
                    <Typography variant='h5' component='h1' mb={2}>
                        Processo
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                type='text'
                                name='numero_solicitacao'
                                {...register("numero_solicitacao")}
                                label="Nº da solicitação"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <TextField
                                select
                                defaultValue={1}
                                name="TipoAcao"
                                label="d_tipo"
                                fullWidth
                                variant="outlined"
                                {...register('d_tipo')}
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
                            {...register('d_representante_legal')}
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
                            {...register('vara')}
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
                            {...register('juiz')}
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
                                {...register('reu_acao')}
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
                            {...register('data_entrada')}
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
                                {...register('cid_id')}
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
                                {...register("estabelecimento_id")}
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
                                {...register("prescritor_id")}
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
                            {...register("local_tratamento")}
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
                            {...register("data_atendimento")}
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
                            onBlur={()=>checkCpf()}
                            name="cpf"
                            label="CPF"
                            {...register('beneficiario.cpf')}
                            fullWidth
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                            // value={beneficiario.nome}
                            name="nome_mae"
                            label="Nome"
                            fullWidth
                            variant="outlined"

                            {...register('beneficiario.nome')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                            // value={beneficiario.nomeMae}
                            name="nome_mae"
                            label='Nome da mãe'
                            fullWidth
                            autoComplete="shipping address-line2"
                            variant="outlined"

                            {...register('beneficiario.nome_mae')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                            // value={beneficiario.dtNascimento}
                            type='date'
                            name="data_nascimento"
                            label="Data de nascimento"
                            fullWidth
                            autoComplete="shipping address-line2"
                            variant="outlined"

                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register('beneficiario.data_nascimento')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                            select
                            name="d_sexo"
                            label="Sexo"
                            fullWidth
                            autoComplete="shipping address-line2"
                            variant="outlined"

                            {...register('beneficiario.sexo')}
                            >
                                {sexo.map((s, index)=>(
                                <MenuItem key={index} value={s.descricao}>{s.descricao}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                            name="cns"
                            label="CNS"
                            fullWidth
                            variant="outlined"
                            {...register('beneficiario.cns')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                            name="rg"
                            label='RG'
                            fullWidth
                            variant="outlined"

                            {...register('beneficiario.rg')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                            name="telefone"
                            label="Telefone"
                            fullWidth
                            variant="outlined"

                            {...register('beneficiario.telefone')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                            name="email"
                            label='E-mail'
                            fullWidth
                            variant="outlined"

                            {...register('beneficiario.email')}
                            />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <TextField
                            onBlur={()=>checkCep()}
                            id="cep"
                            name="cep"
                            label="CEP"
                            fullWidth
                            variant="outlined"
                            {...register('beneficiario.cep')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                            value={beneficiario?.rua}
                            name="rua"
                            label="Rua"
                            fullWidth
                            variant="outlined"

                            {...register('beneficiario.rua')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <TextField
                            name="numero"
                            label="Número"
                            fullWidth
                            variant="outlined"
                            {...register('beneficiario.numero')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                            value={beneficiario?.bairro}
                            id="bairro"
                            name="bairro"
                            label="Bairro"
                            fullWidth
                            variant="outlined"
                            {...register('beneficiario.bairro')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {/* <Typography>Data de entrada</Typography> */}
                            <TextField
                            id="complemento"
                            name="complemento"
                            label='Complemento'
                            fullWidth
                            variant="outlined"

                            {...register('beneficiario.complemento')}
                            />
                        </Grid>
                    </Grid>    
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant='h5' component='h1' my={3}>
                            Itens
                        </Typography>
                    </Box>      
                    
                    {itens.map((itens, index)=>(
                        <Grid key={index} container mb={2}>
                            <Grid item xs={11} container spacing={3}>
                                <Grid item xs={5}>
                                    <TextField
                                        // value={itens.item_id}
                                        id="item_id"
                                        name="item_id"
                                        label='Item'
                                        fullWidth
                                        variant="outlined"
                                        // onChange={(e)=> onSetItem(e,index)}
                                        {...register(`itens.${index}.item_id`)}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                    // value={itens.quantidade_mensal}
                                    id="quantidade_mensal"
                                    name="quantidade_mensal"
                                    label='Qtd Mensal'
                                    fullWidth
                                    variant="outlined"
                                    // onChange={(e)=> onSetItem(e,index)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...register(`itens.${index}.quantidade_mensal`)}
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
                                        // onChange={(e)=> onSetItem(e,index)}
                                        {...register(`itens.${index}.d_frequencia_entrega`)}
                                    >
                                        {freq.map((f, index)=>(
                                        <MenuItem key={index} value={f.descricao}>{f.descricao}</MenuItem>
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
                                        // onChange={(e)=> onSetItem(e,index)}
                                        {...register(`itens.${index}.quantidade_limite`)}
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