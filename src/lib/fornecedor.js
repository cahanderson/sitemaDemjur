import {axios} from './axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')
const getPessoa = async (dados) =>{
  try {
      const{data} = await axios.post('/api/pessoa/index',dados)
        if(data){
        return{
          data
        } 
      }else{
        return new Error('Erro ao listar os registros')  
      }
  }catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const create = async (dados) => {
  await csrf()
  try {
    const { data } = await axios.post('/api/pessoa/', dados);

    if (data) {
      return data.id;
    }

    // return new Error('Erro ao criar o registro.');
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
    const erro = error.response.data
    return new Error(erro.message);;
  }
};
const deleteById = async (id)=> {
  try {
    await axios.delete(`/api/pessoa/${id}`);
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);;
  }
};
const updateById = async (id, dados) => {
  try {
    await axios.put(`/api/pessoa/${id}`, dados);
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};

export const Fornecedor = {
  getById,
  getPessoa,
  create,
  deleteById,
  updateById,
};