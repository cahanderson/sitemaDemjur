import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import {Button, Divider, Typography } from '@mui/material';
import { Modal } from '../Layouts/modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export function Preview(props){
    console.log(props.params.itens);
    return(
        <Modal
            open={props.openModal}
            onClose={()=>{props.onClose()}}
            onSave = {()=>props.onSave(itens)}
            header='preview'
            //enviando informações para o botão save
        >
            <Box my={2} p={2}>
                <Grid container spacing={3} >
                    <Grid item xs={2}>
                        <Typography>Tipo movimentação</Typography>
                        <Typography>{props?.params.d_tipo_movimentacao}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>Fornecedor</Typography>
                        <Typography>{props?.params.fornecedor.nome}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>Efetivado</Typography>
                        <Typography>{props.params?.is_efetivado?'sim':'não'}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>Valor</Typography>
                        <Typography>{props.params?.valor}</Typography>
                    </Grid>
                    
                </Grid>
                <Box>
                    {props.params.itens.map((i,index) =>(
                    <List sx={{ width: '50%', maxWidth: 360}}>
                        <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {`Item: ${i.item.nome} - Quantidade:R$ ${i.quantidade}`}
                                        </Typography>
                                    }
                                />
                        </ListItem>
                    </List>
                    ))}
                </Box>
                <Box display='flex' justifyContent={"end"} gap='10px' p={2} >
                        <Button variant="text" > Editar</Button>
                        <Button variant="text" > Editar</Button>
                        <Button variant="text" > Excluir</Button>
                    </Box>
            </Box>
        </Modal>
    )
}