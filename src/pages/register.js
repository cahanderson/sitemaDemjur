import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { Avatar, Box, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Register = () => {
    const { register } = useAuth({
        middleware: 'guest', 
        redirectIfAuthenticated: '/cadastroUsuarios',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()

        register({ name, email, password, password_confirmation: passwordConfirmation, setErrors })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline   />
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />

                <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 3 }}>
                    {/* Name */}
                    <div>

                        <TextField
                            sx={{ border : 0 }}
                            id="name"
                            type="text"
                            value={name}
                            margin="normal"
                            onChange={event => setName(event.target.value)}
                            required
                            fullWidth
                            label="Name"
                            name="Name"
                            autoComplete="Name"
                            autoFocus
                        />
                    </div>

                    {/* Email Address */}
                    <div className="mt-4">
                        <TextField
                            id="email"
                            type="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required
                            fullWidth
                            margin="normal"
                            name="email"
                            label="Email"
                        />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <TextField
                            id="password"
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            required
                            fullWidth
                            name="password"
                            label="PassWord"
                            margin="normal"
                            autoComplete="new-password"

                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                        <TextField
                            id="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            className="block mt-1 w-full"
                            onChange={event => setPasswordConfirmation(event.target.value)}
                            required
                            fullWidth
                            name="passwordConfirmation"
                            label="Password Confirmation"
                            margin="normal"
                        />
                    </div>

                    <Grid container sx={{mt:3}}>
                        <Grid item xs>
                            <Link href="/login">
                                <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                    Already registered?
                                </a>
                            </Link>
                        </Grid>
                        <Grid item xs>
                            <Button className="ml-4">Register</Button>
                        </Grid>


                    </Grid>
                </Box>
            </Box>
        </Container>        
    )
}

export default Register
