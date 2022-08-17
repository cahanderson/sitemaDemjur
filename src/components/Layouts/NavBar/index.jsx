import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import styles from './styles.module.scss'

export function NavBar(){

  return (
    <Box sx={{ flexGrow: 1 }} padding='10px' >
      <div className={styles.links}>
        <Link underline='hover' color='inherit'>Alimentação de variáveis</Link>
        <Link underline='hover' color='inherit'>Bairros</Link>
        <Link underline='hover' color='inherit'>Indicadores</Link>
        <Link underline='hover' color='inherit'>Variáveis</Link>
        <Link underline='hover' color='inherit'>Usuários</Link>
      </div>
    </Box>
  );
};