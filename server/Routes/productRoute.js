import { Router } from "express"
import * as controller from "../apiControllers/productController.js"
import {isAuthenticated} from "../middleware/isAuthenticated.js"
const route = Router()

route.get('/products',controller.getProducts)
route.get('/:id',controller.getDetails)
route.post('/new',isAuthenticated,controller.createProduct)
route.put('/:id',isAuthenticated,controller.updateProduct)
route.delete('/:id',isAuthenticated,controller.deleteProducts) 
route.put('/review',isAuthenticated,controller.createdProductReview) 

export default route