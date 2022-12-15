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
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const getMovimentacao = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipo-dominio/TipoMovimentacao')
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
    const { data } = await axios.post('/api/movimentacao', dados);

    if (data) {
      return data;
    }

    // return new Error('Erro ao criar o registro.');
  } catch (error) {
    const erro = error.response.data
    return new Error('Erro ao salvar registro')
  }
};
const efetivar = async (id) => {
  try {
    const { data } = await axios.post('/api/movimentacao/efetivar-movimentacao', id);

    if (data) {
      return data;
    }

    // return new Error('Erro ao criar o registro.');
  } catch (error) {
    const erro = error.response.data
    return new Error('Erro ao salvar registro')
  }
};
const updateById = async (id, dados) => {
  try {
    await axios.put(`/api/movimentacao/${id}`, dados);
  } catch (error) {
    const erro = error.response.data
    return new Error('Erro ao salvar registro') 
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
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const updateFile = async (file) => {
  try {
    await axios.post(`/api/movimentacao/inclusao/documento-aquisicao`, {file});
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
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
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const deleteById = async (id)=> {
  try {
    await axios.delete(`/api/movimentacao/${id}`);
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
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
    const erro = error.response.data
    return new Error(erro.message);
  }
};

export const Movimentacoes = {
    getAll,
    getMovimentacao,
    create,
    updateById,
    getPessoa,
    updateFile,
    getNumeroSolicitacoes,
    deleteById,
    getById,
    efetivar,
  };