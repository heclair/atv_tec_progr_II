import { Request, Response } from "express";
import { Users } from "../models";

class UserController {
    public async create(req: Request, res: Response): Promise<void> {
        const { user_cpf, user_created_at, user_email, user_fone, user_nome, user_password, user_updated_at, user_usuario, user } = req.body;
        try {
            const document = await new Users({ user_cpf, user_created_at, user_email, user_fone, user_nome, user_password, user_updated_at, user_usuario, user });

            const resp = await document.save();
        } catch (error: any) {

        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Users.find());
    }

};

export default new UserController();