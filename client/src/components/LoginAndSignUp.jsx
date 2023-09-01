import { Box, Container } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import React, { useEffect, useRef, useState } from "react";
import userStore from "../Stores/userStore"
import "./LoginAndSignUP.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader"
import { useAlert } from "react-alert";

export default function LoginAndSignUp() {
    const alert = useAlert()
    const [loginEmail,setLoginEmail] = useState("");
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [loginPassword,setLoginPassword] = useState("");
    const [avatarPreview,setAvatarPreview] = useState("./images/avatar.jpg")
    const [avatar,setAvatar] = useState("")
    const [user,setUser] = useState({
        name:'',
        email:"",
        password:"",
      })
      const {name,email,password} = user
      const location = useLocation()
    const loginForm = useRef()
    const signUpForm = useRef()
    const loginTab = useRef()
    const registerTab = useRef()
    const loginUser = userStore(state=>state.loginUser)
    const registerUser = userStore(state=>state.registerUser)
    const isAuthenticated =  userStore(state=>state.isAuthenticated)
    const registerSubmit =async (e)=>{
      e.preventDefault();
      setLoading(true)
        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avatar",avatar)
        const data =await registerUser(myForm);
        console.log(data);
        if(data.status===200){
          alert.success("Registered Successfully")
          setLoading(false)
        }else if (data.response.data.message=="User validation failed: email: Please enter a valid email") {
          setLoading(false)
          alert.error("Please enter the valid email!")
        }else{
          setLoading(false)
          alert.error("Cannot register successfully!")
        }
        
    }
    const loginSubmit =async (e)=>{
      e.preventDefault();
      setLoading(true)
      const data = await loginUser(loginEmail,loginPassword);
      if(data.status===200){
        alert.success("Login Successfully")
        setLoading(false)
      }else if (data.response.status==400) {
        setLoading(false)
        alert.error("Please enter valid credentials!")
      }else{
        setLoading(false)
        alert.error("Login unsuccessfull!")
      }
    }
    const changeFormData = (e)=>{ 
        if(e.target.name==='avatar'){
          const reader = new FileReader();
          reader.onload = ()=>{
            if(reader.readyState === 2)
            {
              setAvatar(reader.result)
            setAvatarPreview(reader.result)}
          }
          reader.readAsDataURL(e.target.files[0])
        }
        else{
            setUser({...user,[e.target.name]:e.target.value})
        }
    }
    const redirect = location.search?location.search.split("=")[1]:"account"
    useEffect(() => {
      if(isAuthenticated){
        navigate("/"+redirect)
      }
    }, [isAuthenticated,navigate])
    
    function switchTabs(e,tab){
        if(tab==="login"){
            signUpForm.current.classList.remove("shiftToNeutralForm")
            loginForm.current.classList.remove("shiftLeft")
            registerTab.current.classList.remove("activeTab")
            loginTab.current.classList.add("activeTab")

        }
        if(tab==="register"){
            signUpForm.current.classList.add("shiftToNeutralForm")
            loginForm.current.classList.add("shiftLeft")
            registerTab.current.classList.add("activeTab")
            loginTab.current.classList.remove("activeTab")
        }
    }
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          height: "90vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >{
        loading?<Loader/>:
      
        <Box sx={{ height: "25rem", width: "20rem", border: "2px solid #1976d2",overflow:"hidden"}}>
          <div style={{ paddingTop: ".5rem",marginBottom:"1rem"}}>
            <span 
                onClick={(e)=>switchTabs(e,"login")}
              className="loginTab activeTab"
              ref={loginTab}
              style={{
                width: "50%",
                display: "inline-block",
                textAlign: "center",
                paddingBottom: ".5rem",
                cursor:"pointer",
                transition:"all 0.5s"
              }}
            >
              Login
            </span>
            <span
              className="registerTab"
              ref={registerTab}
              onClick={(e)=>switchTabs(e,'register')}
              style={{
                width: "50%",
                display: "inline-block",
                textAlign: "center",
                cursor:"pointer",
                paddingBottom:".5rem",
              }}
            >
              Register
            </span>
          </div>
          
            <form  className="loginForm" onSubmit={loginSubmit} ref={loginForm} style={{display:"flex",transition:"all 0.5s",flexDirection:"column",alignItems:"center",rowGap:"2.5rem",width:"100%",padding:"2.5rem"}}>
              <div style={{display:"flex",alignItems:"center"}}>
                <EmailOutlinedIcon sx={{position:"absolute",transform:"translateX(1vmax)",fontSize:"1rem",marginRight:"2rem",color:"rgba(0, 0, 0, 0.623)"}}/>
                <input type="email" required placeholder="Email" name="email" value={loginEmail} onChange={(e)=>{setLoginEmail(e.target.value)}} style={{height:"2.5rem",width:"100%",padding:"1vmax 4vmax",paddingRight:"1vmax",outline:"none"}}/>
              </div>
              <div style={{display:"flex",alignItems:"center"}}>
                <VpnKeyOutlinedIcon sx={{position:"absolute",transform:"translateX(1vmax)",fontSize:"1rem",color:"rgba(0, 0, 0, 0.623)"}}/>
                <input type="password" required placeholder="Password" name="password" value={loginPassword} onChange={(e)=>{setLoginPassword(e.target.value)}} style={{height:"2.5rem",width:"100%",padding:"1vmax 4vmax",paddingRight:"1vmax",outline:"none"}}/>
              </div>
              <Link to="/forgotPassword" style={{display:"inline-block",fontSize:'.8rem',marginLeft:"auto"}}>Forgot Password?</Link>
              <button type="submit" style={{width:"100%",height:"2rem"}}>Login</button>
            </form>
            <form  className="signUPForm" onSubmit={registerSubmit} ref={signUpForm} encType="multipart/form-data" style={{display:"flex",width:"100%",flexDirection:"column",alignItems:"center",rowGap:"1.8rem",justifyContent:"center",transition:"all 0.5s"}}>
              <div style={{display:"flex",alignItems:"center"}}>
                <PortraitOutlinedIcon sx={{position:"absolute",transform:"translateX(1vmax)",fontSize:"1rem",color:"rgba(0, 0, 0, 0.623)"}}/>
                <input type="text" required placeholder="Name" name="name" value={user.name} onChange={changeFormData} style={{height:"2.5rem",width:"100%",padding:"1vmax 4vmax",paddingRight:"1vmax",outline:"none"}}/>
              </div>
              <div style={{display:"flex",alignItems:"center"}}>
                <EmailOutlinedIcon sx={{position:"absolute",transform:"translateX(1vmax)",fontSize:"1rem",color:"rgba(0, 0, 0, 0.623)"}}/>
                <input type="email" name="email" required placeholder="Email" value={user.email} onChange={changeFormData} style={{height:"2.5rem",width:"100%",padding:"1vmax 4vmax",paddingRight:"1vmax",outline:"none"}}/>
              </div>
              <div style={{display:"flex",alignItems:"center"}}>
                <VpnKeyOutlinedIcon sx={{position:"absolute",transform:"translateX(1vmax)",fontSize:"1rem",color:"rgba(0, 0, 0, 0.623)"}}/>
                <input type="password" name="password" required placeholder="Password" value={user.password} onChange={changeFormData} style={{height:"2.5rem",width:"100%",padding:"1vmax 4vmax",paddingRight:"1vmax",outline:"none"}}/>
              </div>
              <div id="registeredImage" style={{display:"flex",alignItems:"center",justifyContent:"center",width:"90%",paddingLeft:".5rem"}}>
                <img src={avatarPreview}  alt="" style={{height:"3rem",width:"3rem"}}  />
                <input type="file" name="avatar" required  onChange={changeFormData} accept="image/*" />
              </div>
              <button type="submit" style={{width:"80%",height:"2rem",marginBottom:"1rem"}}>Sign Up</button>
            </form>
        </Box>}
      </Container>
    </>
  );
}
