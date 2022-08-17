// import 'tailwindcss/tailwind.css'
// import '../styles/globals.css'

import { theme } from "@/styles/theme";
import {ThemeProvider } from "@mui/material";



// const App = ({ Component, pageProps }) => <Component {...pageProps} />

// export default App
function App({ Component, pageProps }){

    return(
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default App;
