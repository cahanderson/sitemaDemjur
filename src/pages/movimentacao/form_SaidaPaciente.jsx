import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from "react";
import { Table } from "@/components/Table";
import { GridActionsCellItem } from "@mui/x-data-grid";
import OutboxIcon from '@mui/icons-material/Outbox';
import { DispensacaoCliente } from "@/components/Modal/dispensacaoCliente";

const data = [
    {
        "itens":"dipirona monoidratada",
        "qtdProg":"10/mes",
        "qtdLimite":"50",
        "qtdAtendida":"30",
        "mesAtual":"0",
    },
    {
        "itens":"amoxicilina + clavulanato de potássio",
        "qtdProg":"20/mes",
        "qtdLimite":"20",
        "qtdAtendida":"4",
        "mesAtual":"8",
    },
    {
        "itens":"dorflex",
        "qtdProg":"20/mes",
        "qtdLimite":"0",
        "qtdAtendida":"10",
        "mesAtual":"4",
    },
    {
        "itens":"Amoxilina",
        "qtdProg":"5/mes",
        "qtdLimite":"20",
        "qtdAtendida":"3",
        "mesAtual":"2",
    },
];  

export default function Paciente(){

    const [state, setState] = useState({
        codigo:'',
        descricao:'',
        princAtivo:'',
        openModal: false,
        tableCheckbox:false,
        filter: data
    })
    const [item, setItem] = useState([{
        tipo:'',
        categoria:'',
        loteEValidade:false
    }])

    function handleOpenModal(id){
        setState({...state, openModal:true})
    }

    
    const columns = [
        { field: 'id', headerName: 'Itens', width:300 },
        { field: 'qtdProg', headerName: 'qtdProg', width: 150},
        { field: 'qtdLimite', headerName: 'qtdLimite', width: 150 }, 
        { field: 'qtdAtendida', headerName: 'qtdAtendida', width: 200 }, 
        { field: 'mesAtual', headerName: 'mesAtual', width: 180 }, 
        { field: 'Dispensação',headerName: 'Dispensação' ,type:'actions',getActions: (params) => [
            <GridActionsCellItem icon={<OutboxIcon />} onClick={() => handleOpenModal(params.id)} label="Dispensação" />
        ]}
    ]

    const rows = state.filter.map((row)=>({
        id:row.itens,
        qtdProg:row.qtdProg,
        qtdLimite:row.qtdLimite,
        qtdAtendida:row.qtdAtendida,
        mesAtual:row.mesAtual,
    }));


    return(
        <AppLayout>
            <Typography variant='h5' component='h1' color='secondary'>
                Saidas para paciente
            </Typography>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center' mt={2}>
                <Grid container spacing={3} mb={1}>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            select
                            id="tipo_Saida"
                            name="tipo_Saida"
                            label="Nº da solicitação"
                            fullWidth
                            variant="outlined"
                        >
                            {/* <MenuItem value='doacão'>Perca por validade</MenuItem>
                            <MenuItem value='aquisição'>Doação</MenuItem>
                            <MenuItem value='empréstimo'>Empréstimo</MenuItem>
                            <MenuItem value='empréstimo'>Outras percas</MenuItem> */}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            id="solicitante"
                            name="solicitante"
                            label='Solicitante'
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            id="cpf"
                            name="cpf"
                            label='CPF'
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                </Grid>    
                <Grid container spacing={3} my={1} mb={4} justifyContent='start'>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            id="cns"
                            name="cns"
                            label='CNS'
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            id="dateMovimentacao"
                            name="dateMovimentacao"
                            type="date"
                            label='Data da movimentação'
                            fullWidth
                            variant="outlined"
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
                
                <Table
                    columns = {columns}
                    rows = {rows}
                    check={state.tableCheckbox}
                    height={300}
                />
                <DispensacaoCliente
                    openModal={state.openModal} 
                    onClose={() => setState({...state, openModal: false})} 
                    onSave = {(id,data)=> onSave(id,data)}
                /> 
            </Box>
        </AppLayout>
    )
}