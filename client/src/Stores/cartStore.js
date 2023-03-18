import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const cartStore = create(persist((set,get)=>({
    cart:localStorage.getItem("cart")?localStorage.getItem("cart"):[],
    addToCart:async(product,quan)=>{
        console.log("wor");
        const cart = get().cart
        console.log(cart);
        const itemExist =await cart.find((i)=>(i.product._id===product._id))
        if(itemExist){
            return cart
        }
        else{
            set({cart:[...cart,{product,quantity:quan}]})
        }
    }
}),{name:"cart",storage:createJSONStorage(()=>localStorage)}))

export default cartStore