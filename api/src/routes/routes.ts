import { Router } from "express"
import { cadastrarEntregaController, listarEntregasController } from "../controllers/controllers"

const routes = Router()

routes.post('/api/entrega', async (req, res, next) => cadastrarEntregaController(req,res,next))
routes.get('/api/entregas',(_,res)=>{listarEntregasController(res)})


export default routes