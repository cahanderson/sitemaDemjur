import { useState,useEffect } from 'react';
import { Box, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { Estoque } from "@/lib/estoque";
import { Itens } from "@/lib/item";
import { UsuariosService } from "@/lib/usuario";

export default function NovoInventario(){
    const [usuario, setUsuario] = useState([]);
    const [estoque, setEstoque] = useState([]);
    const [itens, setItens] = useState([]);
    const [itensCadastrados, setItensCadastrados] = useState([]);
    const [state, setState] = useState({
        data:'',
        responsavel_id:'',
        itens:[]
    })
    const rows = estoque.map((row)=>({
        id:row.id,
        item:row.item_id,
        validade:row.data_validade,
        lote:row.lote,
        fator_embalagem:row.fator_embalagem,
        valor:row.valor_atual,
        qtd_anterior:row.quantidade,
    }));

    const columns = [
        { field: 'id', headerName: '#', width: 50 },
        { field: 'item', headerName: 'Item', width: 150 },
        { field: 'validade', headerName: 'Validade', width: 150 },
        { field: 'lote', headerName: 'Lote', width: 150 },
        { field: 'fator_embalagem', headerName: 'Fator embalagem', width: 150 },
        { field: 'valor', headerName: 'Valor', width: 150 },
        { field: 'qtd_anterior', headerName: 'Quantidade anterior', width: 210 },
        { field: 'qtd', headerName: 'Quantidade atual', width: 200,
            renderCell: (params) => (
                <TextField
                    type='number'
                    variant="standard"
                    fullWidth
                    label='Quantidade atual'
                    name='item_id'
                    maxLength={10}
                    onChange={(e)=>onAddQuantidade(e.target.value,params.row)}
                />
            )
        }
    ]

    function onAddQuantidade(value, row){
        let clone = Object.assign({}, row);
        console.log(clone);
        // clone.quantidade = value;
        // let itemIndex = itens.findIndex((i)=>i.id == clone.id)
        // if(itemIndex>=0){
        //     itens[itemIndex].quantidade = value;
        //     setItens(itens)
        // }else{
        //     let addItem = itens;
        //     addItem.push(clone)
        //     setItens(addItem)
        // }
    }
    // const [calc, setCalc] = useState([{
    //     diferenca_qtd:'',
    //     diferenca_valor:'',
    // }])
    // function limparItem(){
    //     setState({data:'',responsavel_id:'',itens:[]})
    //     setItem([{item_id:'',qtd_atual:'',valor_atual:'',valor_anterior:'',qtd_anterior:'',diferenca_qtd:'',diferenca_valor:'',lote:''}])
    //     setCalc([{diferenca_qtd:'',diferenca_valor:''}])
    // }
    function onLoad(){
        UsuariosService.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setUsuario(result.data.data)
        });

        Estoque.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setEstoque(result.data.data)
        });
        Itens.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setItensCadastrados(result.data.data)
        });
    }
    useEffect(()=>{
        onLoad()
    },[])
    return(
        <AppLayout>
            <Typography variant='h5' component='h1' color='secondary'>
                Novo inventário
            </Typography>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mt={2}>
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                            <TextField
                            value={state.data}
                            type='date'
                            name="data"
                            label="Data"
                            fullWidth
                            variant="outlined"
                            onChange={(e)=> setState({...state, data:e.target.value})}
                            InputLabelProps={{
                                shrink: true,  
                            }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                value={state.responsavel_id}
                                select
                                name="responsavel_id"
                                label='Responsável'
                                fullWidth
                                placeholder='Usuário responsável pelo inventário'
                                autoComplete="shipping address-line2"
                                variant="outlined"
                                onChange={(e)=> setState({...state, responsavel_id:e.target.value})}
                            >
                                {usuario?.map((user, index)=>(
                                    <MenuItem key={index} value={user.id}>{user.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>  
                    </Grid>
                </Box>
                
                <Table
                    columns = {columns}
                    rows = {rows}
                    check={state.tableCheckbox}
                    height={400}
                />      
                
            </Box>
        </AppLayout>
    )
}

















//     useEffect(()=>{
//         if(props.inventario?.id != null|| props.inventario?.id != undefined){
//             setState({...state,data:props.inventario.data, responsavel_id:props.inventario.responsavel_id})
//             const editItem = props.inventario.itens.map((item)=>({
//                 id:item.id,
//                 item_id:item.item_id,
//                 qtd_atual:item.qtd_atual,
//                 valor_atual:item.valor_atual,
//                 qtd_anterior: item.qtd_anterior,
//                 lote:item.lote,
//                 valor_anterior:item.valor_atual,

//             }))
//             const editcalc = props.inventario.itens.map(item=>({
//                 diferenca_qtd:item.diferenca_qtd,
//                 diferenca_valor:item.diferenca_valor,
//             }))
//             setItem(editItem)
//             setCalc(editcalc)
//        }else{
//            limparItem()
//        }
//    },[props.inventario?.id])