import { NavLink } from "react-router-dom";
import style from "./SideBar.module.css";
const SideBar = () => {
  return (
    <nav className={style.container + " padding-container"}>
      <ul>
        <li>
          <NavLink to={"cadastrar"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? `${style.active}` : ""
            }
          >Cadastrar entrega</NavLink>
        </li>
        <li>
          <NavLink to={"listar"}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? `${style.active}` : ""
            }
          >Lista de entregas</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
