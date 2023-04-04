import React, { useEffect, useState } from "react"
import {DataGrid} from "@mui/x-data-grid"
import orderStore from "../Stores/orderStore";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import "./OrdersPage.css"
export  function OrderPage(){
    const param = useParams()
    const order = orderStore(state=>state.getOrders)
    const [orders,setOrders] = useState()
    const columns = [
        {field:"id",headerName:"Order Id",minWidth:300,flex:1},
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:0.5
        },
        {
            field:"itemsQty",
            headerName:"Items Quantity",
            type:"number",
            minWidth:150,
            flex:0.3
        },
        {
            field:"amount",
            headerName:"Amount",
            type:"number",
            minWidth:270,
            flex:0.5
        }
    ]
    const getOrders = async()=>{
        const {orders} = await order(param.id);
        setOrders(orders.map(item=>(
            {
                itemsQty:item.orderItems.length,
                id:item._id,
                status:item.orderStatus,
                amount:item.totalPrice
            }
        )))
    }
    useEffect(()=>{
        getOrders()
    },[getOrders])
    return(
        <>
            {orders?<DataGrid
                columns={columns}
                rows={orders}
                disableRowSelectionOnClick
                autoHeight
            />: <Box sx={{ display: "flex",height:"100vh",width:"100vw",alignItems:'center',justifyContent:"center",overflow:"hidden" }}>
            <CircularProgress />
          </Box> }
        </>
)}
