import { NextFunction } from "express";
import { Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ mensagem: "Erro interno do servidor", error: err.message });
};