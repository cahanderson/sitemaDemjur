import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Alert, Box, Button, CssBaseline, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { Solicitacao } from "@/lib/solicitacao";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import useSolicitacaoStore from "@/hooks/solicitacao";
import useSolicitacaoDispensacaoStore from "@/hooks/solicitacaoDispensacao";
import { mask, unMask } from 'remask'

export default function Solicitacoes(){
    const addDispensacao = useSolicitacaoDispensacaoStore(state=>state.addData);
    const addData = useSolicitacaoStore(state=>state.addData);
    const router = useRouter();
    const [state, setState] = useState({
        data:[],
        filter:[],
        buscaSolicitacao: '',
        buscaCPF: '',
        buscaNome: '',
        tableCheckbox: false,
        openSnakebar:false,
        statusSnake:'success',
        message:'',
    });
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
        { field: 'dispensacao',type:'actions', headerName: 'Dispensação',width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    size='small'
                    onClick={()=>dispensarPaciente(params)}
                >
                    Dispensação
                </Button>
            )
        },
        { field: 'actions',type:'actions', headerName: 'Ações',width: 150,getActions: (params) => [
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
    function dispensarPaciente(params){
        addDispensacao(params.row.id)
        router.push('movimentacao/form_saidaPaciente')
    }
    function onEdit(id){
        addData(id)
        router.push('/solicitacao/form')
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
    function pesquisar(buscaSolicitacao,buscaCPF,buscaNome){
        if(buscaSolicitacao){
            setState({...state, filter: state.data?.filter((data)=>{return data.numero_solicitacao?.startsWith(buscaSolicitacao)})})
        }else if(buscaCPF){
            setState({...state, filter: state.data?.filter((data)=>{return data.beneficiario.cpf?.startsWith(buscaCPF)})})
        }else if(buscaNome){
            setState({...state, filter: state.data?.filter((data)=>{return data.beneficiario.nome?.toUpperCase().startsWith(buscaNome?.toUpperCase())})})
        }else{
            setState({...state, filter:state.data})
        }
    }
    function closeSnakebar(){
        setState({...state, openSnakebar:false})
    }
    useEffect(()=>{
        onLoad()
        addData('')
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
                    <Typography variant='h4' component='h1' color='secondary'>
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
                <Snackbar 
                    open={state.openSnakebar} 
                    autoHideDuration={3000} 
                    onClose={closeSnakebar}
                    anchorOrigin={{
                        horizontal: "right",
                        vertical: "top",
                    }}
                >
                    <Alert onClose={closeSnakebar} severity={state.statusSnake} sx={{ width: '100%' }}>
                        {state.message}
                    </Alert>
                </Snackbar>
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
                            value={mask(unMask(state.buscaCPF),['999.999.999-99'])}
                            onChange={(e) => setState({...state, buscaCPF:unMask(e.target.value)})}
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