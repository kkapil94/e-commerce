import { Router } from "express";
import { checkout,paymentVerification } from "../apiControllers/PaymentController.js ";
const route = Router()

route.post("/checkout",checkout) 
route.post("/paymentVerification",paymentVerification) 

export default route