import { NextFunction, Request, Response } from "express";
import { cadastrarEntregaService, listarEntregasService } from "../services/services";
import { Entrega } from "../models/entrega";
import { validate } from "class-validator";
import { error } from "console";
import { entregaValidation } from "../validations/entrega-validation";


export const cadastrarEntregaController = async (req: Request, res: Response,next:NextFunction) => {
    try {
    const entregaBody = req.body as Entrega
    const entrega = new Entrega()
    Object.assign(entrega,entregaBody)
    const validationError = await entregaValidation(entrega)
    if( validationError.length > 0){
      return res.status(400).json(validationError)
     }
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