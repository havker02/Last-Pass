import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createSecret,
        deleteSecret
       } from "../controllers/vault.controller.js"

const router = Router()

router.route("/create").post(verifyJWT, createSecret)

router.route("/:id").delete(verifyJWT, deleteSecret)

export default router