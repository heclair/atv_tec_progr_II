import { Router } from "express";
import controller from "../controllers/AoiController";

const router = Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.delete("/", controller.delete);
router.put("/updatearea", controller.updatearea);
router.put("/updategeom", controller.updategeom);

export default router;
