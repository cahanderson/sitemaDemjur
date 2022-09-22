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

    // return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
};
  
const updateById = async (dados) => {
  try {
    await axios.put(`/api/itens/${dados.id}`, dados.item.itens[0]);
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

export const Itens = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};