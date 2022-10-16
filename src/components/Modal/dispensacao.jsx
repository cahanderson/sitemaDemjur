import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import {TextField } from '@mui/material';
import { useEffect, useState } from "react";
import { Modal } from '../Layouts/modal';
import { Table } from '../Table';

export function Dispensacao(props){
    const [somaEmbalagemDispensacao, setEmbalagemDispensacao] = useState(0)
    const [somaItensDispensacao, setSomaItensDispensacao] = useState(0)
    const [somaEmbalagem, setSomaEmbalagem] = useState(0)
    const [state, setState] = useState({
        quantidade:'',
        tableCheckbox: false,
    })
    const[itens, setItens] = useState([])

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

    const rows = props.estoque?.map((row)=>({
        id:row.id,
        item_id: row.item_id,
        item_nome: row.item.nome,
        lote:row.lote,
        data_validade:row.data_validade.split('-').reverse().join('/'),
        fator_embalagem:row.fator_embalagem,
        quantidade:row.quantidade,
        valor_unit: row.valor_atual,
    }));

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

    function soma(){
        let soma = 0;
        let somaEmbalagemDispensacao = 0;
        let somaItensDispensacao = 0;
        props.estoque?.map(item=>{
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
    }
    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparItem()}}
            onSave = {()=>props.onSave(itens)}
            header='Dispensação'
            //enviando informações para o botão save
        >
            <Box my={2} p={2}>
                <Grid container spacing={3} >
                    <Grid item xs={2}>
                        <TextField
                            variant="standard"
                            label='Tipo de saída'
                            fullWidth
                            type="text"
                            name='TipoSaida'
                            // onChange={(e)=> setState({...state, name:e.target.value})}
                            value={props.data?.d_tipo_movimentacao}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label='Item'
                            name='item_id'
                            type="text"
                            value={props.estoque[0]?.item.nome}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label='Saldo de embalagens'
                            name='saldoEmbalagens'
                            value={somaEmbalagem}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Box my={2}>
                    <Table 
                        columns = {columns}
                        rows = {rows}
                        check={state.tableCheckbox}
                        height={265}
                    />
                </Box>
                <Grid container spacing={3} >
                    <Grid item xs={4}>
                        <TextField
                            variant="standard"
                            label='Embalagens na dispensação atual'
                            fullWidth
                            type="text"
                            name='TipoSaida'
                            value={somaEmbalagemDispensacao}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label='Itens por embalagem na dispensação atual'
                            name='item'
                            type="text"
                            value={somaItensDispensacao}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}