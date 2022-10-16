import { useState,useEffect } from "react";
import { Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Estoque } from "@/lib/estoque";
import { Itens } from "@/lib/item";
import { Inventarios } from "@/lib/inventario";
import { UsuariosService } from "@/lib/usuario";
import AppLayout from "@/components/Layouts/AppLayout";
import { NovoInventario } from "@/components/Modal/inventario";
import { Table } from "@/components/Table";

export default function Inventario(){   

    const [usuario, setUsuario] = useState([]);
    const [estoque, setEstoque] = useState([]);
    const [item, setItem] = useState([]);
    const [state, setState] = useState({
        buscaCodigo: '',
        buscaDescricao: '',
        buscaPrincAtivo: '',
        buscaLote: '',
        buscaValidade: '',
        buscaCategoria: '',
        tableCheckbox: false,
        openModal:false,
        usuarios:[{}],
        data:[],
    });
    const [inventario, setInventario] = useState()
    const columns = [
        { field: 'id', headerName: '#', width: 50 },
        { field: 'nome', headerName: 'Nome', width: 210 },
        { field: 'data', headerName: 'Data', width: 210 },
        { field: 'actions',headerName: 'Ações',type:'actions',getActions: (params) => [
            <GridActionsCellItem icon={<DeleteIcon/>} onClick={() => onDelete(params.id)} label="Delete" />,
            <GridActionsCellItem icon={<ModeEditIcon/>} onClick={() => {onEdit(params.id)}} label="edit" />,
          ]
      }
    ]
    const rows = state.data?.map((row)=>({
        id:row.id,
        nome:row.responsavel_id,
        data:row.data?.split('-').reverse().join('/'), //Formatando data para modelo br
    }));
    function onLoad(){
        Inventarios.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setState({...state, data:result.data.data})
        });

        UsuariosService.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setUsuario(result.data.data)
        });

        Estoque.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setEstoque(result.data.data)
        });
        Itens.getAll()
        .then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                return;
            }
            setItem(result.data.data)
        });
    }
    function onSave(id,data){
        console.log(id,data);
        if(id!==undefined){
            Inventarios.updateById(id,data).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
                    return;
                }
                setState({...state,openModal:false})
            })
        }else{
            Inventarios.create(data).then((result)=>{
                if(result instanceof Error){
                    setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});                      
                        return;
                    }
                setState({...state, openModal:false})
            })
              
        }
    }
    function onDelete(id){
        if(confirm('Realmente deseja apagar?')){
            Inventarios.deleteById(id)
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
    function onEdit(id){
        Inventarios.
        getById(id).
        then((result)=>{
            if(result instanceof Error){
                setState({...state, openSnakebar:true, message:result.message, statusSnake:'error'});
            }
            setInventario(result)
            setState({...state,openModal:true})
        })
    }
    useEffect(()=>{
        onLoad()
    },[state.openModal])
    // console.log(inventario);

    // function pesquisar(buscaCodigo,buscaDescricao,buscaPrincAtivo,buscaLote,buscaValidade,buscaCategoria){
    //     if(buscaCodigo !==''){
    //         setState({...state, filter: data.filter((data)=>data.codigo.startsWith(buscaCodigo))})
    //     }else if(buscaDescricao !==''){
    //         setState({...state, filter: data.filter((data)=>data.descricao.toUpperCase().startsWith(buscaDescricao.toUpperCase()))})
    //     }else if(buscaPrincAtivo !==''){
    //         setState({...state, filter: data.filter((data)=>data.princAtivo.toUpperCase().startsWith(buscaPrincAtivo.toUpperCase()))})
    //     }else if(buscaLote!==''){
    //         setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaLote.toUpperCase()))})
    //     }else if(buscaValidade!==''){
    //         setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaValidade.toUpperCase()))})
    //     }else if(buscaCategoria!==''){
    //         setState({...state, filter:data.filter((data)=>data.lote.toUpperCase().startsWith(buscaCategoria.toUpperCase()))})
    //     }else{
    //         setState({...state, filter:data.filter((data)=>data.descricao.toUpperCase().startsWith(buscaDescricao.toUpperCase()))})
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
                        Inventário
                    </Typography>
                    
                </Box>
                <Box alignItems='center' display='flex'>
                    <Button 
                        variant="outlined"
                        onClick={() => {setState({...state, openModal:true})}}   
                    >
                         Novo inventário
                    </Button>
                </Box>

            </Box>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center'>
                <Grid container spacing={3} mb={4}>
                    <Grid item xs={12} sm={5}>
                        <TextField
                        type='date'
                        label="Data"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setState({...state, buscaCodigo: e.target.value})}
                        InputLabelProps={{
                            shrink: true,  
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                        label="Responsável"
                        fullWidth
                        placeholder="Usuário responsável pelo inventário"
                        variant="outlined"
                        onChange={(e) => setState({...state, buscaDescricao:e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} display='flex' alignItems='center' justifyContent='end' mb={1}>
                        <Button
                        
                        variant="outlined"
                        onClick={()=> pesquisar(state.buscaCodigo,state.buscaDescricao,state.buscaLote,state.buscaValidade,state.buscaPrincAtivo,state.buscaCategoria)}
                    >
                            Pesquisar
                        </Button>  
                    </Grid>
                </Grid>
                <Table
                    columns = {columns}
                    rows = {rows}
                    check={state.tableCheckbox}
                    height={400}
                />

                <NovoInventario
                    openModal={state.openModal} 
                    onClose={() => setState({...state, openModal: false})} 
                    usuario={usuario}
                    estoque = {estoque}
                    itens = {item}
                    inventario = {inventario}
                    onSave = {(id, dados)=> onSave( id,dados)}
                />
            </Box>

        </AppLayout>
    )
}