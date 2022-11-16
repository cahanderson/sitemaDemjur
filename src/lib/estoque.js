import {axios} from './axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')

const getAll = async (page) =>{
  try {
      const urlRelativa = `/api/estoque?page=${page}`
      const{data} = await axios.get(urlRelativa)
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

const getByItens = async (id) => {
  try {
    const { data } = await axios.get(`/api/estoque/get-itens-estoque/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
};

export const Estoque = {
  getAll,
  getByItens,
  // getById,
  // updateById,
  // deleteById,
};