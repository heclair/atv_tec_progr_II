import { Router } from "express";
import controller from "../controllers/EstadoController";

const router = Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.delete("/", controller.delete);
router.put("/updatesigla", controller.updatesigla);
router.put("/updatenome", controller.updatenome);




export default router;
