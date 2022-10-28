import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import {Checkbox, FormControlLabel, FormGroup, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useState } from "react";
import { Modal } from '../Layouts/modal';
import { Table as TableMui } from '../Table';
import { useEffect } from 'react';
import { Estoque } from '@/lib/estoque';

export function DispensacaoCliente(props){
    const [somaEmbalagemDispensacao, setEmbalagemDispensacao] = useState(0)
    const [somaItensDispensacao, setSomaItensDispensacao] = useState(0)
    const [somaEmbalagem, setSomaEmbalagem] = useState(0)
    const [itens, setItens] = useState([])
    const [estoque, setEstoque] = useState([])
    const [state, setState] = useState({
        QtdEmbalagemDispensar: '',
        itemIdDiferenteSolicitado: '',
        check:false,
    })
    const rowsForm = props.estoque?.map((row)=>({
        id:row.id,
        item_id: row.item_id,
        item_nome: row.item?.nome,
        lote:row.lote,
        data_validade:row.data_validade.split('-').reverse().join('/'),
        fator_embalagem:row.fator_embalagem,
        valor: row.valor_atual,
        quantidade:row.quantidade,
    }));
    const columns = [
        { field: 'lote', headerName: 'Lote', width: 150 },
        { field: 'data_validade', headerName: 'Validade', width: 180 },
        { field: 'fator_embalagem', headerName: 'Fator embalagem', width: 200 },
        { field: 'quantidade', headerName: 'Qtd de embalagens', width: 200 },
        { field: 'qtd', headerName: 'Quantidade a dispensar', width: 300,
            renderCell: (params) => (
                <TextField
                    type='number'
                    variant="standard"
                    fullWidth
                    label='Digite a quantidade a dispensar'
                    name='item_id'
                    maxLength={10}
                    onChange={(e)=>setValue(e.target.value,params.row)}
                />
            )
        }
    ]
    const rows = estoque?.map((row)=>({
        id:row.id,
        item_id: row.item_id,
        item_nome: row.item.nome,
        lote:row.lote,
        data_validade:row.data_validade.split('-').reverse().join('/'),
        fator_embalagem:row.fator_embalagem,
        valor: row.valor_atual,
        quantidade:row.quantidade,
    }));

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

    function soma(){
        let soma = 0;
        let somaEmbalagemDispensacao = 0;
        let somaItensDispensacao = 0;
        let somaEstoque = state.check ? estoque : props.estoque;
        somaEstoque?.map(item=>{
            soma += item.quantidade;
        })
        itens.map(item=>{
            somaItensDispensacao += parseInt(item.quantidade) * parseInt(item.fator_embalagem);
            somaEmbalagemDispensacao += parseInt(item.quantidade);
        })
        setSomaEmbalagem(soma)
        setEmbalagemDispensacao(somaEmbalagemDispensacao)
        setSomaItensDispensacao(somaItensDispensacao)
    }

    function limparItem(){
        setItens([]);
        setEmbalagemDispensacao(0)
        setSomaItensDispensacao(0) 
        setSomaEmbalagem(0)     
    }

    function setValue(value, row){
        let clone = Object.assign({}, row);
        if(clone.quantidade >= value){
            clone.quantidade = value;
            let itemIndex = itens.findIndex((i)=>i.id == clone.id)
            if(itemIndex>=0){
                itens[itemIndex].quantidade = value;
                setItens(itens)
            }else{
                let addItem = itens;
                addItem.push(clone)
                setItens(addItem)
            }
            soma()
        }else{
            alert('Valor inserido é maior do que o estoque')
            value = 0;

        }
    }

    useEffect(()=>{
        limparItem()
    },[state.check])

    useEffect(()=>{
        soma()
    },[state.itemIdDiferenteSolicitado, state.check])
    
    useEffect(()=>{
        if(state.itemIdDiferenteSolicitado){
            onLoadEstoque(state.itemIdDiferenteSolicitado)
        }
    },[state.itemIdDiferenteSolicitado])
    
    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparItem()}}
            onSave = {()=>props.onSave(itens)}
            // onSave = {()=>console.log(itens)}
            header='Dispensação para paciente'
        >
            <Box my={1} p={2}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell component='th'>Nº Solicitação</TableCell>
                                <TableCell>Nome Solicitante</TableCell>
                                <TableCell >Qtd.Programada</TableCell>
                                <TableCell >Limite</TableCell>
                                <TableCell >Atendido</TableCell>
                                <TableCell >Atendido mês atual</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{props.solicitacao?.numero_solicitacao}</TableCell>
                                <TableCell >{props.solicitacao?.beneficiario.nome}</TableCell>
                                <TableCell >{props.parametros?.qtdProg}</TableCell>
                                <TableCell >{props.parametros?.qtdLimite}</TableCell>
                                <TableCell >N/S</TableCell>
                                <TableCell >N/S</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            <FormGroup sx={{mt:'20px'}}>
                <FormControlLabel control={<Checkbox checked={state.check} onChange={()=>setState({...state, check:!state.check})} />} label="Usar um item diferente do solicitado?" />
            </FormGroup>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={7} disabled>
                    <TextField
                        select
                        variant="standard"
                        disabled={!state.check}
                        label='Item'
                        fullWidth
                        value={state.itemIdDiferenteSolicitado}
                        name='saldoEmbalagens'
                        onChange={(e)=> setState({...state, itemIdDiferenteSolicitado:e.target.value})}
                    >
                        {props.itens.map((item, index)=>( <MenuItem key={index} value={item.id}>{item.nome} </MenuItem> ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Typography>Saldo de embalagens</Typography>
                    <Typography>{somaEmbalagem}</Typography>
                </Grid>
            </Grid>


            <Box my={2}>
                <TableMui 
                    columns = {columns}
                    rows = {state.check? rows : rowsForm}
                    check={state.tableCheckbox}
                    height={215}
                />
            </Box>
            <Grid container spacing={3} >
                <Grid item xs={4}>
                    <Typography>Embalagens na dispensação atual</Typography>
                    <Typography>{somaEmbalagemDispensacao}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography>Itens por embalagem na dispensação atual</Typography>
                    <Typography>{somaItensDispensacao}</Typography>
                </Grid>
            </Grid>
            </Box>
        </Modal>
    )
}