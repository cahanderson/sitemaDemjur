import { Box, Button, Paper, TextField} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DataGrid from './DataGrid'
import { GridActionsCellItem } from '@mui/x-data-grid';

export function Table(props){

    
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nome', width: 130 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'actions',type:'actions',getActions: (params) => [
              <GridActionsCellItem icon={<DeleteIcon/>} onClick={() => props.onDelete(params.id)} label="Delete" />,
              <GridActionsCellItem icon={<ModeEditIcon/>} onClick={() => props.onEdit(params.id)} label="edit" />,
            ]
        }  
    ]

    const rows = props.data.map((row)=>({
        id:row.id,
        name:row.name,
        email:row.email,
        action:null,
    }));   

    return(
        <div style={{ height:400, width: '100%', }}>
                <DataGrid
                    isLoading={!rows}
                    rows={rows}
                    columns={columns}
                    getRowId={rows.id}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
        </div>
          
    )
}