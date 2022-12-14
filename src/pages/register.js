import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { Box, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import GuestLayout from '@/components/Layouts/GuestLayout'

const Register = () => {
    const { register } = useAuth({
        middleware: 'guest', 
        redirectIfAuthenticated: '/',
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
        <GuestLayout>
            <CssBaseline   />
                <Box display='flex' justifyContent='center'>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                </Box>
                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />

                <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 3 }}>
                    {/* Name */}
                    

                    <TextField q
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
                    

                    {/* Email Address */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={event => setEmail(event.target.value)}
                    />

                    {/* Password */}
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

                    {/* Confirm Password */}
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

                    <Button
                        type="submit"
                        fullWidth
                        sx={{ mt: 5, mb: 3, borderRadius:3}}
                        variant="contained"
                    >
                        Register
                    </Button>

                    <Grid container sx={{mt:3}}>
                        <Grid item xs>
                            <Link href="/login">
                                <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                    Already registered?
                                </a>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
        </GuestLayout>
    )
}

export default Register
