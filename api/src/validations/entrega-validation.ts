import { validate } from "class-validator"
import { Entrega } from "../models/entrega"
import { ResultadoValidacao } from "../models/validation"

export const entregaValidation = async (entrega:Entrega)=>{
        const validacao = await validate(entrega)
        const resultados: ResultadoValidacao[] = []
        if(validacao.length > 0 ){
            validacao.forEach(resultado=>{
                if(resultado.constraints){
                    resultados.push({
                    campo:resultado.property,
                    mensagem:resultado.constraints
                }) 
                }
            })
        }
        return resultados
}

