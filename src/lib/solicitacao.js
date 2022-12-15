import {axios} from './axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')
const getAll = async () =>{
  try {
      const{data} = await axios.get('/api/solicitacao')
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
const getEstabelecimento = async (dados) =>{
  try {
      const{data} = await axios.post('/api/pessoa/index',dados)
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
const getTipoAcao = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipo-dominio/TipoAcao')
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
const getTipoRepresentante = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipo-dominio/TipoRepresentante')
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
const getTipoReu = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipo-dominio/TipoReu')
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
const getCids = async (dados) =>{
  try {
      const{data} = await axios.post('/api/cids/search',dados)
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
  } catch (error) {
      const erro = error.response.data
      return new Error(erro.message);
  }
};
const getSexo = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipo-dominio/Sexo')
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
const getFrequenciaEntrega = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipo-dominio/FrequenciaEntrega')
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
const createPrescritor = async (dados) => {
  await csrf()
  try {
    const { data } = await axios.post('/api/pessoa/', dados);

    if (data) {
      return data.id;
    }

    // return new Error('Erro ao criar o registro.');
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);;
  }
};
const createEstabelecimento = async (dados) => {
  await csrf()
  try {
    const { data } = await axios.post('/api/pessoa/', dados);

    if (data) {
      return data;
    }

    // return new Error('Erro ao criar o registro.');
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);;
  }
};
const create = async (dados) => {
  await csrf()
  try {
    const {data} = await axios.post('/api/solicitacao', dados);

    if (data) {
      // return data.id;
    }
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const deleteById = async (id)=> {
  try {
    await axios.delete(`/api/solicitacao/${id}`);
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
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
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const getPessoaById = async (id) => {
  try {
    const { data } = await axios.get(`/api/pessoa/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const getPessoaByCpf = async (cpf) => {
  try {
    const { data } = await axios.get(`/api/pessoa/get-beneficiario/${cpf}`);

    if (data) {
      return data.data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};
const updateById = async (id, dados) => {
  try {
    await axios.put(`/api/solicitacao/${id}`, dados);
  } catch (error) {
    const erro = error.response.data
    return new Error(erro.message);
  }
};
export const Solicitacao = {
  getAll,
  getEstabelecimento,
  getTipoAcao,
  getTipoRepresentante,
  getTipoReu,
  getCids,
  getPessoa,
  getSexo,
  getFrequenciaEntrega,
  createPrescritor,
  createEstabelecimento,
  create,
  deleteById,
  getById,
  getPessoaByCpf,
  getPessoaById,
  updateById,
};