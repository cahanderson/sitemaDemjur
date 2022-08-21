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
                <Box
                    bgcolor='#fff'
                    display= 'flex'
                    flexDirection= 'column'
                    maxWidth='490px'
                    padding= '77px 55px 77px 55px'
                    borderRadius={5}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default GuestLayout
