import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SideBar from "./components/Sidebar/SideBar";

function App() {
  return (
    <>
      <section className="h-100">
        <Header />
        <section className="layoutSideMain">
          <SideBar />
          <main className="containerMain">
            <Outlet />
          </main>
        </section>
      </section>
    </>
  );
}

export default App;
