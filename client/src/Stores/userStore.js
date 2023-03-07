import axios from "axios"
import {create} from "zustand"
import { persist,createJSONStorage } from "zustand/middleware"

const userStore = create(persist((set)=>({
    isAuthenticated:null,
    user:{},
    loginUser:async (email,password)=>{
        const config = {headers:{"Content-Type":"application/json"}}
        const response = await axios.post("/api/v1/login",{email,password},config)
        if(response.data.success)
        set({isAuthenticated:1,user:response.data.user})
        return response
    },
    registerUser:async (myData)=>{
        console.log("kkk",myData)
        const config = {headers:{"Content-Type":"multipart/form-data"}}
        const response = await axios.post("/api/v1/register",myData,config)
        if(response.data.success)
        set({isAuthenticated:1,user:response.data.user})
        return response
    },
    logoutUser:async ()=>{
        const response = await axios.post("api/v1/logout");
        if(response.data.success)
        await set({isAuthenticated:0})
        return response;
    }

}),{
    name:"user",
    storage:createJSONStorage(()=>sessionStorage)
}))

export default userStore