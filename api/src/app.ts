import express from "express"
import routes from "./routes/routes"
import { AppDataSource } from "./config/data-source"
import cors from "cors"
import { ppid } from "process"
import { errorHandler } from "./config/handler"

const app = express()
const port = 3000
app.use(express.json());
app.use(cors())
app.use(routes)
app.use(errorHandler)


AppDataSource.initialize().then(()=>{
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
})

