import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ptBR } from "date-fns/locale";
import style from "./FormEntrega.module.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { format } from "date-fns";
import { cadastrarEntrega } from "../../services/api";
import { ChangeEvent, useState } from "react";
import { buscarDadosCepApi } from "../../services/viaCep-api";
import CardForm from "../../components/Cards/CardForm";
import { maskValidacaoCep } from "../../utils/mask-input.";
import { LoaderCircle, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface schemaDadosCep {
  loading: boolean,
  error: boolean,
  dados: DadosViaCepSucesso | undefined
}

interface DadosCep {
  [key: string]: schemaDadosCep
}
const initDadosCep: schemaDadosCep = {
  loading: false,
  error: false,
  dados: undefined
}
const FormEntrega = () => {

  const navigate = useNavigate()

  const [dadosCep, setDadosCep] = useState<DadosCep>({
    partida: initDadosCep,
    destino: initDadosCep
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormEntrega>();


  const handleOnChangeCep = async (e: ChangeEvent<HTMLInputElement>, tipo: "partida" | "destino") => {
    if (!maskValidacaoCep(e.target)) {
      return
    };
    if (e.target.value === dadosCep[tipo].dados?.cep) {
      return
    }
    setDadosCep({ ...dadosCep, [tipo]: { dados: undefined, error: false, loading: false } })
    const cep = e.target.value
    if (cep.replace('-', "").length === 8) {
      setDadosCep({ ...dadosCep, [tipo]: { dados: undefined, error: false, loading: true } })
      const dados = await buscarDadosCepApi(cep)
      if ('erro' in dados) {
        setDadosCep({ ...dadosCep, [tipo]: { dados: undefined, error: true, loading: false } })
        return
      }
      setDadosCep({ ...dadosCep, [tipo]: { dados: dados, error: false, loading: false } })
    }
  }
  const onSubmit: SubmitHandler<FormEntrega> = async (data) => {
    if (!dadosCep.partida.dados || !dadosCep.destino.dados) return
    data.pontoPartidaDados = dadosCep.partida.dados
    data.pontoDestinoDados = dadosCep.destino.dados
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
          <input
            type="text"
            id="partida"
            {...register("pontoPartida",
              {
                required: true,
                onChange: (e) => {
                  handleOnChangeCep(e, "partida")
                }
              })}
          />
          <div className={style.containerInfoCEP}>
            {dadosCep.partida.loading && (<Loading />)}
            {dadosCep.partida.error && (<CepNaoEncontrado />)}
            {dadosCep.partida.dados && (<CardForm dadosCep={dadosCep.partida.dados} />)}
          </div>
        </div>
        <div className={style.justifyStart}>
          <label htmlFor="destino">Ponto de destino</label>
          {errors.pontoDestino?.type === "required" && <ErrorForm campo={"Ponto de destino"} />}
          <input
            type="text"
            id="destino"
            {...register("pontoDestino",
              {
                required: true,
                onChange: (e) =>
                  handleOnChangeCep(e, "destino")
              })}
          />
          <div className={style.containerInfoCEP}>
            {dadosCep.destino.loading && (<Loading />)}
            {dadosCep.destino.dados && (<CardForm dadosCep={dadosCep.destino.dados} />)}
            {dadosCep.destino.error && (<CepNaoEncontrado />)}
          </div>
        </div>
        <div className={style.secaoButton}>
          <button type="submit" className={style.button + ` ${!isValid || !dadosCep.destino.dados || !dadosCep.partida.dados ? style.disable : ''}`}
            disabled={!isValid || !dadosCep.destino.dados || !dadosCep.partida.dados}
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
