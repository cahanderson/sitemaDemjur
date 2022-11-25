import {axios} from './axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')

const getAll = async () =>{
  try {
      const{data} = await axios.get('/api/itens')
      if(data){
          return{
            data
          } 
      }else{
        return new Error('Erro ao listar os registros')  
      }
  } catch (error) {
      const erro = error.response.data
      return new Error(erro.message);
  }
};
const getById = async (id) => {
  try {
    const { data } = await axios.get(`/api/itens/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};  
const create = async (item) => {
  await csrf()
  try {
    const { data } = await axios.post('/api/itens', item);
    if (data) {
      return data.id;
    }
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
}; 
const updateById = async (id,item) => {
  try {
    await axios.put(`/api/itens/${id}`, item);
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
}; 
const deleteById = async (id)=> {
  try {
    await axios.delete(`/api/itens/${id}`);
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const getTipoItem = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipo-dominio/TipoItem')
      if(data){
        
        return{
          data
        } 
      }else{
        return new Error('Erro ao listar os tipos de itens')  
      }
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};

export const Itens = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  getTipoItem,
};