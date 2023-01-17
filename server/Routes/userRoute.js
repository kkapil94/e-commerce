import { Router } from "express";
import * as controller from "../apiControllers/userController.js";
const route = Router()

route.post("/register",controller.registerUser)
route.post("/login",controller.loginUser)
route.post("/logout",controller.logoutUser)

export default route