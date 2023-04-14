import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from "react"
import userStore from "../Stores/userStore"
import UserUpdate from "../components/UserUpdate"
import PasswordUpdate from "../components/PassworUpdate"
import { useAlert } from "react-alert"
export default function Account(){
    const alert = useAlert()
    const [edit,setEdit] = useState(0)
    const [passUp,setPassUp] = useState(0)
    const user = userStore(state=>state.user)
    const isAuthenticated = userStore(state=>state.isAuthenticated)
    const navigate = useNavigate()
    const logoutUser = userStore(state=>state.logoutUser)
    const logout =async ()=>{
        const response =await logoutUser()
        if(response.data.sucsess){
            alert.success("Logout Successfully")
            navigate("/")
            sessionStorage.removeItem("user");
        }
    }
    useEffect(() => {
     if(!isAuthenticated){
        navigate("/login")
     }
    }, [navigate,isAuthenticated])
    
    return(
        <>{isAuthenticated&&
            <><UserUpdate open={edit} edit={(edit)=>setEdit(edit)} />
              <PasswordUpdate open={passUp} edit={(passUp)=>setPassUp(passUp)} />   
            <Container maxWidth="lg" sx={{marginTop:"2rem"}}>
                <Typography  letterSpacing={2.5} sx={{typography:{lg:"h3",md:"h3",sm:"h3",xs:"h4"},borderBottom:'2px solid gray',display:'inline-block',marginTop:'1rem'}}>My Profile</Typography>
                <Grid container alignItems="center" justifyContent="center" sx={{height:{lg:"90vh",md:"90vh",sm:"90vh",xs:"initial"},marginTop:{lg:"0",md:"0",sm:"0",xs:"2rem"}}} direction="row">
                    <Grid container item lg={6} sm={6} xs={12} direction="column" justifyContent={"center"} alignItems="center">
                        <Box sx={{height:{lg:"20rem",md:"20rem",sm:"18rem",xs:"12rem"},width:{lg:"20rem",md:"20rem",sm:"18rem",xs:"12rem"},marginBottom:{lg:0,md:0,sm:"3rem"}}}>
                        <img src={user.avatar.url} style={{height:"100%",width:"100%",display:"inline",borderRadius:"50%"}} alt=""/>
                        </Box>
                        <Button variant="outlined" sx={{marginTop:{lg:"2rem",md:"2rem",sm:"0",xs:"1rem"},width:'50%'}} onClick={()=>setEdit(true)}>Edit Profile</Button>
                    </Grid>
                    <Grid container item lg={6} sm={6} xs={12} direction="column"  sx={{paddingLeft:{lg:"7rem",md:"7rem",sm:0},margin:{lg:"0",md:"0",sm:"0",xs:"1rem"},rowGap:"2rem"}} >
                        <Box sx={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                            <Typography sx={{typography:{lg:"h6",md:"h6",sm:"h6",xs:"subtitle1"}}}>Full Name</Typography>
                            <Typography letterSpacing={2} sx={{typography:{lg:"subtitle1",md:"subtitle1",sm:"subtitle1",xs:"subtitle2"},fontWeight:"100"}} >{user.name}</Typography>
                        </Box>
                        <Box sx={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                            <Typography sx={{typography:{lg:"h6",md:"h6",sm:"h6",xs:"subtitle1"}}}>Email</Typography>
                            <Typography letterSpacing={2} sx={{typography:{lg:"subtitle1",md:"subtitle1",sm:"subtitle1",xs:"subtitle2"}}} >{user.email}</Typography>
                        </Box>
                        <Box sx={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                            <Typography sx={{typography:{lg:"h6",md:"h6",sm:"h6",xs:"subtitle1"}}}>Joined At</Typography>
                            <Typography letterSpacing={2} sx={{typography:{lg:"subtitle1",md:"subtitle1",sm:"subtitle1",xs:"subtitle2"}}} >{String(user.createdAt).substring(0,10)}</Typography>
                        </Box>
                        <Box>
                            <Button variant="outlined" sx={{display:"block",marginBottom:"1rem",width:{lg:"70%",md:"70%",sm:"100%",xs:"100%"}}} onClick={()=>navigate(`/order/myOrders/${user._id}`)}>My Orders</Button>
                            <Button variant="outlined" sx={{width:{lg:"70%",md:"70%",sm:"100%",xs:"100%"},marginBottom:"1rem"}} onClick={()=>setPassUp(1)}>Change Password</Button>
                            <Button variant="outlined" sx={{width:{lg:"70%",md:"70%",sm:"100%",xs:"100%"}}} onClick={logout} >Log Out</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            </>
}
        </>
    )
}