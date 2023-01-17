import { Router } from "express";
import * as controller from "../apiControllers/orderController.js"
import { isAuthenticated,authorizeRoles } from "../middleware/isAuthenticated.js";
const route = Router();

// create order
route.post("/order/create",isAuthenticated,controller.createNewOrder)

// get single order
route.get("/order/:id",isAuthenticated,controller.getSingleOrder)

// get all orders by a user
route.get("/order/myorders/:id",isAuthenticated,controller.myOrders)

//get all orders by admin
route.get("/admin/orders",isAuthenticated,authorizeRoles("admin"),controller.allOrders)

//update order --admin
route.put("/admin/order/:id",isAuthenticated,authorizeRoles("admin"),controller.updateOrder)

//delete order --admin
route.delete("/admin/order/:id",isAuthenticated,authorizeRoles("admin"),controller.deleteOrder)


export default route