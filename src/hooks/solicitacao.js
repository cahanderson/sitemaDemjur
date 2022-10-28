import create from 'zustand'

const useSolicitacaoStore = create((set)=>({
    datas:'',
    addData:(data)=>{
        set(state=>({datas:data}))
    }
}))

export default useSolicitacaoStore;