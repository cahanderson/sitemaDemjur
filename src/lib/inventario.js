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
  await csrf()
  try {
    const { data } = await axios.post('/api/solicitacao', dados);

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
    await axios.delete(`/api/solicitacao/${id}`);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao apagar o registro.');
  }
};
const getById = async (id) => {
  try {
    const { data } = await axios.get(`/api/solicitacao/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
};
export const Inventarios = {
  getAll,
  create,
  deleteById,
  getById,
};