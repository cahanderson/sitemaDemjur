import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { Solicitacao } from "@/lib/solicitacao";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import useSolicitacaoStore from "@/hooks/solicitacao";

export default function Solicitacoes(){   
    const router = useRouter();
    const [state, setState] = useState({
        buscaSolicitacao: '',
        data:[],
        data_id:[],
        buscaCPF: '',
        buscaNome: '',
        buscaMae: '',
        tableCheckbox: false,
        form:false,
    });
    const addData = useSolicitacaoStore(state=>state.addData);

    useEffect(()=>{
        onLoadSolicitacao()
    },[])
    function onLoadSolicitacao(){
        Solicitacao.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setState({...state, data:result.data.data})
        })
    }
    const columns = [
        { field: 'solicitacao', headerName: 'Nº de solicitações', width: 240 },
        { field: 'nome', headerName: 'Nome', width: 240 },
        { field: 'cpf', headerName: 'CPF', width: 240 },
        { field: 'nome_da_mae', headerName: 'Nome da mãe', width: 220 },
        { field: 'dt_nascimento', headerName: 'Data de nascimento', width: 200 }, 
        { field: 'actions',type:'actions',getActions: (params) => [
            <GridActionsCellItem icon={<DeleteIcon/>} onClick={() => onDelete(params.id)} label="Delete" />,
            <GridActionsCellItem icon={<ModeEditIcon/>} onClick={() => onEdit(params.id)} label="edit" />,
          ]
        }
    ]
    const rows = state.data?.map((row)=>({
        id:row.id,
        solicitacao:row.numero_solicitacao,
        nome:row.beneficiario?.nome,
        cpf:row.beneficiario?.cpf,
        nome_da_mae:row.beneficiario?.nome_mae,
        dt_nascimento:row.beneficiario?.data_nascimento,
    }));

    function onEdit(id){
        Solicitacao.getById(id).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
            }
            // setState({...state, data_id:result.data})
            addData(result.data)
            router.push('/solicitacao/form')
        })

    }
    function onDelete(id){
        if(confirm('Realmente deseja apagar?')){
            Solicitacao.deleteById(id)
            .then(result => {
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});  
                }else{
                    setState({...state, openSnakebar:true, message:'Apagado com Sucesso', statusSnake:'success'});  
                }    
                onLoadSolicitacao()
            })    
        }else return;   
    }
    console.log(state.data_id);

    // function pesquisar(buscaSolicitacao,buscaCPF,buscaNome,buscaMae){
    //     if(buscaSolicitacao !==''){
    //         setState({...state, filter: data.filter((data)=>data.solicitacoes.toUpperCase().startsWith(buscaSolicitacao.toUpperCase()))})
    //     }else if(buscaCPF !==''){
    //         setState({...state, filter: data.filter((data)=>data.cpf.startsWith(buscaCPF))})
    //     }else if(buscaNome !==''){
    //         setState({...state, filter: data.filter((data)=>data.nome.toUpperCase().startsWith(buscaNome.toUpperCase()))})
    //     }else if(buscaMae !==''){
    //         setState({...state, filter:data.filter((data)=>data.nome_da_mae.toUpperCase().startsWith(buscaMae.toUpperCase()))})
    //     }else{
    //         setState({...state, filter:data.filter((data)=>data.nome_da_mae.toUpperCase().startsWith(buscaMae.toUpperCase()))})
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
                        Solicitações
                    </Typography>
                    
                </Box>
                <Box alignItems='center' display='flex'>
                    <Button 
                        variant="outlined"
                        onClick={()=> router.push('/solicitacao/form')}
                    >
                         Nova Solicitação 
                    </Button>
                </Box>

            </Box>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                        <TextField
                        label="Nº da solicitação"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, buscaSolicitacao: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                        label="CPF"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, buscaCPF:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                        label='Nome'
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, buscaNome:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                        label="Nome da mãe"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, buscaMae:e.target.value})}
                        />
                    </Grid>
                </Grid>
                <Box 
                    my={3}
                    display='flex'
                    justifyContent='right'    
                >
                    <Button 
                        variant="outlined"
                        onClick={()=> pesquisar(state.buscaSolicitacao,state.buscaCPF,state.buscaNome,state.buscaMae)}
                    >
                        Pesquisar
                    </Button>
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