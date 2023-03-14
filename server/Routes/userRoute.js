import { Router } from "express";
import * as controller from "../apiControllers/userController.js";
const route = Router()

route.post("/register",controller.registerUser)
route.post("/login",controller.loginUser)
route.post("/logout",controller.logoutUser)
route.patch("/update",controller.updateUser)
route.patch("/updatePassword",controller.updatePassword)
route.post("/forgotPassword",controller.forgotPass)

export default route