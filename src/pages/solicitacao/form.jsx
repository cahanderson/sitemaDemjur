import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Alert, Autocomplete, Box, Button, createFilterOptions, CssBaseline, Divider, Grid, IconButton, MenuItem, Paper, Snackbar, TextField, Typography } from "@mui/material";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ClearIcon from '@mui/icons-material/Clear';
import AppLayout from "@/components/Layouts/AppLayout";
import { Solicitacao } from "@/lib/solicitacao";
import { NovoPrescritor } from "@/components/Modal/novoPrescritor";
import { Itens } from "@/lib/item";
import useSolicitacaoStore from "@/hooks/solicitacao";
import { mask, unMask } from 'remask'

export default function NovaSolicitacao(){
    const filter = createFilterOptions();
    const data = useSolicitacaoStore(state=>state.datas)
    const router = useRouter();
    const [dataId, setDataId] = useState('')
    const [dataEstabelecimento, setDataEstabelecimento] = useState([''])
    const [acao, setAcao] = useState(['']);
    const [representante, setRepresentante] = useState(['']);
    const [reu, setReu] = useState(['']);
    const [cid, setCid] = useState([{
            id: '',
            codigo: '',
            nome: ''
    }]);
    const [prescritor, setPrescritor] = useState(['']);
    const [sexo, setSexo] = useState([''])
    const [freq, setFreq] = useState([''])
    const [dataItens, setDataItens] = useState([''])
    const [openModal, setOpenModal] = useState(false)
    const [editReu, setEditReu] = useState([])
    const [editCID, setEditCID] = useState([])
    const [searchCID, setSearchCID] = useState({
        nome: "",
    })
    const [dataPrescritor, setDataPrescritor] = useState({
        conselho_regional:'',
        registro_conselho:''
    })
    const [retornoUsuario,setRetornoUsuario] = useState({
        openSnakebar:false,
        statusSnake:'success',
        message:'',
    })
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
        "is_estabelecimento":false
    })
    const [estabelecimento, setEstabelecimento] = useState({
        "is_beneficiario": false,
        "is_prescritor": false,
        "is_fornecedor": false,
        "is_estabelecimento":true
    })
    const [addEstabelecimento, setAddEstabelecimento] = useState({
        nome:'',
        is_beneficiario: false,
        is_prescritor: false,
        is_fornecedor: false,
        is_estabelecimento:true
    })
    const [item, setItem] = useState([{
        item_id: '',
        quantidade_mensal: '',
        d_frequencia_entrega: '',
        quantidade_limite: ''
    }])
    function onLoadCid(search){
        Solicitacao.getCids(search)
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setCid(result.data.results)
        });
    }
    function checkCpf(cpf){
        Solicitacao.getPessoaByCpf(cpf)
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }else if(state.beneficiario.cpf != null){
                setState({...state, beneficiario: result})
            }else { 
                return;
            }
        });
    }
    function checkCep(){
        if(state.beneficiario.cep){
            // setState({...state,beneficiario:{...state.beneficiario, cep:state.beneficiario.cep?.replace(/\D/g, '')}})
            fetch(`https://viacep.com.br/ws/${state.beneficiario.cep}/json/`).
            then(res => res.json()).
            then(data=>{
                setState({...state,beneficiario:{...state.beneficiario,bairro:data.bairro, rua:data.logradouro}})
                })
        }else{
            setState({...state, beneficiario:{...state.beneficiario,rua:'',bairro:''}})
        }
    }
    function onLoad(){
        Solicitacao.getEstabelecimento(estabelecimento)
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setDataEstabelecimento(result.data.data)
        });

        Solicitacao.getTipoAcao()
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setAcao(result.data.dados)
        });

        Solicitacao.getTipoRepresentante()
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setRepresentante(result.data.dados)
        });

        Solicitacao.getTipoReu()
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setReu(result.data.dados)
        });


        Solicitacao.getPessoa(pessoa)
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setPrescritor(result.data.data)
        });
        Solicitacao.getSexo()
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setSexo(result.data.dados)
        });
        Solicitacao.getFrequenciaEntrega()
        .then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
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
    function onLoadPrescritor(pessoa){
        Solicitacao.getPessoa(pessoa)
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setPrescritor(result.data.data)
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
        if(item.length > 1){
            setItem([...item.filter((item,index) => index !== position)])
            setState({...state, itens:[...state.itens.filter((item,index)=>index !== position)]})
        }else{
            setItem([{ item_id:'',quantidade_mensal:'',d_frequencia_entrega:'',quantidade_limite:''}])
            setState({...state, itens:[{id:null, item_id:'',quantidade:'',fator_embalagem:'',data_validade:'',lote:'',valor_unit:''}]})
        }
    }
    function onSave(data){
        if(dataId!=''){
            Solicitacao.updateById(dataId, data).
            then((result)=>{
                if(result instanceof Error){
                    setRetornoUsuario({...retornoUsuario, openSnakebar:true, message:result.message, statusSnake:'error'});
                    return;
                }
                router.push('/solicitacao')
            })   
        }else{
            Solicitacao.create(data).
            then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...retornoUsuario, openSnakebar:true, message:result.message, statusSnake:'error'});                   
                    return;
            }
            router.push('/solicitacao')
            })
        }
    }
    function salvarPrescritor(data){
        Solicitacao.createPrescritor(data).
        then((result)=>{
            if(result instanceof Error){
                setRetornoUsuario({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setOpenModal(false)
            onLoadPrescritor(pessoa)
        })  
    }
    function dadosPrescritor(id){
        Solicitacao.getPessoaById(id)
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setDataPrescritor({conselho_regional: result.data.conselho_regional, registro_conselho: result.data.registro_conselho})
        });
    }
    function editSelectReu(){
        let newLinha='';
        editReu.forEach(e=>{
            let linha = reu.find((r) => r.descricao == e)
            if(newLinha !=''){
                newLinha = newLinha + `,{'id':'${linha.valor}','descricao':'${linha.descricao}'}`
            }else{
                newLinha = `{'id':'${linha.valor}','descricao':'${linha.descricao}'}`
            }
            setState({...state, reu_acao:newLinha})
        })
    }
    function getEditReu(value){
        let linha='';
        let newLinha = [];
        linha = value.split("},{");
        linha.forEach(n=>{
            if(newLinha!=''){
                newLinha.push(n.replace(/[^0-9]/g,''))
            }else{
                newLinha[0] = n.replace(/[^0-9]/g,'')
            }
        })
        setEditReu(newLinha)
    }
    function getEditCID(value){
        let linha='';
        let newLinha = [];
        linha = value.split("},{");
        linha.forEach(n=>{
            if(newLinha!=''){
                newLinha.push(parseInt(n.replace(/[^0-9]/g,'')))
            }else{
                newLinha[0] = parseInt(n.replace(/[^0-9]/g,''))
            }
        })
        setEditCID(newLinha)
    }
    function editSelectCID(){
        let newLinha='';
        editCID.forEach(e=>{
            let linha = cid.find(c=>c.nome == e)
            if(newLinha !=''){
                newLinha = newLinha + `,{'id':'${linha.id}','descricao':'${linha.nome}'}`
            }else{
                newLinha = `{'id':'${linha.id}','descricao':'${linha.nome}'}`
            }
            setState({...state, cid_id:newLinha})
        })
    }
    function onLoadEdit(data){
        const itensEdit = data.itens?.map((item)=>({
            id:item.id,
            item_id:item.item_id,
            quantidade_mensal:item.quantidade_mensal,
            d_frequencia_entrega:item.d_frequencia_entrega,
            quantidade_limite:item.quantidade_limite,
        }));
        setState({
            numero_solicitacao: data.numero_solicitacao,
            d_tipo: data.d_tipo,
            d_representante_legal:data.d_representante_legal ,
            vara:data.vara,
            juiz:data.juiz,
            reu_acao:data.reu_acao,
            data_entrada:data.data_entrada,
            cid_id:data.cid_id,
            estabelecimento_id:data.estabelecimento_id,
            prescritor_id:data.prescritor_id,
            local_tratamento:data.local_tratamento,
            data_atendimento:data.data_atendimento,
            beneficiario: {
                id:data.beneficiario.id,
                cpf:data.beneficiario.cpf,
                nome:data.beneficiario.nome,
                nome_mae:data.beneficiario.nome_mae,
                data_nascimento:data.beneficiario.data_nascimento,
                rg:data.beneficiario.rg,
                cns:data.beneficiario.cns,
                telefone:data.beneficiario.telefone,
                email:data.beneficiario.email,
                d_sexo:data.beneficiario.d_sexo,
                cep:data.beneficiario.cep,
                rua:data.beneficiario.rua,
                numero:data.beneficiario.numero,
                bairro:data.beneficiario.bairro,
                complemento:data.beneficiario.complemento
            },
            itens: itensEdit,
        })
        setDataId(data.id)
        getEditReu(data.reu_acao)
        getEditCID(data.cid_id)
    }
    function closeSnakebar(){
        setRetornoUsuario({...retornoUsuario, openSnakebar:false})
    }
    useEffect(()=>{
        if(state.beneficiario.cep.length == 8){
            checkCep()
        }
    },[state.beneficiario.cep])

    useEffect(()=>{
        if(state.beneficiario.cpf.length == 11){
            checkCpf(state.beneficiario.cpf)
        }
    },[state.beneficiario.cpf])

    useEffect(()=>{ 
        onLoad()
        onLoadPrescritor(pessoa)
    },[openModal])

    useEffect(()=>{
        if(state.prescritor_id){
            dadosPrescritor(state.prescritor_id)
        }
    },[state.prescritor_id])

    useEffect(()=>{
        if(data){
            onLoadEdit(data)
        }
    },[data])
    useEffect(()=>{
        if(searchCID.nome !=''){
            onLoadCid(searchCID)
        }
    },[searchCID])
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
            </Box>
            <Box component="main">
                <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mb={2} >
                    <Typography variant='h5' component='h1' mb={2}>
                        Processo
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                value={state.numero_solicitacao}
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
                                value={state.d_tipo}
                                select
                                name="d_tipo"
                                label="Tipo de ação"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => {setState({...state,d_tipo: e.target.value})}}
                            >
                                {acao.map((a, index)=>(
                                    <MenuItem key={index} value={a.valor}>{a.descricao}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                value={state.d_representante_legal}
                                select
                                name="d_representante_legal"
                                label='Representante legal'
                                fullWidth
                                onChange={(e) => {setState({...state,d_representante_legal: e.target.value})}}
                                variant="outlined"
                            >
                                {representante.map((r, index)=>(
                                <MenuItem key={index} value={r.valor}>{r.descricao}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                value={state.vara}
                                name="vara"
                                label="Vara"
                                onChange={(e) => {setState({...state,vara: e.target.value})}}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                value={state.juiz}
                                name="juiz"
                                label="Juiz"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => {setState({...state,juiz: e.target.value})}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Autocomplete
                                multiple
                                onBlur={editSelectReu}
                                id="tags-standard"
                                options={reu.map((option) => option.descricao)}
                                onChange={(_, newValue) => {
                                    setEditReu(newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Réu da ação"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            {/* <Typography>Data de entrada</Typography> */}
                            <TextField
                                value={state.data_entrada}
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
                        <Grid item xs={12} sm={8}>
                            <Autocomplete
                                multiple
                                onBlur={editSelectCID}
                                id="tags-standard"
                                options={cid?.map((option) => option?.nome)}
                                onChange={(_, newValue) => {
                                    setEditCID(newValue)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="CID"
                                        onChange={(e)=>setSearchCID({nome: e.target.value})}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                value={state.estabelecimento_id}
                                select
                                name="estabelecimento"
                                onChange={(e) => {setState({...state,estabelecimento_id: e.target.value})}}
                                label='Estabelecimento'
                                fullWidth
                                variant="outlined"
                            >
                                {dataEstabelecimento.map((e, index)=>(
                                    <MenuItem key={index} value={e.id}>{e.nome}</MenuItem>
                                ))}
                            </TextField>
                            <Autocomplete
                                // value={valueCategoria}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                        setItem({...item, categoria_id: newValue.id})
                                    } else if (newValue && newValue.inputValue) {
                                        setAddEstabelecimento({...addEstabelecimento,nome:newValue.inputValue})
                                    } else {
                                    setItem({...item, categoria_id: newValue?.id})
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    const { inputValue } = params;
                                    const isExisting = options.some((option) => inputValue === option.nome);
                                    if (inputValue !== '' && !isExisting) {
                                        filtered.push({
                                            inputValue,
                                            nome: `Adicionar estabelecimento : "${inputValue}"`,
                                        });
                                    }
                                    return filtered;
                                }}
                                selectOnFocus
                                handleHomeEndKeys
                                options={dataEstabelecimento}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option.nome === 'string') {
                                    return option.nome;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                    return option.inputValue;
                                    }
                                    // Regular option
                                    return option.nome;
                                }}
                                renderOption={(props, option) => <li {...props}>{option.nome}</li>}
                                freeSolo
                                renderInput={(params) => (
                                    <TextField {...params} 
                                        label="Estabelecimento" 
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                value={state.prescritor_id}
                                select
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
                                name='conselhoRegional'
                                value={dataPrescritor.conselho_regional}
                                label='Conselho regional'
                                fullWidth
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                            name="registro_conselho"
                            value={dataPrescritor.registro_conselho}
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
                            value={state.local_tratamento}
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
                            value={state.data_atendimento}
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
                            value={mask(unMask(state.beneficiario.cpf),['999.999.999-99'])}
                            // onBlur={()=>checkCpf(state.beneficiario.cpf)}

                            name="cpf"
                            label="CPF"
                           onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, cpf: unMask(e.target.value)}})}
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
                            value={mask(unMask(state.beneficiario.telefone),['(99)99999999','(99)9 99999999'])}
                            name="telefone"
                            label="Telefone"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, telefone: unMask(e.target.value)}})}
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
                                value={mask(unMask(state.beneficiario.cep,),['99.999-999'])}
                                id="cep"
                                name="cep"
                                label="CEP"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setState({...state, beneficiario:{...state.beneficiario, cep: unMask(e.target.value)}})}
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
                    
                    {state.itens?.map((item, index)=>(
                        <Grid key={index} container mb={2}>
                            <Grid item xs={11} container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        value={item.item_id}
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
                                <Grid item xs={2}>
                                    <TextField
                                    value={item.quantidade_mensal}
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
                                <Grid item xs={3}>
                                    <TextField
                                        value={item.d_frequencia_entrega}
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
                                {/* <Grid item xs={4}>
                                    <TextField
                                        value={item.quantidade_limite}
                                        id="quantidade_limite"
                                        name="quantidade_limite"
                                        label='Qtd limite'
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e)=> onSetItem(e,index)}
                                    />
                                </Grid> */}
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
                        <Button type="submit" variant="contained" onClick={()=> onSave(state)}> Salvar</Button>
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