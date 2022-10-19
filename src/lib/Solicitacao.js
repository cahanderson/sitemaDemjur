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
const getTipoAcao = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipoDominio/TipoAcao')
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
const getTipoRepresentante = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipoDominio/TipoRepresentante')
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
const getTipoReu = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipoDominio/TipoReu')
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
const getCids = async () =>{
  try {
      const{data} = await axios.get('/api/cids')
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
      return error;
  }
};
const getSexo = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipoDominio/Sexo')
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
const getFrequenciaEntrega = async () =>{
  try {
      const{data} = await axios.get('/api/dominio/tipoDominio/FrequenciaEntrega')
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
const createPrescritor = async (dados) => {
  await csrf()
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
const create = async (dados) => {
  console.log(dados,'lib')
  await csrf()
  try {
    const {data} = await axios.post('/api/solicitacao', dados);

    if (data) {
      console.log(data);
      // return data.id;
    }
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
const getPessoaById = async (id) => {
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
const getPessoaByCpf = async (cpf) => {
  try {
    const { data } = await axios.get(`/api/pessoa/get-beneficiario/${cpf}`);

    if (data) {
      return data.data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error('Erro ao consultar o registro.');
  }
};
const updateById = async (id, dados) => {
  try {
    await axios.put(`/api/solicitacao/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error('Erro ao atualizar o registro.');
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
  create,
  deleteById,
  getById,
  getPessoaByCpf,
  getPessoaById,
  updateById
};