import { Request, Response } from "express";
import Estado from "../models/Estados";

class EstadoController {
    public async create(req: Request, res: Response): Promise<void> {
        const { est_nome, est_sigla, est_ibge } = req.body;
        if ( !est_nome || !est_sigla || !est_ibge) {
            res.status(401).json({ erro: "Forneça todos os dados requisitados" });
        }else{
        try {
            const response = await Estado.create({ est_nome, est_sigla, est_ibge });
            res.send(response);
        } catch (e: any) {
                res.send({ message: e });
            }
        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Estado.find(
            {},
            {},
            {
                sort: { est_sigla: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await Estado.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Estado inexistente" });
        }
    }

    public async updatenome(req: Request, res: Response): Promise<void> {
        const { id, est_nome } = req.body;
        try {
            const response = await Estado.findByIdAndUpdate(
                id,
                { est_nome },
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
            if (e.code === 11000) {
                res.send({ message: `O nome ${est_nome} já está em uso` });
            }
            else if (e.errors?.est_nome) {
                res.send({ message: e.errors.est_nome.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }

    public async updatesigla(req: Request, res: Response): Promise<void> {
        const { id, est_sigla } = req.body;
        try {
            const response = await Estado.findByIdAndUpdate(
                id,
                { est_sigla },
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
            if (e.code === 11000) {
                res.send({ message: `A sigla ${est_sigla} já está em uso` });
            }
            else if (e.errors?.est_sigla) {
                res.send({ message: e.errors.est_sigla.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }
}

export default new EstadoController();