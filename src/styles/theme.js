import { createTheme } from "@mui/material";

export const theme = createTheme({
    
    typography:{
        fontFamily:[
            'Mina',
            'sans-serif'
        ].join(',')
    },
    palette:{
        secondary:{
            main:'#0271c5'
        }
    },
    components:{
        MuiLink:{
            styleOverrides:{
                root:{
                    textDecoration:'none',
                    color: 'gray',   
                    fontSize: '1rem',
                },

            }
        },
        
    },
    
})

