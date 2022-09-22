import {axios} from './axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')
const getAll = async () =>{
  try {
      const{data} = await axios.get('/api/movimentacao')
      if(data){
        
          return{
            data
          } 
      }else{
        return new Error('Erro ao listar os registros')  
      }
  } catch (error) {
      return error;
  }
};
const getMovimentacao = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipoDominio/TipoMovimentacao')
      if(data){
        
          return{
            data
          } 
      }else{
        return new Error('Erro ao listar os registros')  
      }
  } catch (error) {
      return error;
  }
};

export const Movimentacoes = {
    getAll,
    getMovimentacao,
  };