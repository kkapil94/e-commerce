import React,{useRef, useState} from 'react'
import {AppBar, Box, Button, IconButton, Toolbar, TextField} from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {Link, useNavigate} from "react-router-dom"
import userStore from '../Stores/userStore';
import './Navbar.css'
export default function Navbar() {
    const user = userStore(state=>state.user)
    const openIcon = useRef()
    const closeIcon = useRef()
    const nav = useRef()
    const [navbar,setNavbar] = useState(false)
    const navigate = useNavigate()
    const [keyword,setKeyword] = useState(false)
    const handleClick = (e)=>{
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }else{
            navigate('/products')
        }
    }
    const controlNavbar = (control)=>{
        if(control){
            openIcon.current.id = "close"
            closeIcon.current.id = "open"
            nav.current.id = "navBar"
        }
        else{
            openIcon.current.id = "open"
            closeIcon.current.id = "close"
            nav.current.id = "nav"
        }
    }
  return (
    <>
    <Box >
        <AppBar color='inherit' sx={{position:'relative'}} >
            <Toolbar >
                <IconButton id="close" ref={closeIcon} onClick={()=>controlNavbar(false)} sx={{display:"none",zIndex:"10"}}>
                    <CloseRoundedIcon/>
                </IconButton>
                <IconButton id="open" ref={openIcon} onClick={()=>controlNavbar(true)} sx={{display:"none",zIndex:"10"}}>
                    <MenuRoundedIcon/>
                </IconButton>
                <Box id='nav' ref={nav} onClick={()=>setNavbar(false)}>
                    <Button component={Link} to={"/"} id="page">Home</Button>
                    <Button component={Link} to={"/products"} id="page">Products</Button>
                    <Button component={Link} to={"/search"} id="page">Search</Button>
                </Box> 
                <Box id="logoContainer" sx={{margin:'auto',display:"flex"}} >
                    <img className="logo" src='./images/logo1234.jpg' style={{width:'4.5rem',cursor:"pointer",marginRight:"1rem"}} alt=''/>
                    <div className="searchbar">
                    <TextField id="searchBar"  size="small" sx={{width:{lg:"25rem",md:"22rem"},zIndex:-1}} onChange={(e)=>setKeyword(e.target.value)} placeholder="Search any product"></TextField>
                    <Button variant='outlined' sx={{height:"2.5rem"}} onClick={handleClick} >Search</Button>
                    </div>
                </Box>
                <Box sx={{marginLeft:'auto'}}>
                    <IconButton onClick={()=>navigate('/cart')} size={"large"}>
                        <ShoppingCartOutlinedIcon fontSize='large'/>
                    </IconButton>
                    <IconButton sx={{marginLeft:'5px'}} component={Link} to="/login" size={"large"}>
                        {user? <img src={user.avatar.url} alt="" style={{height:"1.9rem",width:"1.9rem",borderRadius:"50%"}}/>:
                              <AccountCircleOutlinedIcon fontSize={'large'}/>
                        }
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
        
    </Box>
    </>
  )
}
