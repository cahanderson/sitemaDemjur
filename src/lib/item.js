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
      return error;
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
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
};  
const create = async (dados) => {
  await csrf()
  try {
    const { data } = await axios.post('/api/itens', dados);
    if (data) {
      return data.id;
    }
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
}; 
const updateById = async (id,dados) => {
  try {
    await axios.put(`/api/itens/${id}`, dados.itens[0]);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao atualizar o registro.');
  }
}; 
const deleteById = async (id)=> {
  try {
    await axios.delete(`/api/itens/${id}`);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao apagar o registro.');
  }
};
const getTipoItem = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipoDominio/TipoItem')
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

export const Itens = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  getTipoItem,
};