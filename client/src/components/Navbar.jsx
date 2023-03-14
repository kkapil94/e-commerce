import React,{useState} from 'react'
import {AppBar, Box, Button, IconButton, Toolbar, TextField} from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {Link, useNavigate} from "react-router-dom"
import userStore from '../Stores/userStore';
import '../index.css'
export default function Navbar() {
    const user = userStore(state=>state.user)
    const navigate = useNavigate()
    const [keyword,setKeyword] = useState(false)
    const handleClick = (e)=>{
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }else{
            navigate('/products')
        }
    }
  return (
    <>
    <Box >
        <AppBar color='inherit' sx={{position:'relative',zIndex:"5"}} >
            <Toolbar >
                <Box id='navBar' >
                    <Button component={Link} to={"/"}>Home</Button>
                    <Button component={Link} to={"/products"}>Products</Button>
                    <Button component={Link} to={"/search"} >Search</Button>
                </Box> 
                <Box sx={{margin:'auto',display:"flex"}} >
                    <img src='./images/logo1234.jpg' style={{width:'4.5rem',cursor:"pointer",marginRight:"1rem"}} alt=''/>
                    <TextField size="small" sx={{width:"25rem"}} onChange={(e)=>setKeyword(e.target.value)}></TextField>
                    <Button variant='outlined' sx={{height:"2.5rem"}} onClick={handleClick}>Search</Button>
                </Box>
                <Box sx={{marginLeft:'9.5rem'}}>
                    <IconButton >
                        <ShoppingCartOutlinedIcon fontSize='large'/>
                    </IconButton>
                    <IconButton sx={{marginLeft:'5px'}} component={Link} to="/login">
                        {user? <img src={user.avatar.url} alt="" style={{height:"1.9rem",width:"1.9rem",borderRadius:"50%"}}/>:
                              <AccountCircleOutlinedIcon fontSize='large'/>
                        }
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
        
    </Box>
    </>
  )
}
