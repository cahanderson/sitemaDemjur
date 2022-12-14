import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import { Box } from '@mui/material'
import { NavBar } from './Navbar'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const AppLayout = ({children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    // console.log(userAuthenticate);
    // console.log(children._source,'teste');

    return (
        <Box minHeight='100vh' bgcolor='#F5F5F9' width='100%'>
            <Head>laravel</Head>
            <Navigation user={user} />

            {/* Page Heading */}
            <Box component='header' bgcolor='white'>
                <Box maxWidth='80rem' width='100%' mx='auto'>
                    <NavBar />
                </Box>
            </Box>

            {/* Page Content */}
            <Box component='main' maxWidth='80rem' width='100%' marginTop={4} mx='auto'>
                {children}
            </Box>
        </Box>
    )
}

export default AppLayout
