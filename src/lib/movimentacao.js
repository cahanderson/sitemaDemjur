import {axios} from './axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')
const getAll = async () =>{
  try {
      const{data} = await axios.get('/api/movimentacao')
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
const getMovimentacao = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipoDominio/TipoMovimentacao')
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
    const { data } = await axios.post('/api/movimentacao', dados);

    if (data) {
      return data;
    }

    // return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
};
const updateById = async (id, dados) => {
  try {
    await axios.put(`/api/movimentacao/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao atualizar o registro.');
  }
};
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
      return error;
  }
};
const getEstabelecimento = async () =>{
  try {
      const{data} = await axios.get('/api/estabelecimentos')
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
const updateFile = async (file) => {
  try {
    await axios.post(`/api/movimentacao/inclusao/documento-aquisicao`, {file});
  } catch (error) {
    console.error(error);
    return new Error('Erro ao atualizar o registro.');
  }
};
const getNumeroSolicitacoes = async () =>{
  try {
      const{data} = await axios.get('/api/solicitacao/get-numero-solicitacoes')
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
const deleteById = async (id)=> {
  try {
    await axios.delete(`/api/movimentacao/${id}`);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao apagar o registro.');
  }
};
const getById = async (id) => {
  try {
    const { data } = await axios.get(`/api/movimentacao/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
};

export const Movimentacoes = {
    getAll,
    getMovimentacao,
    create,
    updateById,
    getPessoa,
    getEstabelecimento,
    updateFile,
    getNumeroSolicitacoes,
    deleteById,
    getById,
  };