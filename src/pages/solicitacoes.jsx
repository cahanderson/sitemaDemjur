import AppLayout from "@/components/Layouts/AppLayout";
import { Table } from "@/components/Table";
import { Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";

export default function Solicitacoes(){   

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
                    <Typography variant='h5' component='h1'>
                        Solicitações
                    </Typography>
                    
                </Box>
                <Box alignItems='center' display='flex'>
                    <Button variant="outlined"> Nova Solicitação </Button>
                </Box>

            </Box>
            <Box component={Paper} padding='10px' justifyContent='center' alignItems='center'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                        <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Nº da solicitação"
                        fullWidth
                        autoComplete="given-name"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                        required
                        id="address1"
                        name="address1"
                        label="CPF"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                        id="address2"
                        name="address2"
                        label='Nome'
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                        id="address2"
                        name="address2"
                        label="Nome da mãe"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="outlined"
                        />
                    </Grid>
                </Grid>
                {/* <Table></Table> */}
            </Box>

        </AppLayout>
    )
}