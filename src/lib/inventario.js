import {axios} from './axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')
const getAll = async (page) =>{
  try {
    const urlRelativa = `/api/inventario?page=${page}`
    const{data} = await axios.get(urlRelativa)
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

// const getAll = async (page) =>{
//   try {
//       const urlRelativa = `/api/estoque?page=${page}`
//       const{data} = await axios.get(urlRelativa)
//       if(data){
        
//           return{
//             data
//           } 
//       }else{
//         return new Error('Erro ao listar os registros')  
//       }
//   } catch (error) {
//       return error;
//   }
// };

const create = async (dados) => {
  await csrf()
  try {
    const { data } = await axios.post('/api/inventario/', dados);
    if (data) {
      return data.id;
    }
    // return new Error('Erro ao criar o registro.');
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
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
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const updateById = async (id, dados) => {
  try {
    await axios.put(`/api/inventario/${id}`, dados);
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};
export const Inventarios = {
  getAll,
  create,
  deleteById,
  getById,
  updateById,
};