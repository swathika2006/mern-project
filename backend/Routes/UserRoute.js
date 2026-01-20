import express from "express";
import { loginUser, RegisterUser, adminlogin } from "../Controllers/UserController.js";

const userRouter = express.Router();

// FIX: remove dot (.)
userRouter.post('/register', RegisterUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminlogin)

export default userRouter
