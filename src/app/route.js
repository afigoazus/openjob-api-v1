import { Router } from "express";
import usersRoutes from "./users/user.route.js";
import authentication from "./auth/auth.route.js";
import company from "./company/company.route.js";
import categories from "./category/category.route.js";
import jobs from "./jobs/jobs.route.js";

const router = Router();

router.use("/users", usersRoutes);
router.use("/authentications", authentication);
router.use("/companies", company);
router.use("/categories", categories);
router.use("/jobs", jobs);

export default router;
