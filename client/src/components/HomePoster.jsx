import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'

export default function HomePoster() {
  return (
    <>
      <Container maxWidth='lg' sx={{marginTop:'4rem'}}>
            <Box sx={{background:'rgb(249 249 249)'}}>
                <Grid container justifyContent={'flex-start'} alignItems='center'>
                    <Grid id="main" item  lg={6} md={6} sm={6} justifyContent="center">
                        <Typography  sx={{typography:{lg:"h3",md:"h3",sm:"h4",xs:"h5"},fontWeight:'bold',padding:{lg:'2rem',md:"1rem",sm:".5rem",xs:".5rem"}}}>
                            Lowest Prices<br/>Best Quality<br/> Shopping
                        </Typography>
                        <Stack direction='row' sx={{background:'rgb(255 255 255)',width:{lg:'80%',md:"80%",sm:"100%",xs:"100%"},marginLeft:{lg:'1.5rem',xs:".1rem"},padding:{lg:'.6rem .5rem',xs:".6rem .1rem"},borderRadius:'.5rem',borderSpacing:{lg:"1rem",xs:".5rrem"}}} >
                            <Box sx={{display:'flex',alignItems:'center',borderRight:'1px solid gray',paddingRight:{lg:'1rem',xs:".5rem"}}}><img className='posterImg' src="./images/freeDelivery.svg" alt='' style={{width:"2rem",height:'2rem',backgroundColor:'rgb(247 168 202)',borderRadius:'50%'}}/><Typography sx={{marginLeft:{lg:'1rem',sm:".1rem",xs:".5rem"},lineHeight:'1.3',fontWeight:'bold',typography:{lg:"subtitle1",md:"body2",xs:"body2"}}}  >Free<br/>Shipping</Typography></Box>
                            <Box sx={{display:'flex',alignItems:'center',borderRight:'1px solid gray',paddingRight:{lg:'1rem',xs:".5rem"},marginLeft:{md:"1.5rem",sm:".5rem",xs:'.5rem'}}}><img className='posterImg' src="./images/cod.svg" alt='' style={{width:'2.0rem',height:'2rem',backgroundColor:'rgb(247 168 202)',borderRadius:'50%'}}/><Typography sx={{marginLeft:{lg:'1rem',sm:".1rem",xs:".5rem"},lineHeight:'1.3',fontWeight:'bold',typography:{lg:"subtitle1",sm:"body2",xs:"body2"}}}  >Cash on<br/>Delivery</Typography></Box>
                            <Box sx={{display:'flex',alignItems:'center',marginLeft:{md:"1.5rem",sm:".5rem",xs:'.5rem'}}}><img className='posterImg' src="./images/easyReturns.svg" alt='' style={{width:'2.0rem',height:'2rem',backgroundColor:'rgb(247 168 202)',borderRadius:'50%'}}/><Typography sx={{marginLeft:{lg:'1rem',sm:".1rem",xs:".5rem"},lineHeight:'1.3',fontWeight:'bold',typography:{lg:"subtitle1",sm:"body2",xs:"body2"}}}  >Easy<br/>Returns</Typography></Box>
                        </Stack>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} sx={{paddingLeft:{sm:"1rem"}}}>
                        <img className='mainPoster' src="./images/prod.jpg" alt="" style={{width:"100%"}}/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </>
  )
}
