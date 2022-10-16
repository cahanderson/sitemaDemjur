import {axios} from './axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')
const getAll = async () =>{
  try {
      const{data} = await axios.get('/api/inventario')
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
const create = async (dados) => {
  console.log(dados);
  await csrf()
  try {
    const { data } = await axios.post('/api/inventario/', dados);
    if (data) {
      return data.id;
    }
    // return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
};
const deleteById = async (id)=> {
  try {
    await axios.delete(`/api/inventario/${id}`);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao apagar o registro.');
  }
};
const getById = async (id) => {
  try {
    const { data } = await axios.get(`/api/inventario/${id}`);
    if (data) {
      return data;
    }
    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
};
const updateById = async (id, dados) => {
  try {
    await axios.put(`/api/inventario/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao atualizar o registro.');
  }
};
export const Inventarios = {
  getAll,
  create,
  deleteById,
  getById,
  updateById,
};