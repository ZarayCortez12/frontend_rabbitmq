import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { FaRegIdCard } from "react-icons/fa";
import { alert_error, alert_success } from "../utils/functions.js";
import { IoIosMail } from "react-icons/io";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const API_BACKEND_REGISTER = "http://127.0.0.1:3000/";

const showLoadingToast = () => {
  return toast.loading("Ingresando...", {
    position: "bottom-center",
    style: {
      padding: "10px 20px",
      background: "#f1f1f1",
      borderRadius: "8px",
      fontWeight: "bold",
    },
  });
};

function loginUser() {
  const [messageVisible, setMessageVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const hideMessage = () => {
    setMessageVisible(false);
  };

  const showMessage = () => {
    setMessageVisible(true);
    setTimeout(hideMessage, 5000);
  };

  const handleClick = () => {
    navigate("/administrador/docentes");
  };

  const validationSchema = Yup.object().shape({
    identificacion: Yup.string()
      .matches(
        /^\+?[0-9]{8,10}$/,
        "La cédula debe tener entre 8 y 10 dígitos numéricos"
      )
      .required("El documento es requerido"),
    correo: Yup.string()
      .max(125, "El correo no puede tener más de 125 caracteres")
      .email("Formato de correo electrónico inválido")
      .required("El Correo es requerido"),
  });

  return (
    <>
      <div>
        <Toaster />
        <br />
        <h1
          style={{
            fontSize: "38px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Inicia Sesión
        </h1>
        <br />
        <br />
        <br />
        <Formik
          initialValues={{
            identificacion: "",
            correo: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setIsLoading(true);
            const loadingToastId = showLoadingToast();
            console.log(values);
            try {
              const response = await axios.post(
                `${API_BACKEND_REGISTER}login`,
                values
              );

              setTimeout(() => {
                toast.remove(loadingToastId);

                if (
                  response.data.message &&
                  Array.isArray(response.data.message)
                ) {
                  alert_error(
                    "Error al Iniciar Sesión",
                    response.data.message.join(", ")
                  );
                } else {
                  alert_success("Inicio de Sesión Exitoso", "Bienvenido!");
                  localStorage.setItem("identificacion", values.identificacion);

                  // Usamos setTimeout para darle un breve tiempo al mensaje antes de navegar
                  setTimeout(() => {
                    navigate("/panel");
                  }, 1500); // Redirige después de 1.5 segundos
                }

                console.log("Usuario registrado:", response.data);
              }, 5000);
            } catch (error) {
              setTimeout(() => {
                toast.remove(loadingToastId);

                if (error.response && error.response.status === 400) {
                  alert_error(
                    "Error en el registro",
                    error.response.data.message.join(", ")
                  );
                } else {
                  alert_error(
                    "Error",
                    "Ha ocurrido un error inesperado. Intenta nuevamente."
                  );
                }
                console.error("Error al registrar el usuario:", error.message);
              }, 5000);
            } finally {
              setIsLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            touched,
            isSubmitting,
            values,
          }) => (
            <Form
              onSubmit={handleSubmit}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <div
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column", // Cambiar dirección a columna
                  alignItems: "center",
                  backgroundColor: "white",
                  width: "400px",
                  margin: "0 auto",
                  boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Identificación */}
                <br />
                <div style={{ width: "100%", marginBottom: "16px" }}>
                  <label style={{ fontSize: "1rem", fontWeight: "bold" }}>
                    Identificación
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "8px",
                    }}
                  >
                    <FaRegIdCard
                      style={{
                        color: "black",
                        fontSize: "1.3rem",
                        marginRight: "8px",
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Identificación"
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "none",
                        borderBottom: "2px solid black",
                        backgroundColor: "#F5F5F5",
                        color: "black",
                        paddingLeft: "8px",
                        outline: "none",
                        borderRadius: "3px",
                        fontSize: "0.9rem",
                      }}
                      name="identificacion"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.identificacion && touched.identificacion && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "0.85rem",
                        marginTop: "4px",
                      }}
                    >
                      {errors.identificacion}
                    </div>
                  )}
                </div>
                <br />
                {/* Correo Electrónico */}
                <div style={{ width: "100%", marginBottom: "16px" }}>
                  <label style={{ fontSize: "1rem", fontWeight: "bold" }}>
                    Correo Electrónico
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "8px",
                    }}
                  >
                    <IoIosMail
                      style={{
                        color: "black",
                        fontSize: "1.6rem",
                        marginRight: "8px",
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Correo Electrónico"
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "none",
                        borderBottom: "2px solid black",
                        backgroundColor: "#F5F5F5",
                        color: "black",
                        paddingLeft: "8px",
                        outline: "none",
                        borderRadius: "3px",
                        fontSize: "0.9rem",
                      }}
                      name="correo"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.correo && touched.correo && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "0.85rem",
                        marginTop: "4px",
                      }}
                    >
                      {errors.correo}
                    </div>
                  )}
                </div>

                {/* Botón de Guardar */}
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#2D3748",
                    color: "white",
                    width: "100%",
                    height: "40px",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    marginTop: "16px",
                    fontWeight: "bold",
                  }}
                  disabled={isSubmitting}
                  onClick={showMessage}
                >
                  Ingresar
                </button>
                <br />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default loginUser;
