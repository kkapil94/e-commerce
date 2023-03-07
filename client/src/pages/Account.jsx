import { Box, Button, Container, Grid, Typography } from "@mui/material"
import {useNavigate} from 'react-router-dom'
import React from "react"
import userStore from "../Stores/userStore"
export default function Account(){
    const user = userStore(state=>state.user)
    const isAuthenticated = userStore(state=>state.isAuthenticated)
    const navigate = useNavigate()
    const logoutUser = userStore(state=>state.logoutUser)
    const logout =async ()=>{
        const response =await logoutUser()
        console.log(response);
        if(response.data.sucsess){
            navigate("/")
            sessionStorage.clear()

        }
    }
    return(
        <>{isAuthenticated&&
            <Container maxWidth="lg" sx={{height:"100vh"}}>
                <Grid container alignItems="center" justifyContent="center" sx={{height:"90vh"}} direction="row">
                    <Grid container item lg={6} sm={6} xs={12} direction="column" justifyContent={"center"} alignItems="center">
                        <img src={user.avatar.url} style={{height:"20rem",width:"20rem",display:"inline"}}/>
                        <Button variant="outlined" sx={{marginTop:"2rem",width:'50%'}}>Edit Profile</Button>
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
                            <Button variant="outlined" sx={{width:"70%",marginBottom:"1rem"}}>Change Password</Button>
                            <Button variant="outlined" sx={{width:"70%"}} onClick={logout} >Log Out</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
}
        </>
    )
}