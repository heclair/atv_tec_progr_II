import { Request, Response } from "express";
import Aoi from "../models/Aoi";

class AoiController {
    public async create(req: Request, res: Response): Promise<void> {
        const { aoi_cid_id, aoi_user_id, aoi_area_km2, aoi_geom } = req.body;
        if ( !aoi_cid_id || !aoi_user_id || !aoi_area_km2 || !aoi_geom) {
            res.status(401).json({ erro: "Forneça todos os dados requisitados" });
        }else{
        try {
            const response = await Aoi.create({ aoi_cid_id, aoi_user_id, aoi_area_km2, aoi_geom });
            res.send(response);
        } catch (e: any) {
                res.send({ message: e });
            }
        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Aoi.find(
            {},
            {},
            {
                sort: { aoi_cid_id: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await Aoi.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async updatearea(req: Request, res: Response): Promise<void> {
        const { id, aoi_area_km2 } = req.body;
        try {
            const response = await Aoi.findByIdAndUpdate(
                id,
                { aoi_area_km2 },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.json(response);
            }
            else {
                res.json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
           if (e.errors?.aoi_area_km2) {
                res.send({ message: e.errors.aoi_area_km2.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }

    public async updategeom(req: Request, res: Response): Promise<void> {
        const { id, aoi_geom } = req.body;
        try {
            const response = await Aoi.findByIdAndUpdate(
                id,
                { aoi_geom },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.json(response);
            }
            else {
                res.json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
             if (e.errors?.aoi_geom) {
                res.send({ message: e.errors.aoi_geom.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }
}

export default new AoiController();