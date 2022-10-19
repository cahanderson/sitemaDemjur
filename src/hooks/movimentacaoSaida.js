import create from 'zustand'

const useMovimentacaoSaidaStore = create((set)=>({
    datas:'',
    addData:(data)=>{
        set(state=>({datas:data}))
    }
}))
// const useSolicitacaoStore = create((set)=>({
//     datas:'',
//     addData:(data)=>{
//         set(state=>({datas:[...state.datas,data]}))
//     }
// }))

export default useMovimentacaoSaidaStore;