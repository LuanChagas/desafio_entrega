import { Card, CardContent } from "@mui/material";
import { MapPinned } from "lucide-react";
import style from "./CardForm.module.css"

interface CardFormPropos {
    dadosCep: DadosViaCepSucesso
}


const CardForm = ({ dadosCep }: CardFormPropos) => {

    const strokeWidth = 1.4


    return (
        <section className={style.container}>
            <Card variant="outlined" className={style.card}>
                <CardContent className={style.card_content}>
                    <div>
                        <MapPinned strokeWidth={strokeWidth} />
                        <span>Logradouro: {dadosCep.logradouro}</span>
                    </div>
                    <div>
                        <MapPinned strokeWidth={strokeWidth} />
                        <span>Bairro: {dadosCep.bairro}</span>
                    </div>
                    <div>
                        <MapPinned strokeWidth={strokeWidth} />
                        <span>Cidade: {dadosCep.localidade}</span>
                    </div>
                    <div>
                        <MapPinned strokeWidth={strokeWidth} />
                        <span>Estado: {dadosCep.estado}</span>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default CardForm