import {axios} from './axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')

const getAll = async () =>{
  try {
      const{data} = await axios.get('/api/categorias')
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
  await csrf()
  // console.log({dados});
  try {
    const { data } = await axios.post('/api/categorias', dados);

    if (data) {
      return data;
    }

    // return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
};
const getById = async (id) => {
  try {
    const { data } = await axios.get(`/api/categorias/${id}`);

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
    await axios.put(`/api/categorias/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao atualizar o registro.');
  }
};
const deleteById = async (id)=> {
  try {
    await axios.delete(`/api/categorias/${id}`);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao apagar o registro.');
  }
};

export const Categoria = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};