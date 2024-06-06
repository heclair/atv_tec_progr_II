import { Router } from "express";
//import category from "./category";
//import product from "./product";
import users from "./";

const router = Router();

//router.use("/categoria", category);
//router.use("/produto", product);
router.use("/usuario", users);

export default router;
