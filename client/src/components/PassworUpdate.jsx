import {  Box, Button, IconButton, Input, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import {useAlert} from "react-alert"
import userStore from "../Stores/userStore";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    minHeight:'35rem',
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius:'1rem',
    zIndex:"1100"
  };

export default function PasswordUpdate(props) {
    const alert = useAlert()
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
        console.log(password.newOne.length);
        if(password.newOne.length<6){
            alert.show("Password should be of more than 6 characters");
        }else if(password.reNewOne !== password.newOne)
        {
            alert.show("Password does not matches.")
        }else
        {   console.log({old:password.oldOne,new:password.newOne});
            const response = await updatePassword(password,user);
            console.log(response.data.success,"success");
            if(response.data.success){
            alert.show("Password changed successfully")
            close()
            }
        }
    }
  return (
    <Modal
      open={Boolean(props.open)}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{zIndex:"10"}}
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
                <Input placeholder="Enter your new password" type="password" sx={{width:"100%"}} required name="newOne" value={password.newOne} onChange={changeData}/>
            </Box>
            <Box>
                <Typography variant="h6">Confirm New Password</Typography>
                <Input placeholder="Re-enter your new Password" type="password" sx={{width:"100%"}} required name="reNewOne" value={password.reNewOne} onChange={changeData}/>
            </Box>
            <Button variant="outlined" type="submit" sx={{marginTop:"2rem"}}>Change Password</Button>
        </form>
      </Box>
    </Modal>
  );
}
