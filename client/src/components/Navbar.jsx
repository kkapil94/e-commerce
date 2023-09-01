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
            document.body.style.overflow = "hidden"
        }
        else{
            openIcon.current.id = "open"
            closeIcon.current.id = "close"
            nav.current.id = "nav"
            document.body.style.overflow = "initial"
        }
    }
  return (
    <>
    <Box >
        <AppBar color='inherit' sx={{position:"relative",maxHeight:'4rem',}}>
            <Toolbar>
                <IconButton id="close" ref={closeIcon} onClick={()=>controlNavbar(false)} sx={{display:"none",zIndex:"1102",padding:0}}>
                    <CloseRoundedIcon/>
                </IconButton>
                <IconButton id="open" ref={openIcon} onClick={()=>controlNavbar(true)} sx={{display:"none",zIndex:"1012",padding:0}}>
                    <MenuRoundedIcon/>
                </IconButton>
                <Box id='nav' ref={nav} onClick={()=>setNavbar(false)}>
                    <Button component={Link} to={"/"} id="page" onClick={()=>controlNavbar(false)} sx={{fontSize:"1.1rem"}}>Home</Button>
                    <Button component={Link} to={"/products"} id="page" onClick={()=>controlNavbar(false)} sx={{fontSize:"1.1rem"}}>Products</Button>
                </Box> 
                <form id="logoContainer" style={{margin:"auto",display:"flex"}} onSubmit={handleClick}>
                    <Box sx={{width:{lg:"4.5rem",md:"4rem",sm:"3.5rem",xs:"2.9rem"},marginRight:"1.2rem"}}>
                    <img className="logo" src='./images/logo1234.jpg' style={{width:'80%',height:"80%",cursor:"pointer"}} alt=''/>
                    </Box>
                    <Box className="searchbar" style={{display:"flex",justifyContent:'center'}}>
                    <TextField id="searchBar"  size="small" sx={{width:{lg:"25rem",md:"22rem",},zIndex:1}} onChange={(e)=>setKeyword(e.target.value)} placeholder="Search any product" value={keyword}></TextField>
                    <Button variant='outlined'size='small'  sx={{height:"2.5rem",fontSize:"1.1rem"}} onClick={handleClick}>Search</Button>
                    </Box>
                </form>
                <Box >
                    <IconButton onClick={()=>navigate('/cart')} sx={{marginLeft:'5px',padding:{lg:".5rem",md:".5rem",sm:"0rem",xs:"0rem"}}}>
                        <ShoppingCartOutlinedIcon sx={{fontSize:{lg:"2rem",md:"2rem",sm:"1.8rem",xs:"1.8rem"}}}/>
                    </IconButton>
                    <IconButton sx={{marginLeft:'5px',padding:{lg:".5rem",md:".5rem",sm:"0rem",xs:"0rem"}}} component={Link} to="/login" >
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
