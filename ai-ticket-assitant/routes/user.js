import express from 'express';
import { signup,login,logout,updateUser, getUser } from '../controllers/user.js';
import { authenticate } from '../middlewares/auth.js'; // Assuming you have an authentication middleware

const router = express.Router();

router.post("/update-user",authenticate,updateUser);
router.get("/users",authenticate,getUser);

router.post("/signup",signup);
router.post("/login",login); // Assuming you want to use the same controller for login, otherwise create a separate controller for login
router.post("/logout",logout); // Assuming you want to use the same controller for logout, otherwise create a separate controller for logout


export default router;