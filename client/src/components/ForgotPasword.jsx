import { Box, Button, Container, Input, Typography } from '@mui/material'
import { useAlert } from 'react-alert'
import React, { useState } from 'react'
import userStore from '../Stores/userStore'

export default function ForgotPasword() {
    const alert = useAlert()
    const [mail,setMail] = useState("")
    const forgot = userStore(state=>state.forgotPassword)
const submit =async (e)=>{
    e.preventDefault()
    const {response} = await forgot(mail);
    if(!response.data.success){
        alert.show(response.data.message)
    }
}

  return (
    <>
        <Container maxWidth="lg" sx={{height:"80vh",width:"100vw",display:"flex",alignItems:"center",justifyContent:'center'}}>
            <Box sx={{border:"2px solid grey",borderRadius:"1rem",height:"18rem",width:"18rem",padding:"2rem"}}>
                <Typography variant="h5" textAlign="center" sx={{borderBottom:"2px solid gray",padding:".3rem"}}>Forgot Password</Typography>
                <form onSubmit={submit} style={{height:"10rem",display:"flex",flexDirection:"column",justifyContent:"space-evenly",marginTop:"1rem"}}>
                    <Input type="email" placeholder='Enter your email' value={mail} onChange={(e)=>setMail(e.target.value)}/>
                    <Button variant="outlined" type='submit'>submit</Button>
                </form>
            </Box>
        </Container>
    </>
  )
}
