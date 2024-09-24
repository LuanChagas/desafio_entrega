import { LoaderCircle } from "lucide-react"
import style from "./Shared.module.css";
const Loading = () => {
    return (
        <div className={style.layout}>
            <LoaderCircle className={style.animationSpinner} />
            <span>Carregando...</span>
        </div>
    )

}

export default Loading