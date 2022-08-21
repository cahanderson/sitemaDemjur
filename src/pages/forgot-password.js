
import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Label from '@/components/Label'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAuth } from '@/hooks/auth'
import { Box, Button, Divider, Input, TextField, Typography } from '@mui/material'
import { borderRadius } from '@mui/system'
import { useRouter } from 'next/router'
import { useState } from 'react'


const ForgotPassword = () => {
    const router = useRouter()
    const { forgotPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
        <GuestLayout>
            <Box mb='20px' component='div'>
                <Typography variant='h5' component='h1' mb='10px'>
                    Esqueceu sua conta?
                </Typography>    
                <Divider/>
            </Box>
            <Box>
                <Typography variant='body1' component='div'>
                    Esqueceu sua senha? Sem problemas. Apenas deixe-nos saber seu
                    endereço de e-mail e nós lhe enviaremos um link de redefinição 
                    de senha que lhe permitirá escolher um novo.
                </Typography>
            </Box>

            {/* Session Status */}
            <AuthSessionStatus className="mb-4" status={status} />

            {/* Validation Errors */}
            <AuthValidationErrors className="mb-4" errors={errors} />

            <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 10 }}>
                {/* Email Address */}
                <TextField
                    id="email"
                    type="email"
                    name="email"
                    fullWidth
                    variant='outlined'
                    value={email}
                    label='Email'
                    onChange={event => setEmail(event.target.value)}
                    required
                    autoFocus
                />

                <Box display='flex' justifyContent='right' gap='1.5rem' mt='35px' >
                    <Button
                        type="submit"
                        fullWidth
                        sx={{ mt: 5, mb: 3, borderRadius:3}}
                        variant="contained"
                    >
                        Enviar
                    </Button>
                </Box>
                <Box display='flex' justifyContent='right' gap='1.5rem' mt='35px' >
                    <Button size='large'>Cancel</Button>
                </Box>
                
            </Box>
        </GuestLayout>
    )
}

export default ForgotPassword
