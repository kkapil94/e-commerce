import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, IconButton, Input } from "@mui/material";
import userStore from "../Stores/userStore";
import CancelIcon from '@mui/icons-material/Cancel';
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
export default function UserUpdate(props) {
    const user = userStore(state=>state.user)
    const [loading,setLoading] = React.useState(false)
    const [avatarPreview,setAvatarPreview] = React.useState(user.avatar.url)
    const close = ()=>{props.edit(0)}
    const updateUser = userStore(state=>state.updateUser)
    const [userData,setUserData] = React.useState({
        ...user,
        name:user.name,
        email:user.email,
        avatar:''
    })
    const changeFormData = (e)=>{
        if(e.target.name === 'avatar'){
            const reader = new FileReader();
          reader.onload = ()=>{
            if(reader.readyState === 2)
            {setUserData({...userData,avatar:reader.result})
            setAvatarPreview(reader.result)
            }
          }
          reader.readAsDataURL(e.target.files[0])
        }
        else{
            setUserData({...userData,[e.target.name]:e.target.value})
        }
    }
    const update = async (e)=>{
        e.preventDefault()
        setLoading(true)
        const response = await updateUser(userData) ;
        if(response.data.success){
          setLoading(false)
            close()
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
        <Box sx={{display:"flex",flexDirection:'row',alignItems:'center',justifyContent:"space-between",borderBottom:"2px solid gray",paddingBottom:"0.5rem"}}>
            <Typography sx={{typography:{lg:"h4",md:"h4",sm:"h5",xs:"h6"}}} >Update Profile</Typography>
            <IconButton onClick={close}><CancelIcon/></IconButton>
        </Box>
        <form style={{display:"flex",flexDirection:"column",width:"100%",height:"26rem",justifyContent:"space-evenly"}} onSubmit={update}>
          <div>
            <Typography sx={{typography:{lg:"h6",md:"h6",sm:"h6",xs:"subtitle1"}}}>Name:</Typography>
            <Input placeholder="Enter Full Name" name="name" required value={userData.name} sx={{width:"100%"}} onChange={changeFormData}/>
          </div>
          <Box >
            <Typography sx={{typography:{lg:"h6",md:"h6",sm:"h6",xs:"subtitle1"}}}>Email:</Typography>
            <Input placeholder="Enter Your Email" name="email" required type="email" value={userData.email} sx={{width:"100%"}} onChange={changeFormData}/>
          </Box>
          <Box sx={{display:'flex',alignItems:"center",justifyContent:"space-between"}}>
            <img src={avatarPreview} alt="" style={{ height: "3rem", width: "3rem", marginRight:"2rem",borderRadius:'50%'}}/>
            <input type="file" name="avatar" onChange={changeFormData} accept="image/*" style={{width:"100%"}}/>
          </Box>
          <Button type="submit" variant="outlined" >Update</Button>
        </form>
      </Box>}
    </Modal>
  );
}
