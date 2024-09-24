import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ptBR } from "date-fns/locale";
import style from "./FormEntrega.module.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { format } from "date-fns";
import { cadastrarEntrega } from "../../services/api";
import CardForm from "../../components/Cards/CardForm";
import { useNavigate } from "react-router-dom";
import { buscarDadosNomatinApi } from "../../services/nominatim-api";
import { useState } from "react";
import { isValidLocation, tratarStringRua } from "../../utils/utilitarios.";
import Loading from "../../components/Shared/Loading";
import ModalForm from "../../components/Shared/ModalForm";
import DadosNaoEncontrado from "../../components/Shared/DadosNaoEncontrado.";

interface schemaDadosApi {
  loading: boolean,
  dados: DadosNomatinApi[] | undefined
}

interface DadosApi {
  [key: string]: schemaDadosApi
}

const initDadosApi: schemaDadosApi = {
  loading: false,
  dados: undefined
}

const FormEntrega = () => {
  const navigate = useNavigate()

  const [dadosApi, setDadosApi] = useState<DadosApi>({ partida: initDadosApi, destino: initDadosApi })
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid, },
  } = useForm<FormEntrega>();

  const pesquisarDados = async (value: string, tipo: "partida" | "destino") => {
    if (!value) return
    const endereco = tratarStringRua(value)
    setDadosApi({ ...dadosApi, [tipo]: { dados: undefined, loading: true } })
    const dados = await buscarDadosNomatinApi(endereco);
    setDadosApi({ ...dadosApi, [tipo]: { dados: dados, loading: false } })
  }

  const onSubmit: SubmitHandler<FormEntrega> = async (data) => {
    if (!isValidLocation(data.pontoPartida) || !isValidLocation(data.pontoDestino)) {
      handleOpen()
      return
    }
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
              onClick={() => pesquisarDados(getValues().pontoPartida, "partida")}
            >Pesquisar</button>
          </div>

          <div className={style.containerInfoDados}>
            {dadosApi.partida.loading && (<Loading />)}
            {dadosApi.partida.dados?.length === 0 && (<DadosNaoEncontrado />)}
            {dadosApi.partida.dados && dadosApi.partida.dados?.length > 0
              && (<CardForm dadosApi={dadosApi.partida.dados} pontoTipo="partida" setValue={setValue} />)}
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
              onClick={() => pesquisarDados(getValues().pontoDestino, "destino")}
            >Pesquisar</button>
          </div>

          <div className={style.containerInfoDados}>
            {dadosApi.destino.loading && (<Loading />)}
            {dadosApi.destino.dados?.length === 0 && (<DadosNaoEncontrado />)}
            {dadosApi.destino.dados && dadosApi.destino.dados?.length > 0
              && (<CardForm dadosApi={dadosApi.destino.dados} pontoTipo="destino" setValue={setValue} />)}
          </div>
        </div>
        <div className={style.secaoButton}>
          <button type="submit"
            className={style.button + ` ${!isValid ? style.disable : ''}`}
            disabled={!isValid}
          >Cadastrar</button>
        </div>
      </form>
      <ModalForm open={open} handleClose={handleClose} />
    </section>
  );
};

interface ErrorFormProps {
  campo: string;
}

const ErrorForm = ({ campo }: ErrorFormProps) => {
  return <span className={style.error}>{campo} é obrigátorio</span>
}


export default FormEntrega;
