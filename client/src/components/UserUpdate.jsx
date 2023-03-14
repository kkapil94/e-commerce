import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, IconButton, Input } from "@mui/material";
import userStore from "../Stores/userStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30rem",
  height:'35rem',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius:'1rem'
};
export default function UserUpdate(props) {
    const user = userStore(state=>state.user)
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
        const response = await updateUser(userData) ;
        console.log(response.data);
        if(response.data.success){
            close()
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
        <Box sx={{display:"flex",flexDirection:'row',alignItems:'center',justifyContent:"space-between",marginBottom:"3.5rem",borderBottom:"2px solid gray",paddingBottom:"0.5rem"}}>
            <Typography variant="h4" >Update Profile</Typography>
            <IconButton onClick={close}><i class="fa-sharp fa-solid fa-circle-xmark"></i></IconButton>
        </Box>
        <form style={{display:"flex",flexDirection:"column"}} onSubmit={update}>
          <div>
            <Typography variant="h6">Name:</Typography>
            <Input placeholder="Enter Full Name" name="name" required value={userData.name} sx={{width:"100%"}} onChange={changeFormData}/>
          </div>
          <div style={{margin:"3rem 0 3rem 0"}}>
            <Typography variant="h6">Email:</Typography>
            <Input placeholder="Enter Your Email" name="email" required type="email" value={userData.email} sx={{width:"100%"}} onChange={changeFormData}/>
          </div>
          <div style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}>
            <img src={avatarPreview} alt="" style={{ height: "3rem", width: "3rem", marginRight:"2rem",borderRadius:'50%'}}/>
            <input type="file" name="avatar" onChange={changeFormData} accept="image/*" style={{width:"100%"}}/>
          </div>
          <Button type="submit" variant="outlined" sx={{marginTop:"2rem"}}>Update</Button>
        </form>
      </Box>
    </Modal>
  );
}
