import { NextFunction, Request, Response } from "express";
import { cadastrarEntregaService, listarEntregasService } from "../services/services";
import { Entrega } from "../models/entrega";


export const cadastrarEntregaController = async (req: Request, res: Response,next:NextFunction) => {
    try {
    const entrega = req.body as Entrega
     await cadastrarEntregaService(entrega)
      res.status(201).json({"mensagem":"entrega criada!"})
    } catch (error) {
        next(error)
    }
    
}

export const listarEntregasController = async (res: Response) => {
    const entregas = await listarEntregasService()
    return res.json(entregas)
}