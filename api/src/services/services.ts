import { AppDataSource } from "../config/data-source";
import { Entrega } from "../models/entrega";



const entregaRepository = AppDataSource.getRepository(Entrega)

export const cadastrarEntregaService = async (entrega:Entrega) => {
    return await entregaRepository.save(entrega)
}

export const listarEntregasService = async () => {
     const entregas = await entregaRepository.find();
     return entregas
}
