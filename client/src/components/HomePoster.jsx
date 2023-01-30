import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'

export default function HomePoster() {
  return (
    <>
      <Container maxWidth='lg' sx={{marginTop:'4rem'}}>
            <Box sx={{background:'rgb(249 249 249)'}}>
                <Grid container justifyContent={'center'} alignItems='center'>
                    <Grid item lg={6} md={6} sm={12} justifyContent={"center"}>
                        <Typography variant='h3' sx={{fontWeight:'bold',padding:'2rem'}}>
                            Lowest Prices<br/>Best Quality Shopping
                        </Typography>
                        <Stack direction='row' sx={{background:'rgb(255 255 255)',width:'90%',marginLeft:'1.5rem',padding:'.6rem .5rem',borderRadius:'.5rem'}} spacing='1rem'>
                            <div style={{display:'flex',alignItems:'center',borderRight:'1px solid black',paddingRight:'3rem'}}><img src="./images/freeDelivery.svg" alt='' style={{width:'2.0rem',height:'2rem',backgroundColor:'rgb(247 168 202)',borderRadius:'50%'}}/><Typography sx={{marginLeft:'1rem',lineHeight:'1.3',fontWeight:'bold'}} variant='subtitle1' >Free<br/>Shipping</Typography></div>
                            <div style={{display:'flex',alignItems:'center',borderRight:'1px solid black',paddingRight:'3rem'}}><img src="./images/cod.svg" alt='' style={{width:'2.0rem',height:'2rem',backgroundColor:'rgb(247 168 202)',borderRadius:'50%'}}/><Typography sx={{marginLeft:'1rem',lineHeight:'1.3',fontWeight:'bold'}} variant='subtitle1' >Cash on<br/>Delivery</Typography></div>
                            <div style={{display:'flex',alignItems:'center'}}><img src="./images/easyReturns.svg" alt='' style={{width:'2.0rem',height:'2rem',backgroundColor:'rgb(247 168 202)',borderRadius:'50%'}}/><Typography sx={{marginLeft:'1rem',lineHeight:'1.3',fontWeight:'bold'}} variant='subtitle1' >Easy<br/>Returns</Typography></div>
                        </Stack>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                        <img src="./images/prod.jpg" alt="" style={{width:'35rem'}}/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </>
  )
}
