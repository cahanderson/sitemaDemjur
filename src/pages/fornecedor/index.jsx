import AppLayout from "@/components/Layouts/AppLayout";
import { NovoFornecedor } from "@/components/Modal/fonecedores";
import { Table } from "@/components/Table";
import { Fornecedores } from "@/lib/usuarios/fornecedores";
import { Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

export default function Item(){

    const [state, setState] = useState({
        buscaFornecedor: '',
        buscaCpf: null,
        buscaTelefone: '',
        tableCheckbox: false,
        data:[],
        filter: [],
        openModal:false,
    });

    function onLoad(){
        Fornecedores.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setState({...state, data:result.data, filter:result.data, busca:''})
        }) 
    }

    useEffect(()=>{
        onLoad();
    },[state.openModal])
    const columns = [
        { field: 'id', headerName: '#', width: 210 },
        { field: 'cpfCnpj', headerName: 'CPF/CNPJ', width: 210 },
        { field: 'nome', headerName: 'Nome/Fornecedor', width: 210 },
        { field: 'telefone', headerName: 'Telefone', width: 210 },
    ]
    const rows = state.filter.map((row)=>({
        id:row.id,
        cpfCnpj:row.cpfCnpj,
        nome:row.nome,
        telefone:row.telefone,
    }));
    console.log(state.data);

    function onSave(fornecedor){
        // if(data.id){
        //     // console.log(data.id)
        //     Itens.updateById(data.id, data).
        //     then((result)=>{
        //         if(result instanceof Error){
        //             setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
        //             return;
        //         }
        //         setState({...state,openModal:false})
        //     })   
        // }else{
        Fornecedores.create(fornecedor).then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                   
                    return;
                }
            setState({...state, openModal:false})
        })
    }
    // }

    // function pesquisar(buscaCodigo,buscaDescricao,buscaPrincAtivo,buscaLote,buscaValidade,buscaCategoria){
    //     if(buscaCodigo !==''){
    //         setState({...state, filter: data.filter((data)=>data.codigo.startsWith(buscaCodigo))})
    //     }else if(buscaDescricao !==''){
    //         setState({...state, filter: data.filter((data)=>data.descricao.toUpperCase().startsWith(buscaDescricao.toUpperCase()))})
    //     }else if(buscaPrincAtivo !==''){
    //         setState({...state, filter: data.filter((data)=>data.princAtivo.toUpperCase().startsWith(buscaPrincAtivo.toUpperCase()))})
    //     }else if(buscaLote!==''){
    //         setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaLote.toUpperCase()))})
    //     }else if(buscaValidade!==''){
    //         setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaValidade.toUpperCase()))})
    //     }else if(buscaCategoria!==''){
    //         setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaCategoria.toUpperCase()))})
    //     }else{
    //         setState({...state, filter:data.filter((data)=>data.descricao.toUpperCase().startsWith(buscaDescricao.toUpperCase()))})
    //     };
    // }


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
                    <Typography variant='h5' component='h1' color='secondary'>
                        Fornecedores
                    </Typography>
                    
                </Box>
                <Box alignItems='center' display='flex'>
                    <Button 
                        variant="outlined"
                        onClick={() => {setState({...state, openModal:true})}}   
                    >
                         Novo Fornecedor
                    </Button>
                </Box>

            </Box>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center'>
                <Grid container spacing={3} mb={4}>
                    <Grid item xs={12} sm={5}>
                        <TextField
                        label="Fornecedor"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, buscaFornecedor: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                        label="CPF/CNPJ"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, buscaCpf:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} display='flex' alignItems='center' justifyContent='end' mb={1}>
                        <Button
                        
                        variant="outlined"
                        onClick={()=> pesquisar(state.buscaFornecedor,state.buscaCpf)}
                    >
                            Pesquisar
                        </Button>  
                    </Grid>
                </Grid>
                <Table
                    columns = {columns}
                    rows = {rows}
                    check={state.tableCheckbox}
                    height={400}
                />

                <NovoFornecedor
                    openModal={state.openModal} 
                    onClose={() => setState({...state, openModal: false})} 
                    // usuario={state.usuario}
                    Save = {(fornecedor)=> onSave(fornecedor)}
                    // keyDown = {(event, data) => handleKeyDown(event, data)}
                />
            </Box>

        </AppLayout>
    )
}