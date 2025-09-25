import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/upload.js";
import { getCurrentUser, updateAssistant } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.post("/update", isAuth, upload.single("assistantImage"), updateAssistant);

export default userRouter;
