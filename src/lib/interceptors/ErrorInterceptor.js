
export function ErrorInterceptor(error) {
    if(error.message === 'Network Error'){
        return Promise.reject(new Error('Erro de conexão.'));
    }
    if(error.message?.status === 401){
        //Do something
    }

    return Promise.reject(error);
}