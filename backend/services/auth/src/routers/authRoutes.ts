import {Router} from "express"

import {verifyLogin} from "../controllers/authLoginController"
import {createUser} from "../controllers/createUserController"

const router = Router()

router.post("/login" ,verifyLogin);

router.post("/signup", createUser);

export default router