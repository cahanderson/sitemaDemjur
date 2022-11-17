import create from 'zustand'

const useSolicitacaoDispensacaoStore = create((set)=>({
    datas:'',
    addData:(data)=>{
        set(state=>({datas:data}))
    }
}))

export default useSolicitacaoDispensacaoStore;