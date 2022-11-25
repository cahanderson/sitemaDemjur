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
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const search = async (dados) => {
  try {
    const { data } = await axios.post('/api/principio-ativo/search',dados);
    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    const erro = error.response
    return new Error(erro);
  }
};
  
const create = async (dados) => {
  await csrf()
  try {
   const { data } = await axios.post('/api/principio-ativo', dados);
    if (data) {
      return data;
    }
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};
  
const updateById = async (id, dados) => {
  try {
    await axios.put(`/api/principio-ativo/${id}`, dados);
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};
  
const deleteById = async (id)=> {
  try {
    await axios.delete(`/api/principio-ativo/${id}`);
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};

export const PrincAtivo = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  search
};