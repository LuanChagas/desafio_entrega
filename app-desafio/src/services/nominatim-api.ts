import axios from "axios";

const BASE_URL = "https://nominatim.openstreetmap.org/search?q=";

export const buscarDadosNomatinApi = async (rua: string) => {
    const response = await axios.get<DadosNomatinApi[]>(`${BASE_URL}/${rua}&format=json`)
    return response.data
}