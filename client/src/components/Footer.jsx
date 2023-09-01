import {  Box, Stack, Typography, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import React from 'react'

export default function Footer() {
  return (
    <>
        <Stack  justifyContent="space-around"  sx={{height:{lg:"25rem",md:"25rem",sm:"100%"},padding:{lg:"5rem",md:"3rem",sm:"1rem"},background:"#eeeefd",flexDirection:{lg:"row",md:"row",sm:"column"},marginTop:"1.5rem",alignItems:{lg:"flex-start",md:"flex-start",sm:"center",xs:"center"}}}>
            <Box sx={{width:{lg:"20rem",sm:"15rem"},marginBottom:"2rem"}}>
                <Box>
                <Typography variant="h6" textAlign={"center"} letterSpacing={1}> DOWNLOAD OUR APP </Typography>
                <Typography sx={{typography:"subtitle1",textAlign:"center"}}> Download App for Android and Ios mobile phone</Typography>
                </Box>
                <Box sx={{width:{lg:"20rem",md:"15rem",sm:"15rem",xs:"15rem"},margin:"auto"}}>
                    <img src="./images/untitled.png" alt=""  style={{width:'100%'}}/>
                </Box>
            </Box>
            <Box sx={{width:"20rem",marginBottom:"1.5rem"}}>
                <Typography sx={{typography:{lg:"h4",sm:"h3",xs:"h4"}}} textAlign={"center"}>KK Mart</Typography>
                <Typography sx={{typography:{lg:"h6",sm:"h6",xs:"h6"}}}  textAlign={"center"}>High Quality is our first priority<br/>copyright 2023 © kapil</Typography>
            </Box>
            <Box sx={{display:"flex",flexDirection:{lg:"column",md:"column",sm:"row"},width:{lg:"20rem",md:"10rem",xs:"100%"},justifyContent:"space-evenly"}}>
                <Typography variant='h5' sx={{display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>Follow US</Typography>
                <Link href="https://github.com/kkapil94" underline="always" color="inherit" sx={{marginTop:"1.5rem",fontSize:{lg:'1.2rem',md:"1.2rem",sm:"1rem",xs:".8rem"}}}>Github <GitHubIcon/></Link>
                <Link href="https://www.linkedin.com/in/kapil-khatri-151413249/" underline="always" color="inherit" sx={{marginTop:"1.5rem",fontSize:{lg:'1.2rem',md:"1.2rem",sm:"1rem",xs:".8rem"}}}>LinkedIn <LinkedInIcon/></Link>
                <Link href="https://fueler.io/kapil_94" underline="always" color="inherit" sx={{marginTop:"1.5rem",fontSize:{lg:'1.2rem',md:"1.2rem",sm:"1rem",xs:".8rem"}}}>Fueler <img alt='' style={{height:"1.5rem",width:"1.5rem",borderRadius:"50%"}} src="./images/fueler3.jpg"/></Link>
            </Box>
        </Stack>
    </>
  )
}
