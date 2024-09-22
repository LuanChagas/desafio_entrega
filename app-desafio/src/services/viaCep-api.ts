import axios from "axios";

const BASE_URL = "https://viacep.com.br/ws";

export const buscarDadosCepApi = async (cep: string) => {
    const response = await axios.get<DadosViaCep>(`${BASE_URL}/${cep}/json`)
    return response.data
}