import create from 'zustand'

const useInventarioStore = create((set)=>({
    datas:'',
    addData:(data)=>{
        set(state=>({datas:data}))
    }
}))

export default useInventarioStore;