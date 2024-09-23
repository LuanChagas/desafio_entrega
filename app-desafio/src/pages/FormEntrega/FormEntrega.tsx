import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ptBR } from "date-fns/locale";
import style from "./FormEntrega.module.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { format } from "date-fns";
import { cadastrarEntrega } from "../../services/api";
import CardForm from "../../components/Cards/CardForm";
import { LoaderCircle, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { buscarDadosNomatinApi } from "../../services/nominatim-api";
import { useState } from "react";
import { tratarStringRua } from "../../utils/mask-input.";

interface schemaDadosApi {
  loading: boolean,
  error: boolean,
  dados: DadosNomatinApi[] | undefined
}

interface DadosApi {
  [key: string]: schemaDadosApi
}
const initDadosApi: schemaDadosApi = {
  loading: false,
  error: false,
  dados: undefined
}
const FormEntrega = () => {

  const navigate = useNavigate()

  const [dadosApi, setDadosCep] = useState<DadosApi>({
    partida: initDadosApi,
    destino: initDadosApi
  })

  const [idTimout, setIdTimout] = useState(0)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid, },
  } = useForm<FormEntrega>();



  const pesquisarDados = async (tipo: "partida" | "destino") => {
    let rua = ''
    if (tipo === "partida") {
      rua = getValues().pontoPartida
    } else {
      rua = getValues().pontoDestino
    }
    tratarStringRua(rua)
    buscarDadosNomatinApiDebounce(rua, tipo)
  }


  const buscarDadosNomatinApiDebounce = (rua: string, tipo: "partida" | "destino") => {
    if (!rua) return
    setDadosCep({ ...dadosApi, [tipo]: { dados: undefined, error: false, loading: true } })
    clearTimeout(idTimout)
    const id = setTimeout(async () => {
      const dados = await buscarDadosNomatinApi(rua);
      setDadosCep({ ...dadosApi, [tipo]: { dados: dados, error: false, loading: false } })
    }, 1000)
    setIdTimout(id)
  }

  const onSubmit: SubmitHandler<FormEntrega> = async (data) => {
    if (!dadosApi.partida.dados || !dadosApi.destino.dados) return
    const response = await cadastrarEntrega(data)
    if (response.status === 201) {
      navigate("/listar")
    }
  };



  return (
    <section>
      <h2 className={style.titulo}>Cadastrar Entrega</h2>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.justifyEnd}>
          <label htmlFor="nomeCliente">Nome do cliente</label>
          {errors.nomeCliente?.type === "required" && <ErrorForm campo={"Nome do Cliente"} />}
          <input
            type="text"
            id="nomeCliente"
            {...register("nomeCliente", { required: true })}
          />
        </div>
        <div className={style.justifyEnd}>
          {errors.dataEntrega?.type === "required" && <ErrorForm campo={"Data da entrega"} />}
          <Controller
            name="dataEntrega"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ptBR}
              >
                <DatePicker
                  label="Data da entrega"
                  views={["day", "month", "year"]}
                  onChange={(e) => {
                    if (e)
                      field.onChange(
                        format(new Date(e.toDateString()), "yyyy-MM-dd", {
                          locale: ptBR,
                        })
                      );
                  }}
                />
              </LocalizationProvider>
            )}
          />
        </div>
        <div className={style.justifyStart}>
          <label htmlFor="partida">Ponto de partida</label>
          {errors.pontoPartida?.type === "required" && <ErrorForm campo={"Ponto de partida"} />}
          <div className={style.secaoPonto}>
            <input
              type="text"
              id="partida"
              placeholder="Avenida lorem ipsum"
              {...register("pontoPartida",
                {
                  required: true,
                })}
            />
            <button
              type="button"
              onClick={() => pesquisarDados("partida")}
            >Pesquisar</button>
          </div>

          <div className={style.containerInfoDados}>
            {dadosApi.partida.loading && (<Loading />)}
            {dadosApi.partida.error && (<CepNaoEncontrado />)}
            {dadosApi.partida.dados && (<CardForm dadosApi={dadosApi.partida.dados} pontoTipo="partida" setValue={setValue} />)}
          </div>
        </div>
        <div className={style.justifyStart}>
          <label htmlFor="destino">Ponto de destino</label>
          {errors.pontoDestino?.type === "required" && <ErrorForm campo={"Ponto de destino"} />}
          <div className={style.secaoPonto}>
            <input
              type="text"
              id="destino"
              placeholder="Avenida lorem ipsum"
              {...register("pontoDestino",
                {
                  required: true,
                })}
            />
            <button
              type="button"
              onClick={() => pesquisarDados("destino")}
            >Pesquisar</button>
          </div>

          <div className={style.containerInfoDados}>
            {dadosApi.destino.loading && (<Loading />)}
            {dadosApi.destino.dados && (<CardForm dadosApi={dadosApi.destino.dados} pontoTipo="destino" setValue={setValue} />)}
            {dadosApi.destino.error && (<CepNaoEncontrado />)}
          </div>
        </div>
        <div className={style.secaoButton}>
          <button type="submit" className={style.button + ` ${!isValid || !dadosApi.destino.dados || !dadosApi.partida.dados ? style.disable : ''}`}
            disabled={!isValid || !dadosApi.destino.dados || !dadosApi.partida.dados}
          >Cadastrar</button>
        </div>
      </form>
    </section>
  );
};


interface ErrorFormProps {
  campo: string;
}

const ErrorForm = ({ campo }: ErrorFormProps) => {
  return <span className={style.error}>{campo} é obrigátorio</span>
}

const CepNaoEncontrado = () => {
  return (
    <div className={style.layoutInfo}>
      <SearchX />
      <span>CEP não encontrado</span>
    </div>
  )
}

const Loading = () => {
  return (
    <div className={style.layoutInfo}>
      <LoaderCircle className={style.animationSpinner} />
      <span>Carregando</span>
    </div>
  )

}

export default FormEntrega;
