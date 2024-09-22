
import { useEffect, useState } from "react";
import style from "./Mapa.module.css"
interface MapaProps {
  origin: string
  destination: string
}

const Mapa = ({ origin, destination }: MapaProps) => {
  const [loading, setLoading] = useState(true);
  const src = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyDfPXwzIe11pvS2RJ_w-qfovtN2Bn7t04E&origin=${origin}&destination=${destination}`
  useEffect(() => {
    setLoading(true)
  }, [origin, destination])

  return (
    <section style={{ height: "100%" }}>
      {loading && (
        <div className={style.loadingAviso}>
          <div className="animationSpinner">Carregando...</div>
        </div>
      )}
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        onLoad={() => {
          setLoading(false)
        }}
      >
      </iframe>


    </section>
  );
};

export default Mapa;