import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { Solicitacao } from "@/lib/_solicitacao";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import useSolicitacaoStore from "@/hooks/solicitacao";

export default function Solicitacoes(){   
    const router = useRouter();
    const [state, setState] = useState({
        data:[],
        filter:[],
        buscaSolicitacao: '',
        buscaCPF: '',
        buscaNome: '',
        tableCheckbox: false,
    });
    const addData = useSolicitacaoStore(state=>state.addData);
    function onLoad(){
        Solicitacao.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
        setState({...state, data:result.data.data, filter:result.data.data})
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
    const rows = state.filter?.map((row)=>({
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
                onLoad()
            })    
        }else return;   
    }
    function pesquisar(solicitacao,cpf, nome){
        if(solicitacao){
            setState({...state, filter: state.data?.filter((data)=>{return data.name?.toUpperCase().startsWith(nome?.toUpperCase())})})
        }else if(cpf){
            setState({...state, filter: state.data?.filter((data)=>{return data.email?.toUpperCase().startsWith(email?.toUpperCase())})})
        }else if(nome){
            setState({...state, filter: state.data?.filter((data)=>{return data.beneficiario?.nome.toUpperCase().startsWith(nome?.toUpperCase())})})
        }else{
            setState({...state, filter:state.data})
        }
    }
    useEffect(()=>{
        onLoad()
    },[])
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
                    <Grid item xs={12} sm={4}>
                        <TextField
                        label="Nº da solicitação"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, buscaSolicitacao: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
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
                </Grid>
                <Box 
                    my={3}
                    display='flex'
                    justifyContent='right'    
                >
                    <Button 
                        variant="outlined"
                        onClick={()=> pesquisar(state.buscaSolicitacao,state.buscaCPF,state.buscaNome)}
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