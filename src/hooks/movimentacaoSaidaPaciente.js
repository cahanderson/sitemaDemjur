import create from 'zustand'

const useMovimentacaoSaidaPacienteStore = create((set)=>({
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

export default useMovimentacaoSaidaPacienteStore;