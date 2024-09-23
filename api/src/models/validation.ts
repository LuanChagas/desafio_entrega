export interface ResultadoValidacao {
    campo:string,
    mensagem: {[type: string]: any | undefined} | undefined
}