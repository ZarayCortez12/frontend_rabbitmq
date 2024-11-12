import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BACKEND_USER = "http://127.0.0.1:3000/";
const API_BACKEND_PUNTOS = "http://127.0.0.1:3010/";
const API_BACKEND_ENVIO = "http://127.0.0.1:3020/";

function panelUser() {
  const [puntos, setPuntos] = useState("");
  const [envío, setEnvio] = useState("");
  const [usuario, setUsuario] = useState("");
  const identificacion = localStorage.getItem("identificacion");

  // Funciones para obtener datos desde el backend
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${API_BACKEND_USER}usuario/${identificacion}`
      );
      setUsuario(response.data[0]);
      console.log("Usuario obtenido:", response.data);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
    }
  };

  const fetchPuntos = async () => {
    try {
      const response = await axios.get(
        `${API_BACKEND_PUNTOS}puntos/${identificacion}`
      );
      setPuntos(response.data[0].cantidad);
      console.log("Puntos obtenidos:", response.data);
    } catch (error) {
      console.error("Error al obtener puntos:", error);
    }
  };

  const fetchEnvio = async () => {
    try {
      const response = await axios.get(
        `${API_BACKEND_ENVIO}envios/${identificacion}`
      );
      setEnvio(response.data[0]);
      console.log("Envío obtenido:", response.data);
    } catch (error) {
      console.error("Error al obtener datos del envío:", error);
    }
  };

  useEffect(() => {
    if (identificacion) {
      fetchUserData();
      fetchPuntos();
      fetchEnvio();
    }
  }, [identificacion]);

  console.log(usuario);
  console.log(puntos);
  console.log(envío);
  return (
    <div>
      <div
        style={{
          background: "black",
          width: "1496px",
          marginTop: "-16px",
          marginLeft: "-8px",
          height: "70px",
          color: "white",
          padding: "20px 20px 10px 20px",
        }}
      >
        <p style={{ marginLeft: "1200px", fontWeight: "bold" }}>
          Hola, {usuario.nombres}
        </p>
      </div>
      <div
        style={{
          background: "black",
          width: "150px",
          marginTop: "-8px",
          marginLeft: "-8px",
          height: "611px",
        }}
      >
        hola
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "20px",
          flexGrow: 1,
          width: "1200px",
          marginLeft: "230px",
          marginTop: "-500px",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <div
            style={{
              padding: "30px 10px 30px 35px",
              background: "#f3f3f3",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              flex: "1",
              fontSize: "50px",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <p>
              <strong>Tus Puntos:</strong>
            </p>
            <span
              style={{
                fontSize: "122px",
                color: "#4CAF50",
                marginLeft: "250px",
                fontWeight: "bold",
              }}
            >
              {puntos}
            </span>
          </div>
          <div
            style={{
              padding: "20px",
              background: "#f3f3f3",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              flex: "1",
            }}
          >
            <p style={{ fontSize: "30px" }}>
              <strong>Tu envío pendiente:</strong>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/11614/11614810.png"
                alt="Camión de envío"
                style={{ width: "300px", height: "300px" }}
              />
              <div>
                <p>
                  <strong>Estado:</strong> {envío.estado}
                </p>
                <p>
                  <strong>Descripción:</strong> {envío.descripcion}
                </p>
                <p>
                  <strong>Dirección:</strong> {envío.direccion}, {envío.ciudad}
                </p>
                <p>
                  <strong>Tu pedido va en camino</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default panelUser;
