import {axios} from './axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')
const getPessoa = async (dados) =>{
  try {
      const{data} = await axios.post('/api/pessoa/index',dados)
        if(data){
          console.log(data);
        return{
          data
        } 
      }else{
        return new Error('Erro ao listar os registros')  
      }
  }catch (error) {
      return error;
  }
};
const create = async (dados) => {
  await csrf()
  console.log(dados);
  try {
    const { data } = await axios.post('/api/pessoa/', dados);

    if (data) {
      return data.id;
    }

    // return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
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

const deleteById = async (id)=> {
  try {
    await axios.delete(`/api/pessoa/${id}`);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao apagar o registro.');
  }
};

const updateById = async (id, dados) => {
  try {
    await axios.put(`/api/pessoa/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao atualizar o registro.');
  }
};

export const Fornecedor = {
  getById,
  getPessoa,
  create,
  deleteById,
  updateById,
};