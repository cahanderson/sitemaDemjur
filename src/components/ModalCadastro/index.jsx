import styles from './styles.module.scss'

import Modal from "@mui/material/Modal";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Checkbox, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    flexDirection:'column',
    borderRadius:3,
  }
const permissoes = [
    'Alimentação de valores das variáveis',
    'Cadastro, edição e exclusão de bairros',
    'Cadastro, edição e exclusão de domínios dos indicadores',
    'Cadastro, edição e exclusão de indicadores',
    'Cadastro, edição e exclusão de usuários',
    'Cadastro, edição e exclusão de variáveis',
]

export function ModalCadastro(props){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    useEffect(()=>{
         if(props.usuario.id != null|| props.usuario.id != undefined){
            setName(props.usuario.name);
            setEmail(props.usuario.email);
        }else{
            setName('');
            setEmail('');
        }
        console.log(props.usuario.id);
    },[props.usuario.id])

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    return(
        <>
            
            <Modal
                // style={style}
                open={props.openModal}
                onClose={()=>props.onClose()}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
            }}
            >
                <Box sx={style} >
                    <Box display='flex' justifyContent='space-between' p={2}>
                        <Typography variant="h6" color='blue'>
                            Usuários
                        </Typography>
                        <Button onClick={()=>props.onClose()}>
                            <ClearRoundedIcon color='primary' />
                        </Button>
                    </Box>
                    <Divider width='100%' m={0} />
                    <Box my={2} p={2}>
                        <Grid container spacing={3} >
                            <Grid item xs={6}>
                                <TextField
                                    className={styles.inputData}
                                    label='Nome'
                                    fullWidth
                                    type="text"
                                    name='nome'
                                    onChange={(e)=> setName(e.target.value)}
                                    value={name}
                                    aria-describedby="component-helper-text"
                                    onKeyDown={(event) => props.keyDown(event, {name, email, password, passwordConfirmation})}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={styles.inputData}
                                    fullWidth
                                    label='Email'
                                    name='email'
                                    type="email"
                                    required
                                    onChange={(e)=> setEmail(e.target.value)}
                                    value={email}
                                    aria-describedby="component-helper-text"
                                    onKeyDown={(event) => props.keyDown(event, {name, email, password, passwordConfirmation})}
                                />
                            </Grid>
                        
                            <Grid item xs={6}>
                                <TextField
                                    className={styles.inputData}
                                    fullWidth
                                    label='Senha'
                                    type="password"
                                    name='senha'
                                    aria-describedby="component-helper-text"
                                    onChange={(e)=> setPassword(e.target.value)}
                                    
                                />
                            </Grid>    
                            <Grid item xs={6}>
                                <TextField
                                    className={styles.inputData}
                                    fullWidth
                                    label='Confirme a Senha'
                                    name='passwordConfirmation'
                                    type="password"
                                    required
                                    aria-describedby="component-helper-text"
                                    onChange={(e)=> setPasswordConfirmation(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography variant="h6" p={2} fontWeight={1}>
                        Permissões
                        <Divider />
                    </Typography>
                    <Box p={2}>
                        <TableContainer  variant="outlined" sx={{ width: 'auto' }}>
                            <Table size={'small'}>
                                <TableBody>
                                    {permissoes.map(permissao => (
                                    <StyledTableRow key={permissao}>
                                        <TableCell sx={{padding:0}} align='left'><Checkbox/> {permissao}</TableCell>
                                    </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Divider />

                    <Box display='flex' justifyContent={"end"} gap='10px' p={2} backgroundColor='#F5F5F9' borderRadius={3}>
                        <Button variant="text" onClick={()=>props.onClose()}> Cancelar Edição</Button>
                        <Button variant="contained" onClick={() => props.onSave(props.usuario.id,{name, email, password, passwordConfirmation})}> Salvar</Button>
                    </Box>
                </Box>
        </Modal>
        </>
    )
}