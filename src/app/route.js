import { Router } from "express";
import usersRoutes from "./users/user.route.js";
import authentication from "./auth/auth.route.js";
import company from "./company/company.route.js";

const router = Router();

router.use("/users", usersRoutes);
router.use("/authentications", authentication);
router.use("/companies", company);

export default router;
