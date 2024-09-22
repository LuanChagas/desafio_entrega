import { AppDataSource } from "../config/data-source";
import { Entrega } from "../models/entrega";



const entregaRepository = AppDataSource.getRepository(Entrega)

export const cadastrarEntregaService = async (entregaBody:Entrega) => {
    const entrega = new Entrega()
    entrega.nomeCliente = entregaBody.nomeCliente
    entrega.dataEntrega = entregaBody.dataEntrega
    entrega.pontoDestino = entregaBody.pontoDestino
    entrega.pontoPartida = entregaBody.pontoPartida
    entrega.pontoPartidaDados = entregaBody.pontoPartidaDados
    entrega.pontoDestinoDados = entregaBody.pontoDestinoDados
    await entregaRepository.save(entrega)
}

export const listarEntregasService = async () => {
     const entregas = await entregaRepository.find();
     return entregas
}
