import { Router } from "express";
//import category from "./category";
//import product from "./product";
import estado from "./estado";
import user from "./user";
import cidade from "./cidade";

const router = Router();

router.use("/cidade", cidade);
router.use("/estado", estado);
router.use("/usuario", user);


export default router;
