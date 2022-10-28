import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Checkbox, Divider, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import { useEffect, useState } from "react";
import { Modal } from '../Layouts/modal';
import styled from '@emotion/styled';
const permissoes = [
    'Alimentação de valores das variáveis',
    'Cadastro, edição e exclusão de bairros',
    'Cadastro, edição e exclusão de domínios dos indicadores',
    'Cadastro, edição e exclusão de indicadores',
    'Cadastro, edição e exclusão de usuários',
    'Cadastro, edição e exclusão de variáveis',
]

export function Usuario(props){
    const [state, setState] = useState({
        name:'',
        email:'',
        password:'',
        passwordConfirmation:'',
    })

    useEffect(()=>{
         if(props.usuario.id != null|| props.usuario.id != undefined){
            setState({...state, name:props.usuario.name, email:props.usuario.email})
        }else{
            setState({...state, name:'', email:''})
        }
    },[props.usuario.id])

    //tema tabela
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
            <Modal
                open={props.openModal}
                onClose={()=>props.onClose()}
                onSave = {()=>props.onSave(props.usuario.id,state)}
                header='Usuarios'
                //enviando informações para o botão save

            >
                    <Box my={2} p={2}>
                        <Grid container spacing={3} >
                            <Grid item xs={6}>
                                <TextField
                                    label='Nome'
                                    fullWidth
                                    type="text"
                                    name='nome'
                                    aria-describedby="component-helper-text"
                                    // onKeyDown={(event) => props.keyDown(event, {name, email, password, passwordConfirmation})}
                                    // onChange={(e)=> setName(e.target.value)}
                                    onChange={(e)=> setState({...state, name:e.target.value})}
                                    value={state.name}
                                    />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label='Email'
                                    name='email'
                                    type="email"
                                    required
                                    aria-describedby="component-helper-text"
                                    // onKeyDown={(event) => props.keyDown(event, {name, email, password, passwordConfirmation})}
                                    // onChange={(e)=> setEmail(e.target.value)}
                                    onChange={(e)=> setState({...state, email:e.target.value})}
                                    value={state.email}
                                />
                            </Grid>
                        
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label='Senha'
                                    type="password"
                                    name='senha'
                                    aria-describedby="component-helper-text"
                                    onChange={(e)=> setState({...state, password:e.target.value})}
                                    // onChange={(e)=> setPassword(e.target.value)}
                                    
                                />
                            </Grid>    
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label='Confirme a Senha'
                                    name='passwordConfirmation'
                                    type="password"
                                    required
                                    aria-describedby="component-helper-text"
                                    onChange={(e)=> setState({...state, passwordConfirmation:e.target.value})}
                                    // onChange={(e)=> setPasswordConfirmation(e.target.value)}
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
                                        <TableCell sx={{padding:0}} align='left'><Checkbox/>{permissao}</TableCell>
                                    </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
        </Modal>
    )
}