import { useState, useEffect } from "react";
import { Table as TableMui, Box, Button, Grid, MenuItem, Paper, TableBody, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, Divider } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import AppLayout from "@/components/Layouts/AppLayout";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { DispensacaoCliente } from "@/components/Modal/dispensacaoCliente";
import { Movimentacoes } from "@/lib/movimentacao";
import { Itens } from "@/lib/item";
import { Solicitacao } from "@/lib/solicitacao";
import { Estoque } from "@/lib/estoque";
import { Table } from "@/components/Table";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import useMovimentacaoSaidaPacienteStore from "@/hooks/movimentacaoSaidaPaciente";
import { mask, unMask } from 'remask'
import useSolicitacaoDispensacaoStore from "@/hooks/solicitacaoDispensacao";

export default function Paciente(){
    
    const idSolicitacaoStore = useSolicitacaoDispensacaoStore(state=>state.datas)
    let tableCheckbox = false;
    let itemEditado = []
    let soma=0.0;
    const router = useRouter()
    const dados = useMovimentacaoSaidaPacienteStore(state=>state.datas)
    const [isEfetivado, setIsEfetivado] = useState(false)
    const [dataId, setDataId] = useState('')
    const [tabelaItensDefinidos, setTabelaItensDefinidos] = useState(false)
    const [quantidade, setQuantidade] = useState()
    const [nSolicitacoes, setNSolicitacoes] = useState([''])
    const [openModal, setOpenModal] = useState(false)
    const [solicitacao, setSolicitacao] = useState()
    const [idSolicitacoes, setIdSolicitacoes] = useState('')
    const [dataItens, setDataItens] = useState([])
    const [estoque, setEstoque] = useState([])
    const [itens, setItens] = useState([])
    const [itensInseridos, setItensInseridos] = useState([])
    const [state, setState] = useState({
        solicitacao_id:'',
        d_tipo_movimentacao:4,
        movimentable_id:'',
        data: '',
        documento: "URI::localhost",
        is_efetivado: false,
        valor:'',
        itens:''
        })

    const columns = [
        { field: 'item_nome', headerName: 'Itens', width: 200,  },
        { field: 'quantidade', headerName: 'Quantidade', width: 200 },
        { field: 'fator_embalagem', headerName: 'Fator Embalagem', width: 200 },
        { field: 'data_validade', headerName: 'Validade', width: 200 },
        { field: 'lote', headerName: 'Lote', width: 300 }, 
        { field: 'actions',type:'actions',getActions: (params) => [
            <GridActionsCellItem icon={<DeleteOutlineTwoToneIcon/>} onClick={() => onDeleteItemInserido(params.id)} label="Delete" />,
            ]
        }
    ]
    const rows = itensInseridos?.map((row)=>({
        id:row.id,
        item_nome:row.item_nome,
        quantidade: row.quantidade,
        fator_embalagem: row.fator_embalagem,
        lote:row.lote,
        data_validade:row.data_validade.split('-').reverse().join('/'),
    }));

    function onLoad(){
        Itens.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setDataItens(result.data.data)
        });

        Movimentacoes.getNumeroSolicitacoes()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setNSolicitacoes(result.data)
        });
    }
    function onLoadEdit(data){
        setTabelaItensDefinidos(true);
        const itensEdit = data.itens?.map((item)=>({
            id:item.id,
            item_id:item.item_id,
            quantidade:item.quantidade,
            fator_embalagem:item.fator_embalagem,
            data_validade:item.data_validade,
            lote:item.lote,
            valor_unit:item.valor_unit,
        }));
        setIdSolicitacoes(data.solicitacao_id)
        setState({
            solicitacao_id:data.solicitacao_id,
            d_tipo_movimentacao:data.d_tipo_movimentacao,
            movimentable_id:data.movimentable_id,
            documento: "URI::localhost",
            data:data.data,
            valor:data.valor,
            is_efetivado:data.is_efetivado,
            itens: itensEdit,
        })
        setItensInseridos(itensEdit)
        setDataId(data.id)
    }
    function onLoadSolicitacao(id){
        Solicitacao.getById(id)
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            console.log(result);
            setSolicitacao(result.data)
            const itemFormated = result.data.itens?.map((item)=>({
                id:item.id,
                item_id: item.item_id,
                item_nome: item.item?.nome,
                lote:item?.lote,
                data_validade:item?.data_validade,
                fator_embalagem:item.fator_embalagem,
                quantidade:item?.quantidade_mensal,
                quantidade_limite:item.item?.quantidade_limite,
                quantidade_atendida:'',
                mesAtual:'',
            }));
            setItens(itemFormated)
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
    function populaItem(dados){
        let newItens = itensInseridos;
        Object.keys(dados).forEach((i)=>{
            console.log(dados[i]);
            newItens.push(dados[i])
        })
        setItensInseridos(newItens)
    }
    function onDeleteItemInserido(id){
        setItensInseridos([...itensInseridos.filter((item)=>item.id !== id)])
    }
    function adicionarItens(qtd){
        setTabelaItensDefinidos(true);
        const estoqueEditado = estoque.map((row)=>({
            id:row.id,
            item_id: row.item_id,
            item_nome:row.item?.nome,
            lote:row.lote,
            data_validade:row.data_validade.split('-').reverse().join('/'),
            fator_embalagem:row.fator_embalagem,
            valor: row.valor_atual,
            quantidade:row.quantidade,
        }));
        let newItens = Object.assign([], itensInseridos);
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
                soma += parseFloat(e.valor);
            })
            setItensInseridos(newItens)
        }else{
            alert('quantidade tem que ser maior que 0')
        }
        if(qtd>0){
            alert(`quantidade solicitada insuficiente em estoque. ${qtd} não adicionado`)
        }
        
    }
    function editItens(data){
        data.forEach(item=>{
            let editItem = Object.assign({}, item);
            if(editItem.id){
                delete editItem.id
            }
            if(editItem.item_nome){
                delete editItem.item_nome
            }
            itemEditado.push(editItem)
        })
        setState({...state,data:solicitacao?.data_entrada, d_tipo_movimentacao:4 ,movimentable_id:solicitacao?.beneficiario.id, is_efetivado:isEfetivado,valor: soma, itens: itemEditado})
    }
    function onSave(data){
        setTabelaItensDefinidos(false)
        if(dataId!=''){
            Movimentacoes.updateById(dataId,data).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                   
                        return;
                }
            })
        }else{
            Movimentacoes.create(data).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                   
                        return;
                    }
            })
        }
        router.push('/solicitacao')
    }
    useEffect(()=>{
        onLoad()
    },[])

    useEffect(()=>{
        if(idSolicitacaoStore){
            onLoadSolicitacao(idSolicitacaoStore)
        }
    },[idSolicitacaoStore])
    
    useEffect(()=>{
        if(dados){
            onLoadEdit(dados)
        }
    },[dados])

    useEffect(()=>{
        if(itensInseridos!=''){
            editItens(itensInseridos)
        }
    },[itensInseridos])

    // useEffect(()=>{
    //     if(idSolicitacaoStore){
    //         setIdSolicitacoes(idSolicitacaoStore)
    //         console.log(idSolicitacaoStore);
    //     }
    // },[])
    return(
        <AppLayout>
            <Typography variant='h5' component='h1' color='secondary'>
                Saidas para paciente
            </Typography>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mt={2}>
                <Grid container spacing={3} mb={1}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={solicitacao?.beneficiario.nome}
                            name="solicitante"
                            label='Solicitante'
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            value={solicitacao?.beneficiario.cpf}
                            name="cpf"
                            label='CPF'
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            value={solicitacao?.beneficiario.cns}
                            name="cns"
                            label='CNS'
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>    
                <Grid container spacing={3} my={1} mb={4} justifyContent='start'>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            value={solicitacao?.data_entrada}
                            name="dateMovimentacao"
                            type="date"
                            label='Data da movimentação'
                            fullWidth
                            variant="outlined"
                            onChange={(e)=>setState({...state, data:e.target.value})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                      </Grid>
                    <Grid item xs={12} sm={1} mt={1}>
                        {/* <Typography>Documento da dispensação</Typography> */}
                        <Button
                            variant="outlined" 
                            component="label"
                            startIcon={<AttachFileIcon />}
                        >
                            Anexar
                            <input hidden multiple type="file" />
                        </Button>
                    </Grid>
                </Grid>               
                { solicitacao?     
                    <TableContainer>
                        <TableMui sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell component='th'>Itens </TableCell>
                                    <TableCell component='th'>Qtd Programada</TableCell>
                                    <TableCell component='th'>Qtd.Limite</TableCell>
                                    <TableCell component='th'>Qtd.Atendida</TableCell>
                                    <TableCell component='th'>Mês Atual</TableCell>
                                    <TableCell component='th'>Quantidade</TableCell>
                                    <TableCell component='th'align="center">Ação</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itens.map((item, index) => (
                                    <TableRow
                                        key={item.id}
                                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell >{item.item_nome}</TableCell>
                                        <TableCell >{item.quantidade}</TableCell>
                                        <TableCell >{item.quantidade_limite}</TableCell>
                                        <TableCell >0</TableCell>
                                        <TableCell >0</TableCell>
                                        <TableCell >
                                            <TextField
                                                name="quantidade"
                                                type='number'
                                                label='Qtd Saida'
                                                variant="standard"
                                                onChange={(e)=> {setQuantidade(e.target.value),onLoadEstoque(item.item_id)}}
                                            />
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            <Button
                                                sx={{marginRight:'10px'}}
                                                variant="text"
                                                size="small"
                                                onClick={() =>{setOpenModal(true),onLoadEstoque(item.item_id)}}
                                            >
                                                editar lote
                                            </Button>
                                            <Button
                                                sx={{marginLeft:'10px'}}
                                                variant="contained"
                                                size="small"
                                                onClick={() =>{adicionarItens(quantidade)}}
                                            >
                                                Adcionar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </TableMui>
                    </TableContainer>
                : null}
                
                { tabelaItensDefinidos?
                    <Box component={Paper} margin={2}>
                        <Typography mt={5} mb={1} color='primary'>Itens Inseridos</Typography>
                        <Table
                            columns = {columns}
                            rows = {rows}
                            check={tableCheckbox}
                            height={270}
                        />
                    </Box>     
                : null}
                <Divider sx={{marginTop:"100px"}} />
                <Box display='flex' justifyContent={"end"} gap='10px' p={2}>
                    <Button variant="text" onClick={() => router.push('/solicitacao')}> Cancelar Edição</Button>
                    <Button variant="contained" onClick={() => onSave(state)}> Salvar</Button>
                </Box> 

                <DispensacaoCliente
                    openModal={openModal} 
                    onClose={() => setOpenModal(false)} 
                    onSave = {(dados)=> populaItem(dados)}
                    estoque={estoque}
                    solicitacao = {solicitacao}
                    itens = {dataItens}
                /> 
            </Box>
        </AppLayout>
    )
}