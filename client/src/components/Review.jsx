import { Avatar, Card, CardContent, CardHeader, Rating, Typography } from '@mui/material'
import React from 'react'
import "../index.css"
export default function Review(props) {
  return (
    <>
    {props.review && props.review.map((rev)=>(
        <Card  sx={{width:"20rem",minHeight:"15rem",display:"flex",flexDirection:"column",margin:"1rem 2rem"}} key={rev._id}>
            <CardHeader className="avatar" sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}
                avatar={
                    <Avatar  sx={{marginLeft:"1.0rem"}}>
                      {rev.name[0]}
                    </Avatar>
                  }
                  title={rev.name}
            />
            <CardContent sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <Rating value={rev.rating} />
                <Typography variant="body1">{rev.comment}</Typography>
            </CardContent>
        </Card>
    ))
    }
    </>
  )
}
