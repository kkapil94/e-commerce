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
    const [keyword,setKeyword] = useState()
    const handleClick = (e)=>{
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
            setKeyword("")
        }else{
            navigate('/products')
            setKeyword("")
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
                <form id="logoContainer" style={{margin:"auto",display:"flex"}} onSubmit={handleClick}>
                    <Box sx={{width:{lg:"4.5rem",md:"4rem",sm:"3.5rem",xs:"3rem"}}}>
                    <img className="logo" src='./images/logo1234.jpg' style={{width:'100%',cursor:"pointer",marginRight:"1rem"}} alt=''/>
                    </Box>
                    <div className="searchbar" style={{display:"flex",justifyContent:'center'}}>
                    <TextField id="searchBar"  size="small" sx={{width:{lg:"25rem",md:"22rem",},zIndex:1}} onChange={(e)=>setKeyword(e.target.value)} placeholder="Search any product" value={keyword}></TextField>
                    <Button variant='outlined'size='small'  sx={{height:"2.5rem"}} onClick={handleClick}>Search</Button>
                    </div>
                </form>
                <Box sx={{marginLeft:'auto'}}>
                    <IconButton onClick={()=>navigate('/cart')}>
                        <ShoppingCartOutlinedIcon sx={{fontSize:{lg:"2rem",md:"2rem",sm:"1.8rem",xs:"1.8rem"}}}/>
                    </IconButton>
                    <IconButton sx={{marginLeft:'5px'}} component={Link} to="/login" size={"large"}>
                        {user? <img src={user.avatar.url} alt="" style={{height:"1.9rem",width:"1.9rem",borderRadius:"50%"}}/>:
                              <AccountCircleOutlinedIcon sx={{fontSize:{lg:"2rem",md:"2rem",sm:"1.8rem",xs:"1.8rem"}}}/>
                        }
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
        
    </Box>
    </>
  )
}
