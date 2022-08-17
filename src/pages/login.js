import AuthSessionStatus from '@/components/AuthSessionStatus'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import Button from '@/components/Button'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Avatar, Box, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/cadastroUsuarios',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(window.atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({ email, password, setErrors, setStatus })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Link href="/">
                    <a>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                    </a>
                </Link>

                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />

                {/* Validation Errors */}
                <AuthValidationErrors className="mb-4" errors={errors} />

                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 3 }}>
                    <TextField
                        sx={{ border : 0 }}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <TextField
                        
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        autoComplete="current-password"
                    />     

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgot-password" variant="body2">
                                <a>
                                    Esqueceu a senha?
                                </a>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                <a>
                                    Criar nova conta
                                </a>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>  
        </Container>
    )
}           
export default Login



//         <GuestLayout>
//             <AuthCard
//                 logo={
//                     <Link href="/">
//                         <a>
//                             <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
//                         </a>
//                     </Link>
//                 }>

//                 {/* Session Status */}
//                 <AuthSessionStatus className="mb-4" status={status} />

//                 {/* Validation Errors */}
//                 <AuthValidationErrors className="mb-4" errors={errors} />

//                 <form onSubmit={submitForm}>
//                     {/* Email Address */}
//                     <div>
//                         <Label htmlFor="email">Email</Label>

//                         <Input
//                             id="email"
//                             type="email"
//                             value={email}
//                             className="block mt-1 w-full"
//                             onChange={event => setEmail(event.target.value)}
//                             required
//                             autoFocus
//                         />
//                     </div>

//                     {/* Password */}
//                     <div className="mt-4">
//                         <Label htmlFor="password">Password</Label>

//                         <Input
//                             id="password"
//                             type="password"
//                             value={password}
//                             className="block mt-1 w-full"
//                             onChange={event => setPassword(event.target.value)}
//                             required
//                             autoComplete="current-password"
//                         />
//                     </div>

//                     {/* Remember Me */}
//                     <div className="block mt-4">
//                         <label
//                             htmlFor="remember_me"
//                             className="inline-flex items-center">
//                             <input
//                                 id="remember_me"
//                                 type="checkbox"
//                                 name="remember"
//                                 className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                             />

//                             <span className="ml-2 text-sm text-gray-600">
//                                 Remember me
//                             </span>
//                         </label>
//                     </div>

//                     <div className="flex items-center justify-end mt-4">
//                         <Link href="/forgot-password">
//                             <a className="underline text-sm text-gray-600 hover:text-gray-900">
//                                 Forgot your password?
//                             </a>
//                         </Link>

//                         <Button className="ml-3">Login</Button>
//                     </div>
//                 </form>
//             </AuthCard>
//         </GuestLayout>
//     )
// }
// export default Login