import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import {TextField } from '@mui/material';
import { useState } from "react";
import { Modal } from '../Layouts/modal';
import { Table } from '../Table';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
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

export function Dispensacao(props){
    const [state, setState] = useState({
        filter: data,
        QtdEmbalagemDispensar: '',
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
                            value={state.name}
                            />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            variant="standard"
                            fullWidth
                            label='Item'
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
                            label='Saldo de embalagens'
                            type="number"
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