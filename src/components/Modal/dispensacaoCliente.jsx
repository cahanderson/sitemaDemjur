import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import {Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useState } from "react";
import { Modal } from '../Layouts/modal';
import { Table } from '../Table';
const data = [
    {
        "Lote":"123",
        "Validade":"20/07/2025",
        "FatorEmbalagem":"20",
        "QtdEmbalagens":"100",
        "QtdEmbalagemDispensar":"5",

    },
    {
        "Lote":"111",
        "Validade":"24/01/2025",
        "FatorEmbalagem":"30",
        "QtdEmbalagens":"102",
        "QtdEmbalagemDispensar":"9",

    },
    {
        "Lote":"25",
        "Validade":"29/11/2027",
        "FatorEmbalagem":"16",
        "QtdEmbalagens":"130",
        "QtdEmbalagemDispensar":"1",

    },
    {
        "Lote":"2526",
        "Validade":"20/12/2022",
        "FatorEmbalagem":"22",
        "QtdEmbalagens":"140",
        "QtdEmbalagemDispensar":"8",

    }
]; 

export function DispensacaoCliente(props){
    const [state, setState] = useState({
        filter: data,
        QtdEmbalagemDispensar: '',
        itemDiferenteSolicitado: '80254 - Dipirona monoidratada, 35mg de citrato de orfenadrina'
    })
    const columns = [
        { field: 'id', headerName: 'Lote', width: 150 },
        { field: 'Validade', headerName: 'Validade', width: 150 },
        { field: 'FatorEmbalagem', headerName: 'Fator embalagem', width: 200 },
        { field: 'QtdEmbalagens', headerName: 'Qtd de embalagens', width: 280 },
        { field: <TextField />, headerName: 'Qtd de embalagens a dispensar', width: 260 },
        // { field: 'actions',type:'actions',getActions: (params) => [
        //       <GridActionsCellItem icon={<DeleteIcon/>} onClick={() => onDelete(params.id)} label="Delete" />,
        //       <GridActionsCellItem icon={<ModeEditIcon/>} onClick={() => {onEdit(params.id)}} label="edit" />,
        //     ]
        // }  
    ]

    const rows = state.filter.map((row)=>({
        id:row.Lote,
        validade:row.Validade,
        FatorEmbalagem:row.FatorEmbalagem,
        QtdEmbalagens:row.QtdEmbalagens,
        QtdEmbalagemDispensar:row.QtdEmbalagemDispensar,
    }));

    return(
        <Modal
            open={props.openModal}
            onClose={()=>props.onClose()}
            // onSave = {()=>props.onSave(props.usuario.id,state)}
            header='Dispensação'
            //enviando informações para o botão save

        >
            <Box my={1} p={2}>
                <Grid container spacing={3} mb={2}>
                    <Grid item xs={3}>
                        <TextField
                            variant="standard"
                            label='Nº da solicitacão'
                            fullWidth
                            type="text"
                            name='TipoSaida'
                            // onChange={(e)=> setState({...state, name:e.target.value})}
                            value={state.name}
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label='Nome do solicitante'
                            name='item'
                            type="text"
                            // onChange={(e)=> setState({...state, email:e.target.value})}
                            // value={state.email}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label='Qtd Programada'
                            type="number"
                            name='saldoEmbalagens'
                            // onChange={(e)=> setState({...state, password:e.target.value})}
                            
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label='Limite'
                            name='item'
                            type="text"
                            // onChange={(e)=> setState({...state, email:e.target.value})}
                            // value={state.email}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label='Atendido'
                            type="number"
                            name='saldoEmbalagens'
                            // onChange={(e)=> setState({...state, password:e.target.value})}
                            
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label='Atendido mês atual'
                            type="number"
                            name='saldoEmbalagens'
                            // onChange={(e)=> setState({...state, password:e.target.value})}
                            
                        />
                    </Grid>
                </Grid>

                <FormGroup sx={{mt:'20px'}}>
                    <FormControlLabel control={<Checkbox />} label="Usar um item diferente do solicitado?" />
                </FormGroup>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            // select
                            variant="standard"
                            disabled
                            label='Item'
                            fullWidth
                            value={state.itemDiferenteSolicitado}
                            name='saldoEmbalagens'
                            // onChange={(e)=> setState({...state, password:e.target.value})}
                                    
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            variant="standard"
                            fullWidth
                            value='3'
                            label='Saldo de embalagens'
                            name='saldoEmbalagens'
                            // onChange={(e)=> setState({...state, password:e.target.value})}
                                    
                        />
                    </Grid>
                </Grid>


                <Box my={2}>
                    <Table 
                        columns = {columns}
                        rows = {rows}
                        check={state.tableCheckbox}
                        height={215}
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
                            // onChange={(e)=> setState({...state, name:e.target.value})}
                            value={state.name}
                            />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label='Itens por embalagem na dispensação atual'
                            name='item'
                            type="text"
                            // onChange={(e)=> setState({...state, email:e.target.value})}
                            // value={state.email}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}