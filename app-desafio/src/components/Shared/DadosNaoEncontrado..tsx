import { SearchX } from "lucide-react";
import style from "./Shared.module.css";

const DadosNaoEncontrado = () => {
    return (
        <div className={style.layoutInfo}>
            <SearchX />
            <span>Endereço não encontrado</span>
        </div>
    )
}

export default DadosNaoEncontrado