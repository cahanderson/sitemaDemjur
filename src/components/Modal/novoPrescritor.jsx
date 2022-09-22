import { Box, CssBaseline, Grid, TextField } from "@mui/material";
import { useState } from "react";
// import { useForm } from 'react-hook-form';
import { Modal } from '../Layouts/modal';    

export function NovoPrescritor(props){
    // const {register, handleSubmit, setValue} = useForm()

    const [prescritor, setPrescritor] = useState({
        nome:'',
        conselho_regional:'',
        registro_conselho:'',
        "is_beneficiario": false,
        "is_prescritor": true,
        "is_fornecedor": false,
    })

    function reset(){
        setPrescritor([{ nome:'',conselho_regional:'',registro_conselho:'',}])
    }

    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose(), reset()}}
            header='Novo Prescritor'
            onSave = {()=>{props.Save(prescritor)}}
        >  
            <CssBaseline />  
            <Box sx={{flexGrow:1}} padding='10px' justifyContent='center' alignItems='center' my={2} >
                <Grid item xs={11} container spacing={3}>
                    <Grid item md={4}>
                        <TextField
                            value={prescritor.nome}
                            name="nome"
                            label="Nome"
                            fullWidth
                            // {...register('nome')}
                            onChange={(e)=> setPrescritor({...prescritor,nome:e.target.value})}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            value={prescritor.conselho_regional}
                            name="conselho_regional"
                            label="Conselho regional"
                            // {...register('conselho_regional')}
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
                            // {...register('registro_conselho')}
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