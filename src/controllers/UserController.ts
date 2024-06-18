import { Request, Response } from "express";
import User from "../models/Users";

class UserController {
    public async create(req: Request, res: Response): Promise<void> {
        const { user_nome, user_cpf, user_mail, user_fone } = req.body;
        if ( !user_nome || !user_cpf || !user_mail || !user_fone) {
            res.status(401).json({ erro: "Forneça todos os dados requisitados" });
        }else{
        try {
            const response = await User.create({ user_nome, user_cpf, user_mail, user_fone });
            res.send(response);
        } catch (e: any) {
                res.send({ message: e });
            }
        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await User.find(
            {},
            {},
            {
                sort: { user_nome: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await User.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async updatemail(req: Request, res: Response): Promise<void> {
        const { id, user_mail } = req.body;
        try {
            const response = await User.findByIdAndUpdate(
                id,
                { user_mail },
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
                res.send({ message: `O e-mail ${user_mail} já está em uso` });
            }
            else if (e.errors?.user_mail) {
                res.send({ message: e.errors.user_mail.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }

    public async updatenome(req: Request, res: Response): Promise<void> {
        const { id, user_nome } = req.body;
        try {
            const response = await User.findByIdAndUpdate(
                id,
                { user_nome },
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
             if (e.errors?.user_nome) {
                res.send({ message: e.errors.user_mail.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }

    public async updatetelefone(req: Request, res: Response): Promise<void> {
        const { id, user_fone } = req.body;
        try {
            const response = await User.findByIdAndUpdate(
                id,
                { user_fone },
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
                res.send({ message: `O telefone ${user_fone} já está em uso` });
            }
            else if (e.errors?.user_fone) {
                res.send({ message: e.errors.user_fone.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }
}

export default new UserController();