import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Checkbox, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material'


const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/usuario',
    })
    // const [state, setState] = useState({
    //     email: '',
    //     password: '',
    //     errors: [],
    //     status: null,
    // });
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            // setState({...state, status:window.atob(router.query.reset)})
            setStatus(window.atob(router.query.reset))
        } else {
            // setState({...state,status:null})
            setStatus(null)
        }
    },[])

    const submitForm = async event => {
        event.preventDefault()
        // login(setState)
        login({ email, password, setErrors, setStatus })
    }

    return (
        <>
            <GuestLayout>
                <CssBaseline />
                <Box display='flex' justifyContent='center'>
                    <Typography component="h1" variant="h2">
                        SJUD
                    </Typography>
                </Box>
                <Box display='flex' justifyContent='center'>

                </Box>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />
        

                <Box component="form" onSubmit={submitForm} noValidate sx={{ mt:3,  }}>
                    <TextField
                        sx={{ mb : 3 }}
                        variant='standard'
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        // onChange={e => setState({...state, email:e.target.value})}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        variant='standard'
                        type="password"
                        value={password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        autoComplete="current-password"
                        // onChange={e => setState({...state, password:e.target.value})}
                        onChange={event => setPassword(event.target.value)}
                    />     

                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        sx={{ mt: 8, mb: 3, borderRadius:3}}
                        variant="contained"
                    >
                        Login
                    </Button>
                </Box> 
            </GuestLayout>
        </>
    )
}  
export default Login         
