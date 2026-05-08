import { Router } from "express";
import usersRoutes from "./users/user.route.js";
import authentication from "./auth/auth.route.js";
import company from "./company/company.route.js";
import categories from "./category/category.route.js";
import jobs from "./jobs/jobs.route.js";
import applications from "./applications/application.route.js";
import bookmarks from "./bookmark/bookmark.route.js";
import profile from "./profile/profile.route.js";
import document from "./document/document.route.js";

const router = Router();

router.use("/users", usersRoutes);
router.use("/authentications", authentication);
router.use("/companies", company);
router.use("/categories", categories);
router.use("/jobs", jobs);
router.use("/applications", applications);
router.use("/", bookmarks);
router.use("/profile", profile);
router.use("/documents", document);

export default router;
