import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal"
import { MessageCircleWarningIcon } from "lucide-react";
import style from "./Shared.module.css";
const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ModalFormProps {
    open: boolean,
    handleClose: () => void
}



const ModalForm = ({ open, handleClose }: ModalFormProps) => {
    return (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
        <Box sx={styleModal} >
            <div className={style.containerBox}>
                <div className={style.boxTitulo}>
                    <MessageCircleWarningIcon />
                    <h5>Ops, ponto de Partida e destino inválidos</h5>
                </div>
                <div className={style.boxConteudo}>
                    <span>Ponto de partida ou ponto de destino não estão em formato de coordenadas.</span>
                    <span>Preencha um endereço nos campos, clique em pesquisar e selecione um dos endereço</span>
                </div>

            </div>

        </Box>
    </Modal>)
}

export default ModalForm;