import { Request, Response } from "express";
import Cidade from "../models/Cidades";

class CidadeController {
    public async create(req: Request, res: Response): Promise<void> {
        const { cid_nome, cid_est_id, cid_ibge } = req.body;
        if ( !cid_nome || !cid_est_id || !cid_ibge ) {
            res.status(401).json({ erro: "Forneça todos os dados requisitados" });
        }else{
        try {
            const response = await Cidade.create({ cid_nome, cid_est_id, cid_ibge });
            res.send(response);
        } catch (e: any) {
                res.send({ message: e });
            }
        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Cidade.find(
            {},
            {},
            {
                sort: { cid_nome: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await Cidade.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Cidade inexistente" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id, cid_nome } = req.body;
        try {
            const response = await Cidade.findByIdAndUpdate(
                id,
                { cid_nome },
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
            if (e.errors?.cid_nome) {
                res.send({ message: e.errors.cid_nome.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }
}

export default new CidadeController();