import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import { Skeleton } from '@mui/material';

const fakeRows = (columns, pageSize) => {

    let fakeRow = {};
    for (let i=0; i < columns.length; i++) {
        let c = columns[i];
        fakeRow[c.field] = "-";
    }

    let rows = [];
    for (let i=0; i< pageSize; i++) {
        rows.push({...fakeRow, ...{"id": "1000_" + i}});
    }
    return rows;
}

const CellSkeleton = (params) => {
    console.log(params)
    return (
        <div className="MuiDataGrid-cell" style={{ "width": params.width, "height": params.height}}>
            <Skeleton variant="rect" width={"100%"} height={20} />
        </div>
    )
}

const DataGrid = (props) => {


    return (
        <MuiDataGrid
            {...props}
            rows={props.isLoading ? fakeRows(props.columns, props.pageSize) : props.rows}
            components={props.isLoading ? { Cell: (params) => CellSkeleton(params)}: null}
            
        />
    );
}

export default DataGrid
