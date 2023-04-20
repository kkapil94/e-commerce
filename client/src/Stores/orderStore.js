import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

  const orderStore = create(persist((set,get)=>({
    orders:{},
    createOrder: async (order)=>{
        const config = { headers: {"Content-Type": "application/json"} }
        const {data} =await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/order/create`,order,config)
    },
    getOrders: async (id)=>{
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/order/myorders/${id}`)
        return data
    }
}),{
    name:"orders",
    storage:createJSONStorage(()=>sessionStorage)
}))

export default orderStore