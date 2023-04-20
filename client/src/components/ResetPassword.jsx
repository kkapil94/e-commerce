import { Box, Button, Container, IconButton, Input, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import userStore from '../Stores/userStore';


export default function ResetPassword() {
    const navigate = useNavigate()
    const params = useParams()
    const resetPass = userStore(state=>state.resetPass)
    const alert = useAlert()
    const [password,setPassword] = useState({
        newOne:"",
        reNewOne:""
    })
    const changeData = (e)=>{
        setPassword({
            ...password,[e.target.name]:e.target.value
        })
    }
    const changePassword =async (e)=>{
        e.preventDefault()
        if(password.newOne.length<6){
            alert.show("Password should be of 6 or more than 6 characters");
        }else if(password.reNewOne !== password.newOne)
        {
            alert.show("Password does not matches.")
        }else
        {  
            const response =await resetPass(params.token,password)
            if(response.data.success){
                alert.success("password reset successfully")
                navigate("/login")
            }
        }
    }
  return (
    <>
        <Container maxWidth="lg" sx={{height:"80vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Box sx={{border:"2px solid black",height:"25rem",borderRadius:"1rem",width:"25rem",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Typography variant="h4" sx={{borderBottom:"2px solid grey",marginTop:'1rem',paddingBottom:".3rem"}}>Change Password</Typography>
        <form onSubmit={changePassword} style={{display:"flex",flexDirection:"column",width:"25rem",height:"25rem",justifyContent:"space-evenly",padding:"2rem"}}>
            <Box>
                <Typography variant="h6">New Password</Typography>
                <Input placeholder="Enter your new password" type="password"  required name="newOne" value={password.newOne} onChange={changeData} sx={{width:"100%"}}/>
            </Box>
            <Box>
                <Typography variant="h6">Confirm New Password</Typography>
                <Input placeholder="Re-enter your new Password" type="password" sx={{width:"100%"}} required name="reNewOne" value={password.reNewOne} onChange={changeData}/>
            </Box>
            <Button variant="outlined" type="submit" sx={{marginTop:"2rem"}}>Change Password</Button>
        </form>
      </Box>
        </Container>
    </>
  )
}
