import { useQuery } from "@tanstack/react-query";
import { listaEntregas } from "../../services/api";
import style from "./ListaEntrega.module.css";
import Mapa from "../../components/Mapa/Mapa";
import { useState } from "react";
import CardLista from "../../components/Cards/CardLista";


const ListaEntrega = () => {
  const [coordenadas, setCoordenadas] = useState<{ origin: string, destination: string }>()
  const [select, setSelect] = useState<Number>(0)
  const { data, isLoading } = useQuery({
    queryKey: ['todos'], queryFn: async () => {
      const data = await listaEntregas()
      const select = data.data[0]
      setCoordenadas({
        origin: select.pontoPartida,
        destination: select.pontoDestino,
      })
      setSelect(select.id)
      return data.data
    }
  })

  const obterCoordenadas = (entrega: Entrega) => {
    setSelect(entrega.id)
    setCoordenadas({
      origin: entrega.pontoPartida,
      destination: entrega.pontoDestino
    })
  }


  if (isLoading) {
    return <section className={style.listaLayout}>
      <span>Carregando</span>
    </section>
  }

  if (!data || data.length === 0) {
    return <div className={style.secaoNaoHaDados}>
      <span>Não há dados</span>
    </div>
  }

  return <section className={style.listaLayout}>
    <h2 className={style.titulo}>Entregas</h2>
    <div className={style.layoutConteudo}>
      <ul className={style.layoutEntregas}>
        {data?.map(entrega => (
          <li key={entrega.id} className={select === entrega.id ? `${style.select}` : ''}>
            <a onClick={() => obterCoordenadas(entrega)}>
              <CardLista dados={entrega} />
            </a>
          </li>
        ))}
      </ul>
      <div>
        {coordenadas && <Mapa origin={coordenadas?.origin} destination={coordenadas?.destination} />}
      </div>
    </div>
  </section >;
};

export default ListaEntrega;
