import {  Box, Button, IconButton, Input, Modal, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useState } from "react";
import {useAlert} from "react-alert"
import userStore from "../Stores/userStore";
import Loader from "./Loader";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {lg:"25rem",md:"25rem",sm:"25rem",xs:"19rem"},
    maxHeight:'35rem',
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: {lg:"2rem 2rem 0 2rem",md:"2rem 2rem 0 2rem",sm:"2rem 2rem 0 2rem",xs:"1rem 1rem 0 1rem"},
    borderRadius:'.5rem',
    zIndex:"1100"
  };

export default function PasswordUpdate(props) {
    const alert = useAlert()
    const user = userStore(state=>state.user)
    const updatePassword = userStore(state=>state.updatePassword)
    const [loading,setLoading] = useState()
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
        setLoading(true)
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
            alert.success("Password changed successfully")
            setPassword({
                oldOne:"",
                newOne:"",
                reNewOne:""
            })
            setLoading(false)
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
      sx={{zIndex:"1101"}}
    >
      {loading?<Loader/>:<Box sx={style}>
        <Box sx={{borderBottom:"2px solid gray",display:"flex",justifyContent:"space-between",paddingBottom:{lg:".5rem",md:".5rem",sm:"0",xs:"0"},zIndex:"-1"}}>
            <Typography sx={{typography:{lg:"h4",md:"h4",sm:"h5",xs:"h6"}}} >Change Password</Typography>
            <IconButton onClick={close}><CancelIcon/></IconButton>
        </Box>
        <form onSubmit={changePassword} style={{display:"flex",flexDirection:"column",width:"100%",height:"26rem",justifyContent:"space-evenly"}}>
            <Box >
                <Typography sx={{typography:{lg:"h6",md:"h6",sm:"h6",xs:"subtitle1"}}}>Old Password</Typography>
                <Input placeholder="Enter your old password" type="password" sx={{width:"100%"}} required name="oldOne" value={password.oldOne} onChange={changeData} />
            </Box>
            <Box>
                <Typography sx={{typography:{lg:"h6",md:"h6",sm:"h6",xs:"subtitle1"}}}>New Password</Typography>
                <Input placeholder="Enter your new password" type="password" sx={{width:"100%"}} required name="newOne" value={password.newOne} onChange={changeData}/>
            </Box>
            <Box>
                <Typography sx={{typography:{lg:"h6",md:"h6",sm:"h6",xs:"subtitle1"}}}>Confirm New Password</Typography>
                <Input placeholder="Re-enter your new Password" type="password" sx={{width:"100%"}} required name="reNewOne" value={password.reNewOne} onChange={changeData}/>
            </Box>
            <Button variant="outlined" type="submit">Change Password</Button>
        </form>
      </Box>}
    </Modal>
  );
}
