import {axios} from './axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')

const getAll = async (dados) =>{
  try {
      const{data} = await axios.post('/api/pessoa/index',dados)
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

const create = async (dados) => {
  await csrf()
  try {
    const data = await axios.post('/api/pessoa', dados);
    if (data) {
      return data;
    }
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const getById = async (id) => {
  try {
    const { data } = await axios.get(`/api/pessoa/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
};
const updateById = async (id,dados) => {
  try {
    await axios.put(`/api/pessoa/${id}`, dados);
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const deleteById = async (id)=> {
  try {
    await axios.delete(`/api/pessoa/${id}`);
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const search = async (dados) => {
  try {
    const { data } = await axios.post('/api/categorias/search',dados);
    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    const erro = error.response
    return new Error(erro);
  }
};

export const Estabelecimento = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  search,
};