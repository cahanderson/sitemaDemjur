import { Box, Container } from '@mui/material'
import Head from 'next/head'

const GuestLayout = ({ children }) => {
    return (
        <Box>
            <Head>
                <title>Laravel</title>
            </Head>

            <Box 
                maxWidth='100%'
                minHeight='100vh'
                bgcolor='#f2f2f2'
                display='flex'
                justifyContent='center'
                alignItems='center'
                padding='10px'
            >
                {children}
            </Box>
        </Box>
    )
}

export default GuestLayout
