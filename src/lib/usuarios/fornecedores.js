import {axios} from '../axios'

// const csrf = () => axios.get('/sanctum/csrf-cookie')

const getAll = async () =>{
  try {
      const{data} = await axios.get('/fornecedores')
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
    const { data } = await axios.get(`/fornecedores/${id}`);

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
  // await csrf()
  // console.log({dados});
  try {
    const { data } = await axios.post('/fornecedores', dados);

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
    await axios.put(`/fornecedores/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao atualizar o registro.');
  }
};
  
const deleteById = async (id)=> {
  try {
    await axios.delete(`/fornecedores${id}`);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao apagar o registro.');
  }
};

export const Fornecedores = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};