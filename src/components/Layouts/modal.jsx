import Backdrop from '@mui/material/Backdrop'
import {Box, Button, Divider, Modal as MuiModal, Typography} from "@mui/material";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useForm } from "react-hook-form";

export function Modal(props){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow:'hidden',
        width: 1100,
        boxShadow: 24,
        flexDirection:'column',
        borderRadius:3,
      }
    return(
        <MuiModal
            open = {props.open}
            onClose = {props.onClose}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            closeAfterTransition
            disableScrollLock
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 800,
            }}
        >
            {/* component="form" onSubmit={handleSubmit(onSubmit)} */}
             <Box style={style} bgcolor= 'background.paper'>
                <Box display='flex' justifyContent='space-between' p={2} backgroundColor='#F5F5F9'>
                        <Typography variant="h6" color='blue' alignItems='center' display='flex'>
                            {props.header}
                        </Typography>
                        <Button onClick={()=>props.onClose()}>
                            <ClearRoundedIcon color='primary' />
                        </Button>
                    </Box>
                    {/* <Divider width='100%' m={0} /> */}
                    {props.children}
                    <Divider />
                    <Box display='flex' justifyContent={"end"} gap='10px' p={2} backgroundColor='#F5F5F9' borderRadius={3}>
                        <Button variant="text" onClick={()=>props.onClose()}> Cancelar Edição</Button>
                        <Button type='submit' variant="contained" onClick={() => {props.onSave()}}> Salvar</Button>
                    </Box>
                <Box>
                </Box>
            </Box>
            
        </MuiModal>
    )    
}