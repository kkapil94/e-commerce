import { Alert, Box, Button, IconButton, Input, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import userStore from "../Stores/userStore";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "30rem",
    minHeight:'35rem',
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius:'1rem',
    zIndex:-1
  };

export default function PasswordUpdate(props) {
    const user = userStore(state=>state.user)
    const updatePassword = userStore(state=>state.updatePassword)
    const [password,setPassword] = useState({
        oldOne:"",
        newOne:"",
        reNewOne:""
    })
    const changeData = (e)=>{
        setPassword({
            ...password,[e.target.name]:e.target.value
        })
    }
    const close = ()=>props.edit(0)
    const changePassword =async (e)=>{
        e.preventDefault()
        if(password.newOne.length<<6){
            console.log(password.newOne,password.newOne.length);
            <Alert severity="info" variant="outlined" sx={{zIndex:"10"}}>Password should be of more than 6 characters</Alert>
        }else if(password.oldOne !== password.newOne){
            <Alert severity="info">New password does not matches</Alert>
        }else{
            const response = await updatePassword(password.newOne,user);
            if(response.data.success === 1){
                <Alert severity="info">Password changed successfully</Alert>
            }
        }
    }
  return (
    <Modal
      open={Boolean(props.open)}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{borderBottom:"2px solid gray",display:"flex",justifyContent:"space-between",paddingBottom:".5rem",zIndex:"-1"}}>
            <Typography variant="h4" >ChangePassword</Typography>
            <IconButton onClick={close}><i class="fa-sharp fa-solid fa-circle-xmark"></i></IconButton>
        </Box>
        <form onSubmit={changePassword} style={{display:"flex",flexDirection:"column",width:"25rem",height:"26rem",justifyContent:"space-evenly",paddingLeft:"2rem"}}>
            <Box>
                <Typography variant="h6">Old Password</Typography>
                <Input placeholder="Enter your old password" sx={{width:"100%"}} required name="oldOne" value={password.oldOne} onChange={changeData}/>
            </Box>
            <Box>
                <Typography variant="h6">New Password</Typography>
                <Input placeholder="Enter your new password" sx={{width:"100%"}} required name="newOne" value={password.newOne} onChange={changeData}/>
            </Box>
            <Box>
                <Typography variant="h6">Confirm New Password</Typography>
                <Input placeholder="Re-enter your new Password" sx={{width:"100%"}} required name="reNewOne" value={password.reNewOne} onChange={changeData}/>
            </Box>
            <Button variant="outlined" type="submit" sx={{marginTop:"2rem"}}>Change Password</Button>
        </form>
      </Box>
    </Modal>
  );
}
