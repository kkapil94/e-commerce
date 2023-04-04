import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

  const orderStore = create(persist((set,get)=>({
    orders:{},
    createOrder: async (order)=>{
        const config = { headers: {"Content-Type": "application/json"} }
        const {data} =await axios.post("/api/v1/order/create",order,config)
        console.log("iam",data);
    },
    getOrders: async (id)=>{
        const {data} = await axios.get(`/api/v1/order/myorders/${id}`)
        return data
    }
}),{
    name:"orders",
    storage:createJSONStorage(()=>sessionStorage)
}))

export default orderStore