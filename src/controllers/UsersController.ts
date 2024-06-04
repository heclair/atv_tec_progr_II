import { Request, Response } from "express";
import { Users } from "../models";

class UsersController {
    public async create(req: Request, res: Response): Promise<Response> {
        const{user_cpf, user_created_at,user_email,user_fone,user_nome,user_password,user_updated_at,user_usuario,user} = req.body;
        try{
            const response = await Users.create({})
        }
    }
};