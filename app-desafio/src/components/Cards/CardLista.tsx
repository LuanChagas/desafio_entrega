import { Card, CardContent } from "@mui/material";
import { Calendar, MapPin, MapPinCheck, MapPinned, UserRound } from "lucide-react";

import style from "./CardLista.module.css"
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CardFormPropos {
    dados: Entrega
}


const CardLista = ({ dados }: CardFormPropos) => {

    const strokeWidth = 1.4
    const width = 20
    const dataBR = format(new Date(dados.dataEntrega), "dd/MM/yyyy", { locale: ptBR })
    return (
        <section className={style.container}>
            <Card variant="outlined" className={style.card}>
                <CardContent className={style.cardContent}>
                    <div className={style.layoutSuperior}>
                        <div>
                            <div className={style.layoutSuperiorTitulo}>
                                <UserRound strokeWidth={strokeWidth} width={width} />
                                <span>Cliente:</span>
                                <span>{dados.nomeCliente}</span>
                            </div>
                        </div>
                        <div >
                            <div className={style.layoutSuperiorTitulo}>
                                <Calendar strokeWidth={strokeWidth} width={width} />
                                <span>Data:</span>
                                <span> {dataBR}</span>
                            </div>

                        </div>
                    </div>

                    <div className={style.layoutDados}>
                        <div>
                            <div className={style.layoutInferiorTitulo}>
                                <MapPin strokeWidth={strokeWidth} width={width} />
                                <span>Partida</span>
                            </div>

                            <div className={style.layoutDadosItens}>
                                <div>
                                    <span className={style.titulo}>Localização:</span>
                                    <span>{dados.pontoPartidaDados}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={style.layoutInferiorTitulo}>
                                <MapPinCheck strokeWidth={strokeWidth} width={width} />
                                <span>Destino</span>
                            </div>

                            <div className={style.layoutDadosItens}>
                                <div>
                                    <span className={style.titulo}>Localização:</span>
                                    <span>{dados.pontoDestinoDados}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </section >
    );
};

export default CardLista