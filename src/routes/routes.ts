import { Request, Response } from "express";
import { UserController } from "../controller/UserContorller";
import { WarehouseController } from "../controller/WarehouseContorller";
import { ProductController } from "../controller/ProductController";
import {AuthMiddleware} from "../middleware/AuthMiddleware"

const userController: UserController = new UserController()
const warehouseController: WarehouseController = new WarehouseController()
const productController: ProductController = new ProductController()
const authMiddleware: AuthMiddleware = new AuthMiddleware()

export class Routes{
    public routes(app: any): void{
        app.route("/ping")
        .get((req: Request, res: Response) =>{
            res.status(200).send({
                message: "pong!!"
            })
        })

        app.route("/signup")
        .post(userController.signUpUser)

        app.route("/login")
        .post(userController.loginUser)

        app.route("/logout")
        .post(userController.logoutUser)

        app.route("/user")
        .get(authMiddleware.authenticateTokenForAdmin, userController.getAllUsers)

        app.route("/user/:userid")
        .get(authMiddleware.authenticateTokenForAdmin, userController.getUserByID)
        .put(authMiddleware.authenticateTokenForAdmin, userController.updateUser)
        .delete(authMiddleware.authenticateTokenForAdmin,userController.deleteUser)

        app.route("/warehouse")
        .post(authMiddleware.authenticateToken, warehouseController.addWarehouse)
        .get(authMiddleware.authenticateToken, warehouseController.getAllWarehouses)

        app.route("/warehouse/:wid")
        .get(authMiddleware.authenticateToken, warehouseController.getWarehouseById)
        .delete(authMiddleware.authenticateToken, warehouseController.removeWarehouse)

        app.route("/product")
        .post(authMiddleware.authenticateToken, productController.addProduct)
        .get(authMiddleware.authenticateToken, productController.getAllProducts)

        app.route("/product/:pid")
        .get(authMiddleware.authenticateToken, productController.getProductById)
        .put(authMiddleware.authenticateToken, productController.updateProduct)
        .delete(authMiddleware.authenticateToken, productController.removeProduct)
        
        
    }
}