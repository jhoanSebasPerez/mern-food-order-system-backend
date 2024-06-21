import { Router } from "express";
import UserController from "../controllers/user-controller";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateUserRequest } from "../middlewares/validation";
const router = Router();

router.post("/", jwtCheck, UserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateUserRequest, UserController.updateCurrentUser);
router.get("/", jwtCheck, jwtParse, UserController.getCurrentUser);

export default router;
