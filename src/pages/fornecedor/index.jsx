import { useEffect,useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import { NovoFornecedor } from "@/components/Modal/fonecedor";
import { Table } from "@/components/Table";
import { Fornecedor } from "@/lib/fornecedor";
import { GridActionsCellItem } from "@mui/x-data-grid";

export default function Item(){

    const [state, setState] = useState({
        buscaFornecedor: '',
        buscaCpf: null,
        buscaTelefone: '',
        tableCheckbox: false,
        data:[],
        openModal:false,
        fornecedor:[],
    });
    const [pessoa, setPessoa] = useState({
        "is_beneficiario": false,
        "is_prescritor": false,
        "is_fornecedor": true,
    });

    function onLoad(pessoa){
        Fornecedor.getPessoa(pessoa)
        .then((result)=>{
            if(result instanceof Error){
                setMessage({...message, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setState({...state, data:result.data.data})
            

    })}

    function onDelete(id){
        if(confirm('Realmente deseja apagar?')){
            Fornecedor.deleteById(id)
            .then(result => {
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});  
                }else{
                    // setState({...state, openSnakebar:true, message:'Apagado com Sucesso', statusSnake:'success'});  
                }    
                onLoad(pessoa)
            })    
        }else return;   
    }

    function onEdit(id){
        Fornecedor.getById(id).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
            }
            setState({...state, fornecedor:result.data, openModal:true})
            
        })
    }

    function onSave(fornecedor,id){
        if(id){
            Fornecedor.updateById(id, fornecedor).
            then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                    return;
                }
                setState({...state,openModal:false})
            })   
        }else{
        Fornecedor.create(fornecedor).then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                   
                    return;
                }
            setState({...state, openModal:false})
        })
        }
    }
    const columns = [
        { field: 'nome', headerName: 'Nome/Fornecedor', width: 300 },
        { field: 'cpf', headerName: 'CPF', width: 280 },
        { field: 'cnpj', headerName: 'CNPJ', width: 280 },
        { field: 'telefone', headerName: 'Telefone', width: 280 },
        { field: 'actions',type:'actions',getActions: (params) => [
            <GridActionsCellItem icon={<DeleteIcon/>} onClick={() => onDelete(params.id)} label="Delete" />,
            <GridActionsCellItem icon={<ModeEditIcon/>} onClick={() => onEdit(params.id)} label="edit" />,
          ]
        }

    ]
    const rows = state.data.map((row)=>({
        id:row.id,
        cpf:row.cpf,
        cnpj: row.cnpj,
        nome:row.nome,
        telefone:row.telefone,
    }));

    useEffect(()=>{
        onLoad(pessoa);
    },[state.openModal])
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
                        onClick={() => {setState({...state,fornecedor:[], openModal:true})}}   
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
                        name='fornecedor'
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
                    fornecedor={state.fornecedor}
                    Save = {(fornecedor,id)=> onSave(fornecedor,id)}
                    // keyDown = {(event, data) => handleKeyDown(event, data)}
                />
            </Box>

        </AppLayout>
    )
}