import { Router } from "express";
import controller from "../controllers/CidadeController";

const router = Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.delete("/", controller.delete);
router.post("/", controller.update);




export default router;
