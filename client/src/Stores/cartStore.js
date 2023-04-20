import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const cartStore = create(persist((set,get)=>({
    cart:localStorage.getItem("cart")?localStorage.getItem("cart"):[],
    addToCart:async(product,quan)=>{
        const cart = get().cart
        const itemExist =await cart.find((i)=>(i.product._id===product._id))
        if(itemExist){
            return cart
        }
        else{
            set({cart:[...cart,{product,quantity:quan}]})
        }
    },
    setQuan:(prod,quan)=>{
        const cart = get().cart
        const index = cart.findIndex((i)=>(i.product._id===prod._id))
        cart[index].quantity = quan
        set({cart})
    },
    removeItem:(prod)=>{
        let cart = get().cart
         cart = cart.filter(i=>(i.product._id!==prod._id))
        set({cart})
    },
    emptyCart:()=>{
        set({cart:[]})
    }
}),{name:"cart",storage:createJSONStorage(()=>localStorage)}))

export default cartStore