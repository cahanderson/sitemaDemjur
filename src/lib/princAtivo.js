import {axios} from './axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')

const getAll = async () =>{
  try {
      const{data} = await axios.get('/api/principio-ativo')
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
    const { data } = await axios.get(`/api/principio-ativo/${id}`);

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
    const { data } = await axios.post('/api/principio-ativo', dados);
    if (data) {
      return data;
    }

    // return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
};
  
const updateById = async (id, dados) => {
  try {
    await axios.put(`/api/principio-ativo/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao atualizar o registro.');
  }
};
  
const deleteById = async (id)=> {
  try {
    await axios.delete(`/api/principio-ativo/${id}`);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao apagar o registro.');
  }
};

export const PrincAtivo = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};