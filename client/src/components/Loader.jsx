import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export default function Loader() {
  return (
    <Box sx={{ display: "flex",height:"100vh",alignItems:'center',justifyContent:"center",overflow:"hidden" }}>
        <CircularProgress />
      </Box>
  )
}
