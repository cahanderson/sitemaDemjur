import {axios} from './axios'

// const csrf = () => axios.get('/sanctum/csrf-cookie')
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
        // console.log(data);
        
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
        // console.log(data);
        
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
        // console.log(data);
        
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
        // console.log(data);
        
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
  console.log(dados);
  try {
      const{data} = await axios.post('/api/pessoa/index',dados)
      if(data){
        console.log(data);
        
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
  console.log(dados);
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
};