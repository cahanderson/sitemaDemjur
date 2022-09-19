import ClearIcon from '@mui/icons-material/Clear';
import { Box, CssBaseline, Divider, Grid, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Modal } from '../Layouts/modal';    

export function NovoPrescritor(props){
    

    const [prescritor, setPrescritor] = useState({
        nome:'',
        conselho_regional:'',
        registro_conselho:'',
    })

    function limparPrescritor(){
        setPrescritor([{ nome:'',conselho_regional:'',registro_conselho:'',}])
    }

    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), limparPrescritor()}}
            header='Novo Prescritor'
            onSave = {()=>{props.Save(prescritor)}}
        >  
            <CssBaseline />      
            <Box sx={{flexGrow:1}} padding='10px' justifyContent='center' alignItems='center' my={2} >
                <Grid item xs={11} container spacing={3}>
                    <Grid item md={4}>
                        <TextField
                            value={prescritor.nome}
                            id="nome"
                            name="nome"
                            label="Nome"
                            fullWidth
                            onChange={(e)=> setPrescritor({...prescritor,nome:e.target.value})}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            value={prescritor.conselho_regional}
                            id="conselho_regional"
                            name="conselho_regional"
                            label="Conselho regional"
                            onChange={(e)=> setPrescritor({...prescritor,conselho_regional:e.target.value})}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            value={prescritor.registro_conselho}
                            id="registro_conselho"
                            name="registro_conselho"
                            label='Registro do conselho'
                            onChange={(e)=> setPrescritor({...prescritor,registro_conselho:e.target.value})}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Box>
                

        </Modal>
    )
}