import { Box, Button, Container, Grid, Typography } from "@mui/material"
import {useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from "react"
import userStore from "../Stores/userStore"
import UserUpdate from "../components/UserUpdate"
import PasswordUpdate from "../components/PassworUpdate"
export default function Account(){
    const [edit,setEdit] = useState(0)
    const user = userStore(state=>state.user)
    const isAuthenticated = userStore(state=>state.isAuthenticated)
    const navigate = useNavigate()
    const logoutUser = userStore(state=>state.logoutUser)
    const logout =async ()=>{
        const response =await logoutUser()
        if(response.data.sucsess){
            navigate("/")
            sessionStorage.removeItem("user");
        }
    }
    useEffect(() => {
     if(!isAuthenticated){
        navigate("/login")
     }
    }, [])
    
    return(
        <>{isAuthenticated&&
            <><UserUpdate open={edit} edit={(edit)=>setEdit(edit)} />
              <PasswordUpdate open={edit} edit={(edit)=>setEdit(edit)} />   
            <Container maxWidth="lg" sx={{height:"100vh"}}>
                <Typography variant='h3' letterSpacing={2.5} sx={{borderBottom:'2px solid gray',display:'inline-block',marginTop:'1rem'}}>My Profile</Typography>
                <Grid container alignItems="center" justifyContent="center" sx={{height:"90vh"}} direction="row">
                    <Grid container item lg={6} sm={6} xs={12} direction="column" justifyContent={"center"} alignItems="center">
                        <img src={user.avatar.url} style={{height:"20rem",width:"20rem",display:"inline",borderRadius:"50%"}}/>
                        <Button variant="outlined" sx={{marginTop:"2rem",width:'50%'}} onClick={()=>setEdit(true)}>Edit Profile</Button>
                    </Grid>
                    <Grid container item lg={6} sm={6} xs={12} direction="column" sx={{paddingLeft:"7rem",rowGap:"2rem"}} >
                        <Box>
                            <Typography variant="h6">Full Name</Typography>
                            <Typography variant="subtitle1">{user.name}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">Email</Typography>
                            <Typography variant="subtitle1">{user.email}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">Joined At</Typography>
                            <Typography variant="subtitle1">{String(user.createdAt).substring(0,10)}</Typography>
                        </Box>
                        <Box>
                            <Button variant="outlined" sx={{display:"block",marginBottom:"1rem",width:"70%"}}>My Orders</Button>
                            <Button variant="outlined" sx={{width:"70%",marginBottom:"1rem"}} onClick={()=>setEdit(1)}>Change Password</Button>
                            <Button variant="outlined" sx={{width:"70%"}} onClick={logout} >Log Out</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            </>
}
        </>
    )
}