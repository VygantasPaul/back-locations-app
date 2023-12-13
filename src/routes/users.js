import express from "express";
import { ALL_USERS, ADD_USER, LOGIN_USER, USER_ID } from "../controllers/users.js";
import auth from "../middlewares/auth.js";
const router = express.Router()

router.get("/users/", auth, ALL_USERS)
router.get("/users/:id", auth, USER_ID)
router.post("/users/register", ADD_USER)
router.post("/users/login", LOGIN_USER)
export { ALL_USERS, ADD_USER, LOGIN_USER, USER_ID }


export default router;