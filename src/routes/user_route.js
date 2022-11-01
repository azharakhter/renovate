import express from 'express';
import { UserController } from  "../controllers";

const userRouter = express.Router();


userRouter.post("/register", (...args) => UserController.userRegister(...args));
userRouter.post("/create-checkout-session", (...args) => UserController.userRegisterPlan(...args));
userRouter.get("/checkout-session", (...args) => UserController.userCheckoutSession(...args));

userRouter.post("/login", (...args) => UserController.userLogin(...args));
userRouter.post("/send-mail", (...args) => UserController.sendMail(...args));
userRouter.post("/payments", (...args) => UserController.payments(...args));


module.exports =userRouter;