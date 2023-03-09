import axios from "axios"
import {create} from "zustand"
import { persist,createJSONStorage } from "zustand/middleware"

const userStore = create(persist((set)=>({
    isAuthenticated:0,
    user:0,
    loginUser:async (email,password)=>{
        const config = {headers:{"Content-Type":"application/json"}}
        const response = await axios.post("/api/v1/login",{email,password},config)
        if(response.data.success)
        set({isAuthenticated:1,user:response.data.user})
        return response
    },
    registerUser:async (myData)=>{
        const config = {headers:{"Content-Type":"multipart/form-data"}}
        const response = await axios.post("/api/v1/register",myData,config)
        if(response.data.success)
        set({isAuthenticated:1,user:response.data.user})
        return response
    },
    logoutUser:async ()=>{
        const response = await axios.post("api/v1/logout");
          if(response.data.sucsess)
         {
            set({isAuthenticated:0,user:0})
        }
        return response;
    },
    updateUser:async (user)=>{
        const config = {headers:{"Content-Type":"multipart/form-data"}}
        const response = await axios.patch("api/v1/update",user,config)
        if(response.data.success){
            set({user:response.data.user})
        }
        return response;
    },
    updatePassword:async (pass,user)=>{
        const config = {headers:{"Content-Type":"application/json"}} 
        const response = await axios.patch("api/v1/updatePassword",{pass,user},config)
        return response
    }

}),{
    name:"user",
    storage:createJSONStorage(()=>sessionStorage)
}))

export default userStore