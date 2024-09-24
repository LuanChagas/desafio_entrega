import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import FormEntrega from "./pages/FormEntrega/FormEntrega";
import ListaEntrega from "./pages/ListaEntrega/ListaEntrega";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Define esta rota como a rota padrão
        element: <FormEntrega />,
      },
      {
        path: "cadastrar",
        element: <FormEntrega />,
      },
      {
        path: "listar",
        element: <ListaEntrega />,
      },
    ],
  },
]);

export default router;
