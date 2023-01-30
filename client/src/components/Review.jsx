import { Avatar, Card, CardContent, CardHeader, Rating, Typography } from '@mui/material'
import React from 'react'
import "../index.css"
export default function Review(props) {
  return (
    <>
    {props.review && props.review.map((rev)=>(
        <Card  sx={{width:"30rem",display:"flex",flexDirection:"column",margin:"0 2rem"}}>
            <CardHeader className="avatar" sx={{display:"flex",flexDirection:"column"}}
                avatar={
                    <Avatar  sx={{margin:"0 0 0.4rem 0"}}>
                      k
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
