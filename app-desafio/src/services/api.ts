import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const cadastrarEntrega = async (entrega: FormEntrega) => {
  const response = await axios.post(`${BASE_URL}/entrega`, {
    ...entrega
  })
  return response
}

export const listaEntregas = async () => {
  const response = await axios.get<Entrega[]>(`${BASE_URL}/entregas`)
  return response
}