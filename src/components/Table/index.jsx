import DataGrid from './DataGrid'

export function Table(props){

     

    return(
        <div style={{ height:400, width: '100%', }}>
                <DataGrid
                    isLoading={!props.rows}
                    rows={props.rows}
                    columns={props.columns}
                    getRowId={props.rows.id}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection={props.check? true : null}
                    disableSelectionOnClick
                />
        </div>
          
    )
}