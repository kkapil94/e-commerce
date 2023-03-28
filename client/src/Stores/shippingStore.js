import { create } from "zustand";
import { persist,createJSONStorage } from "zustand/middleware";

export  const shippingStore = create(persist((set,get)=>({

    shippingInfo:localStorage.getItem("shippingInfo")?localStorage.getItem("shippingInfo"):[],
    setShippingInfo:(info)=>{
        set({shippingInfo:info})
    }

}),{name:"shippingInfo",storage:createJSONStorage(()=>localStorage)}))