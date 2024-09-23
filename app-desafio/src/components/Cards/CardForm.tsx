import { Card, CardContent } from "@mui/material";
import { MapPinned } from "lucide-react";
import style from "./CardForm.module.css"
import { UseFormSetValue } from "react-hook-form";

interface CardFormPropos {
    dadosApi: DadosNomatinApi[]
    pontoTipo: "partida" | "destino"
    setValue: UseFormSetValue<FormEntrega>
}


const CardForm = ({ dadosApi, pontoTipo, setValue }: CardFormPropos) => {

    const strokeWidth = 1.4

    const selecionarEndereco = (dados: DadosNomatinApi) => {
        const localizacao = dados.lat + ',' + dados.lon
        if (pontoTipo === "partida") {
            setValue("pontoPartida", localizacao)
            setValue("pontoPartidaDados", dados.display_name)
            return
        }
        setValue("pontoDestino", localizacao)
        setValue("pontoDestinoDados", dados.display_name)

    }
    return (
        <section className={style.container}>
            <ul className={style.listaDados}>
                {dadosApi.map((dados, i) => (
                    <li key={i}>
                        <a onClick={() => selecionarEndereco(dados)}>
                            <Card variant="outlined" className={style.card}>
                                <CardContent className={style.card_content}>
                                    <MapPinned strokeWidth={strokeWidth} width={30} />
                                    <span>Localização:</span>
                                    <span> {dados.display_name}</span>
                                </CardContent>
                            </Card>

                        </a>

                    </li>
                ))}
            </ul>

        </section>
    );
};

export default CardForm