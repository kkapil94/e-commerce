import {  Box, Stack, Typography, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React from 'react'

export default function Footer() {
  return (
    <>
        <Stack direction="row" justifyContent="space-around" sx={{height:"25rem",padding:"5rem",background:"#fafafb"}}>
            <Box sx={{width:"20rem"}}>
                <Typography variant="h6" textAlign={"center"}>
                    DOWNLOAD OUR APP <br /> Download App for Android and Ios mobile phone
                </Typography>
                <Box sx={{width:"10rem"}}>
                    <img src="./images/download.jpg" alt="" style={{width:'20rem'}}/>
                </Box>
            </Box>
            <Box sx={{width:"20rem"}}>
                <Typography variant='h3' textAlign={"center"}>KK Mart</Typography>
                <Typography variant="h6" textAlign={"center"}>High Quality is our first priority<br/>copyright 2023 © kapil</Typography>
            </Box>
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-around",width:"20rem"}}>
                <Typography variant='h5'>Follow US</Typography>
                <Link href="https://github.com/kkapil94" underline="always" color="inherit">Github <GitHubIcon/></Link>
                <Link href="https://www.linkedin.com/in/kapil-khatri-151413249/" underline="always" color="inherit">LinkedIn <LinkedInIcon/></Link>
                <Link href="https://fueler.io/kapil_94" underline="always" color="inherit">Fueler <img alt='' style={{height:"1.5rem",width:"1.5rem",borderRadius:"50%"}} src="./images/fueler3.jpg"/></Link>
            </Box>
        </Stack>
    </>
  )
}
