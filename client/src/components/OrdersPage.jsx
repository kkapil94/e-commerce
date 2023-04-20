import React, { useEffect, useState } from "react";
import orderStore from "../Stores/orderStore";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import Loader from "./Loader";
export function OrderPage() {
  const param = useParams();
  const navigate = useNavigate();
  const order = orderStore((state) => state.getOrders);
  const [orders, setOrders] = useState();
  const getOrders = async () => {
    const { orders } = await order(param.id);
    setOrders(orders);
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
    {!orders?<Loader/>:
      <Container sx={{ background: "#f1f3f6", paddingBottom: "1rem" }}>
        <Typography variant="h3">Your Orders:</Typography>
        <Box id="itemContainer" sx={{ marginTop: "2rem", paddingLeft: "1rem" }}>
          {orders &&
            orders.map((item) =>
              item.orderItems.map((items) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: "5rem",
                    margin: "2rem 0",
                    background: "#fff",
                    padding: "1rem",
                    ":hover": { cursor: "pointer" },
                  }}
                  onClick={() => navigate(`/order/${item._id}`)}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      alt=""
                      src={items.image}
                      style={{
                        width: "5.5rem",
                        border: "1px solid grey",
                        marginRight: "1rem",
                      }}
                    />
                    <Typography variant="subtitle1">
                      {items.name}
                      <br />
                      <Typography variant="subtitle2">
                        Quantity:{items.quantity}
                      </Typography>
                    </Typography>
                  </div>
                  <Typography variant="subtitle1">₹{items.price}</Typography>
                  
                  <Typography variant="subtitle1">
                    status:{item.orderStatus}
                  </Typography>
                </Box>
              ))
            )}
        </Box>
      </Container>
}
    </>
  );
}
