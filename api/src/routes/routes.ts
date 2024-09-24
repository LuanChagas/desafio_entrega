import { Router } from "express"
import { cadastrarEntregaController, listarEntregasController } from "../controllers/controllers"
import { cadastrarEntregaService } from "../services/services"
import { Entrega } from "../models/entrega"
const routes = Router()

routes.post('/api/entrega', async (req, res, next) => cadastrarEntregaController(req,res,next))

  routes.get('/api/entregas',(req,res)=>{listarEntregasController(res)})



export default routes