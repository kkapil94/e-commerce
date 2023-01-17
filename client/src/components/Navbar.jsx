import React from 'react'
import {AppBar, Box, Button, IconButton, Toolbar} from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import '../index.css'
export default function Navbar() {
    const pages = ['Home','Shop','Contact_Us'];
  return (
    <>
    <Box >
        <AppBar color='inherit' sx={{position:'relative'}} >
            <Toolbar >
                <Box id='navBar' >
                    {pages.map((page)=>(
                        <Button>{page}</Button>
                    ))}
                </Box>
                <IconButton sx={{margin:'auto'}} >
                    <img src='./images/mLogo.jpeg' style={{width:'3.5rem'}} alt=''></img>
                </IconButton>
                <Box sx={{marginLeft:'9.5rem'}}>
                    <IconButton >
                        <ShoppingCartOutlinedIcon fontSize='large'/>
                    </IconButton>
                    <IconButton sx={{marginLeft:'5px'}}>
                        <AccountCircleOutlinedIcon fontSize='large'/>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
    </>
  )
}
