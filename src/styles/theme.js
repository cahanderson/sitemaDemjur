import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

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