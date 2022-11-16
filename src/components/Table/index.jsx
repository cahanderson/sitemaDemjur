import DataGrid from './DataGrid'

export function Table(props){
    const style = {
        height: props.height,
        width:'100%'
    }
     

    return(
        <div style={style}>
                <DataGrid
                    isLoading={!props.rows}
                    rows={props.rows}
                    columns={props.columns}
                    getRowId={props.rows.id}
                    pageSize={15}
                    rowsPerPageOptions={[5]}
                    checkboxSelection={props.check? true : null}
                    disableSelectionOnClick
                />
        </div>
          
    )
}