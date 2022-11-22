import { Autocomplete, Box, Button, createTheme, Divider, Grid, IconButton, MenuItem, Paper, TextField, Typography } from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useEffect, useState } from "react";
import { Dispensacao } from "@/components/Modal/dispensacao";
import { Itens } from "@/lib/item";
import { Movimentacoes } from "@/lib/movimentacao";
import { Fornecedor } from "@/lib/fornecedor";
import { Estoque } from "@/lib/estoque";
import { useRef } from "react";
import useMovimentacaoSaidaStore from "@/hooks/movimentacaoSaida";
import { useRouter } from "next/router";

export default function Saidas(){
    const inputRef = useRef();
    const router = useRouter()
    const dados = useMovimentacaoSaidaStore(state=>state.datas)
    const [dataItens, setDataItens] = useState([''])
    const [dataId, setDataId] = useState('')
    const [estoque, setEstoque] = useState([])
    const [desability , setDesability] = useState(false)
    const [destino, setDestino] = useState([''])
    const [tipo, setTipo] = useState([''])
    const [openModal, setOpenModal] = useState(false)
    const [itens, setItens] = useState([])
    const [pessoa, setPessoa] = useState({
        "is_beneficiario": '',
        "is_prescritor": '',
        "is_fornecedor": '',
    })
    const [state, setState] = useState({
        solicitacao_id:'',
        d_tipo_movimentacao:'',
        movimentable_id:'',
        documento: "URI::localhost",
        data:'',
        valor:'',
        is_efetivado:false,
        itens:[],
    })    
    const [itemPesquisa, setItemPesquisa] = useState({
        item_id: '',
        quantidade:'',
    })
    function onSetItem(e, value){
        if(e.target.id.startsWith('item_id')){
            itemPesquisa.item_id = value;
            setItemPesquisa({...itemPesquisa})
        }else if(e.target.name === 'quantidade'){
            itemPesquisa.quantidade = e.target.value;
            setItemPesquisa({...itemPesquisa})
        }     
    }
    function populaItem(dados){
        let newItens = itens;
        setItemPesquisa({item_id: '',quantidade:''})
        Object.keys(dados).forEach((i)=>{
            newItens.push(dados[i])
        })
        setItens(newItens)        
    }
    function onLoad(pessoa){
        Movimentacoes.getMovimentacao()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setTipo(result.data.dados.filter((tipos)=> {return (tipos.metadata?.includes('"tipo": "saida"') && !tipos.metadata?.includes('"solicitacao_id": true'))}))
        });

        Fornecedor.getPessoa(pessoa)
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
                setDestino(result.data.data)
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
    function onLoadEstoque(id){
        Estoque.getByItens(id)
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setEstoque(result)
        });
    }
    function onDeleteItem(position){
        setItens([...itens.filter((item,index)=>index !== position)])
    }
    function reload(valor){
        if(valor === "4" || valor === "5"){
            setPessoa({"is_beneficiario": true,"is_prescritor": false,"is_fornecedor": false,})
            setDesability(false)
        }else if(valor === "6"){
            setPessoa({"is_beneficiario": '',"is_prescritor": '',"is_fornecedor": '',})
            setDesability(false)
        }else if(valor === "7"){
            setPessoa({"is_beneficiario": '',"is_prescritor": '',"is_fornecedor": '',})
            setDesability(true)
        }
    }
    function dispensacao(qtd){
        const estoqueEditado = estoque.map((row)=>({
            id:row.id,
            item_id: row.item_id,
            item_nome:row.item.nome,
            lote:row.lote,
            data_validade:row.data_validade.split('-').reverse().join('/'),
            fator_embalagem:row.fator_embalagem,
            quantidade:row.quantidade,
            valor_unit: row.valor_atual,
        }));
        let newItens = Object.assign([], itens);
        let cloneEstoque=[];
        if(qtd>0){
            estoqueEditado.sort(function compare(a, b) {
                if (a.data_validade < b.data_validade) return -1;
                if (a.data_validade > b.data_validade) return 1;
                return 0
            })
            estoqueEditado.forEach(e=>{
                if(e.quantidade > qtd && qtd>0){
                    cloneEstoque = e;
                    cloneEstoque.quantidade = qtd
                    qtd = 0;
                    newItens.push(cloneEstoque)
                }else if(qtd!=0){
                    cloneEstoque = e;
                    qtd -= cloneEstoque.quantidade;
                    newItens.push(cloneEstoque)
                }
            })
            setItemPesquisa({item_id: '',quantidade:''})
            setItens(newItens)
        }else{
            alert('quantidade tem que ser maior que 0')
        }
        if(qtd>0){
            alert(`quantidade solicitada insuficiente em estoque. ${qtd} não adicionado`)
        }
    }
    function onLoadEdit(data){
        reload(data.d_tipo_movimentacao)
        const itensEdit = data.itens?.map((item)=>({
            id:item.id,
            item_id:item.item_id,
            quantidade:item.quantidade,
            fator_embalagem:item.fator_embalagem,
            data_validade:item.data_validade,
            lote:item.lote,
            valor_unit:item.valor_unit,
        }));
        setState({
            solicitacao_id:5,
            d_tipo_movimentacao:data.d_tipo_movimentacao,
            movimentable_id:1,
            documento: "URI::localhost",
            data:data.data,
            valor:data.valor,
            is_efetivado:data.is_efetivado,
            itens: itensEdit,
        })
        setItens(itensEdit)
        setDataId(data.id)
    }
    function editItens(itens){
        itens.forEach(i=>{
            if(i.id){
                delete i.id;
            }
        })
        setState({...state, itens:itens })
    }
    function onSave(data){
        console.log(data);
        if(dataId!=''){
            Movimentacoes.updateById(dataId,data).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                   
                        return;
                }
                    // alert(result.message)
            })
        }else{
            Movimentacoes.create(data).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                   
                        return;
                    }
                    // setMovimentacaoId(result.dados.id)
                    alert(result.message)
            })
        }
           
        router.push('/movimentacao')
    }

    useEffect(()=>{
        onLoad(pessoa)
    },[pessoa])

    useEffect(()=>{
        editItens(itens)
    },[itens])

    useEffect(()=>{
        if(dados){
            onLoadEdit(dados)
        }
    },[dados])
    console.log(state.movimentable_id);
    return(
        <AppLayout>
            <Typography variant='h5' component='h1' color='secondary'>
                Saidas
            </Typography>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mt={2}>
                <Grid container spacing={3} mb={1}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            select
                            value={state.d_tipo_movimentacao}
                            id="tipo_Saida"
                            ref={inputRef}
                            name="tipo_Saida"
                            label="Tipo de saída"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => {setState({...state, d_tipo_movimentacao: e.target.value}),reload(e.target.value)}}
                        >
                            {tipo.map((tipo, index)=>(
                                <MenuItem key={index} value={tipo.valor}>{tipo.descricao}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Autocomplete
                            value={destino.forEach(i=>{if(i.id == state.movimentable_id)i.nome})}
                            options={destino?.map((option) => option.nome)}
                            onChange={(_, newValue) => {
                                destino.forEach((i)=>{
                                    if(i.nome == newValue){
                                        setState({...state, movimentable_id: i.id})
                                    }
                                })
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Destino da saída"
                                />
                            )}
                        />                                   
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            type='date'
                            value={state.data}
                            name="data"
                            label='Data da movimentacao'
                            fullWidth
                            variant="outlined"
                            onChange={(e) => {setState({...state, data: e.target.value})}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Button
                            sx={{marginTop:'6px'}}
                            variant="outlined" 
                            component="label"
                            onChange={(e)=>setFile(e.target.files[0])}    
                        >
                            Anexar
                            <AttachFileIcon sx={{marginBottom:'5px'}} />
                            <input hidden multiple type="file" />
                        </Button>
                    </Grid>
                </Grid>
                <Grid container mt={5} mb={3}>
                    <Grid item xs={11} container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                value={dataItens.forEach(i=>{if(i.id == state.movimentable_id)i.nome})}
                                options={dataItens?.map((option) => option.nome)}
                                id="item_id"
                                name='item_id'
                                onChange={(e, newValue) => {
                                    dataItens.forEach((i)=>{
                                        if(i.nome == newValue){
                                            onSetItem(e,i.id)
                                        }
                                    })
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Item"
                                        name="item_id"
                                    />
                                )}
                            />  
                        </Grid>
                        
                        <Grid item xs={12} sm={1}>
                            <TextField
                                name="quantidade"
                                value={itemPesquisa.quantidade}
                                label='Qtd Saida'
                                fullWidth
                                variant="standard"
                                onChange={(e)=> onSetItem(e)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={2} mt='6px'>
                            <Button
                                sx={{marginLeft:'30px'}}
                                variant="text"
                                // onClick={() => { setOpenModal(true), onLoadEstoque(item.item_id)}}
                                onClick={() => setOpenModal(true)}
                            >
                                escolher lote
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={1} mt='6px'>
                            <Button
                                variant="contained"
                                // onClick={() => { setOpenModal(true), onLoadEstoque(item.item_id)}}
                                onClick={() => dispensacao(itemPesquisa.quantidade)}
                            >
                                Adicionar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {itens.map((item, index)=>(
                    <Grid key={index} container mt={5} mb={3} component={Paper} p={1}>
                        <Grid item xs={11} container spacing={3}>
                            <Grid item xs={12} sm={3} disabled>
                                <Typography variant="body1">Item</Typography>
                                <Typography>{item.item_nome}</Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={2}>
                                <Typography variant="body1">Quantidade</Typography>
                                <Typography>{item.quantidade}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Typography variant="body1">Fator embalagem</Typography>
                                <Typography>{item.fator_embalagem}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Typography variant="body1">Lote</Typography>
                                <Typography>{item.lote}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} display='flex' alignItems='center' justifyContent='center'>
                            <Grid display='flex' item xs={12} sm={1} justifyContent='end' alignContent='center' mb={1}>
                                <IconButton
                                    onClick={()=>{onDeleteItem(index)}}
                                >
                                    <DeleteOutlineTwoToneIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>    
                ))}
                    <Divider />
                    <Box display='flex' justifyContent={"end"} gap='10px' p={2}>
                        <Button variant="text" onClick={() => router.push('/movimentacao')}> Cancelar Edição</Button>
                        <Button variant="contained" onClick={() => onSave(state)}> Salvar</Button>
                    </Box> 
               <Dispensacao
                    openModal={openModal}
                    onClose={() => setOpenModal(false)}
                    onSave = {(dados)=> populaItem(dados)}
                    estoque={estoque}
                    data = {state}
                    tipo={tipo}
                /> 
            </Box>
        </AppLayout>
    )
}