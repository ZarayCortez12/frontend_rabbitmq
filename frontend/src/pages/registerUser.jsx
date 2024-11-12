import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import {
  FaUser,
  FaRegIdCard,
  FaPhoneAlt,
  FaFileImage,
  FaCheck,
} from "react-icons/fa";
import { alert_error, alert_success } from "../utils/functions.js";
import { IoIosMail } from "react-icons/io";
import { MdSaveAlt, MdOutlineGroups2 } from "react-icons/md";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { BiSolidCity } from "react-icons/bi";
import { MdMapsHomeWork } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { Toaster, toast } from "react-hot-toast";

const API_BACKEND_REGISTER = "http://127.0.0.1:3000/";

const showLoadingToast = () => {
  return toast.loading("Registrando...", {
    position: "top-center",
    // Personaliza el estilo del toast, aquí agregamos un spinner
    style: {
      padding: "10px 20px",
      background: "#f1f1f1",
      borderRadius: "8px",
      fontWeight: "bold",
    },
  });
};

function RegisterUser() {
  const [messageVisible, setMessageVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const hideMessage = () => {
    setMessageVisible(false);
  };

  const showMessage = () => {
    setMessageVisible(true);
    setTimeout(hideMessage, 5000); // Ocultar mensaje después de 5 segundos
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
    nombres: Yup.string()
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .matches(/^[A-Za-z ]+$/, "Solo letras permitidas")
      .required("El nombre es requerido"),
    apellidos: Yup.string()
      .max(50, "El apellido no puede tener más de 50 caracteres")
      .matches(/^[A-Za-z ]+$/, "Solo letras permitidas")
      .required("El apellido es requerido"),
    telefono: Yup.string()
      .matches(/^\+?[0-9]{10}$/, "El teléfono debe tener 10 dígitos numéricos")
      .required("El teléfono es requerido"),
    correo: Yup.string()
      .max(125, "El correo no puede tener más de 125 caracteres")
      .email("Formato de correo electrónico inválido")
      .required("El Correo es requerido"),
    direccion: Yup.string()
      .max(200, "La dirección no puede tener más de 200 caracteres")
      .required("La dirección es requerida"),
    ciudad: Yup.string()
      .max(100, "La ciudad no puede tener más de 100 caracteres")
      .required("La ciudad es requerida"),
    genero: Yup.string()
      .required("El género es requerido")
      .oneOf(
        ["Femenino", "Masculino", "Otro"],
        "Debe seleccionar un género válido"
      ),
    fechaNacimiento: Yup.date()
      .required("La fecha de nacimiento es requerida")
      .max(new Date(), "La fecha de nacimiento no puede ser futura"),
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
            marginTop: "-10px",
          }}
        >
          ¡Bienvenido@!
        </h1>
        <h2
          style={{ fontSize: "24px", textAlign: "center", marginTop: "-20px" }}
        >
          Te invitamos a registrarte
        </h2>
        <br />
        <Formik
          initialValues={{
            tipoIdentificacion: "CC",
            identificacion: "",
            nombres: "",
            apellidos: "",
            telefono: "",
            correo: "",
            direccion: "",
            ciudad: "",
            genero: "",
            fechaNacimiento: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setIsLoading(true); // Activa el mensaje "Registrando..."
            const loadingToastId = showLoadingToast(); // Muestra el toast con el spinner

            try {
              const response = await axios.post(
                `${API_BACKEND_REGISTER}register`,
                values
              );

              // Usamos setTimeout para simular los 5 segundos antes de mostrar el mensaje de éxito/error
              setTimeout(() => {
                // Cierra el toast de carga
                toast.remove(loadingToastId);

                if (
                  response.data.message &&
                  Array.isArray(response.data.message)
                ) {
                  alert_error(
                    "Error en el registro",
                    response.data.message.join(", ")
                  );
                } else {
                  alert_success(
                    "Usuario Creado con éxito.",
                    `Revisa tu correo para confirmar tu registro.`
                  );

                  // Espera 5 segundos antes de recargar la página
                  setTimeout(() => {
                    window.location.reload();
                  }, 5000);
                }

                console.log("Usuario registrado:", response.data);
              }, 5000); // Simula los 5 segundos de espera
            } catch (error) {
              setTimeout(() => {
                // Cierra el toast de carga
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
              }, 5000); // Simula 5 segundos de espera antes de mostrar el error
            } finally {
              setIsLoading(false); // Desactiva el estado de "Registrando..."
              setSubmitting(false); // Finaliza el estado de envío
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
                  borderRadius: "16px", // Mayor redondeo de esquinas
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "white",
                  width: "1000px",
                  marginLeft: "200px",
                  boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)", // Sombra más notoria
                }}
              >
                <div style={{ flex: "1", marginRight: "16px" }}>
                  {/* Nombres */}
                  <div
                    style={{
                      display: "flex",
                      margin: "16px",
                      alignItems: "center",
                      marginBottom: errors.nombres ? "0" : "16px",
                    }}
                  >
                    <FaUser style={{ color: "black", fontSize: "1.2rem" }} />
                    <input
                      type="text"
                      placeholder="Nombres"
                      style={{
                        margin: "12px",
                        height: "48px",
                        border: "none", // Elimina el contorno
                        borderBottom: "2px solid black", // Agrega una línea en la parte inferior
                        backgroundColor: "#F5F5F5", // Fondo gris claro
                        color: "black", // Texto negro
                        width: "100%",
                        paddingLeft: "16px",
                        outline: "none", // Elimina el contorno cuando se selecciona
                        borderRadius: "3px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                      }}
                      name="nombres"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.nombres && touched.nombres && messageVisible && (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        opacity: messageVisible ? 1 : 0,
                        visibility: messageVisible ? "visible" : "hidden",
                        transition: "opacity 0.5s ease, visibility 0s 0.5s", // Transición suave
                      }}
                    >
                      {errors.nombres}
                    </div>
                  )}
                  {/* Apellidos */}
                  <div
                    style={{
                      display: "flex",
                      margin: "16px",
                      alignItems: "center",
                      marginBottom: errors.apellidos ? "0" : "16px",
                    }}
                  >
                    <FaUser style={{ color: "black", fontSize: "1.2rem" }} />
                    <input
                      type="text"
                      placeholder="Apellidos"
                      style={{
                        margin: "12px",
                        height: "48px",
                        border: "none",
                        borderBottom: "2px solid black",
                        backgroundColor: "#F5F5F5",
                        color: "black",
                        width: "100%",
                        paddingLeft: "16px",
                        outline: "none",
                        borderRadius: "3px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                      }}
                      name="apellidos"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.apellidos && touched.apellidos && messageVisible && (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        opacity: messageVisible ? 1 : 0,
                        visibility: messageVisible ? "visible" : "hidden",
                        transition: "opacity 0.5s ease, visibility 0s 0.5s", // Transición suave
                      }}
                    >
                      {errors.apellidos}
                    </div>
                  )}

                  {/* Tipo de Documento */}
                  <div
                    style={{
                      display: "flex",
                      margin: "16px",
                      alignItems: "center",
                      marginBottom: errors.tipoIdentificacion ? "0" : "16px",
                    }}
                  >
                    <FaRegIdCard
                      style={{ color: "black", fontSize: "1.3rem" }}
                    />
                    <div style={{ display: "flex" }}>
                      <select
                        name="tipoIdentificacion"
                        style={{
                          margin: "12px",
                          backgroundColor: "#F5F5F5",
                          color: "black",
                          height: "48px",
                          border: "none",
                          borderBottom: "2px solid black",
                          width: "128px",
                          paddingLeft: "16px",
                          paddingRight: "8px",
                          outline: "none",
                          borderRadius: "3px",
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.9rem",
                        }}
                        onChange={handleChange}
                        value={values.tipoIdentificacion}
                      >
                        <option value="CC">CC</option>
                        <option value="TI">TI</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Identificación"
                        style={{
                          margin: "12px",
                          height: "48px",
                          border: "none",
                          borderBottom: "2px solid black",
                          backgroundColor: "#F5F5F5",
                          color: "black",
                          width: "250px",
                          paddingLeft: "16px",
                          outline: "none",
                          borderRadius: "3px",
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.9rem",
                        }}
                        name="identificacion"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {errors.identificacion &&
                    touched.identificacion &&
                    messageVisible && (
                      <div
                        style={{
                          color: "red",
                          textAlign: "center",
                          opacity: messageVisible ? 1 : 0,
                          visibility: messageVisible ? "visible" : "hidden",
                          transition: "opacity 0.5s ease, visibility 0s 0.5s", // Transición suave
                        }}
                      >
                        {errors.identificacion}
                      </div>
                    )}

                  {/* Telefono */}
                  <div
                    style={{
                      display: "flex",
                      margin: "16px",
                      alignItems: "center",
                      marginBottom: errors.telefono ? "0" : "16px",
                    }}
                  >
                    <FaPhoneAlt
                      style={{ color: "black", fontSize: "1.3rem" }}
                    />
                    <input
                      type="text"
                      placeholder="Teléfono"
                      style={{
                        margin: "12px",
                        height: "48px",
                        border: "none",
                        borderBottom: "2px solid black",
                        backgroundColor: "#F5F5F5",
                        color: "black",
                        width: "100%",
                        paddingLeft: "16px",
                        outline: "none",
                        borderRadius: "3px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                      }}
                      name="telefono"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.telefono && touched.telefono && messageVisible && (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        opacity: messageVisible ? 1 : 0,
                        visibility: messageVisible ? "visible" : "hidden",
                        transition: "opacity 0.5s ease, visibility 0s 0.5s", // Transición suave
                      }}
                    >
                      {errors.telefono}
                    </div>
                  )}

                  {/* Correo Electrónico */}
                  <div
                    style={{
                      display: "flex",
                      margin: "16px",
                      alignItems: "center",
                      marginBottom: errors.correo ? "0" : "16px",
                    }}
                  >
                    <IoIosMail style={{ color: "black", fontSize: "1.6rem" }} />
                    <input
                      type="text"
                      placeholder="Correo Electrónico"
                      style={{
                        margin: "12px",
                        height: "48px",
                        border: "none",
                        borderBottom: "2px solid black",
                        backgroundColor: "#F5F5F5",
                        color: "black",
                        width: "100%",
                        paddingLeft: "16px",
                        outline: "none",
                        borderRadius: "3px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                      }}
                      name="correo"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.correo && touched.correo && messageVisible && (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        opacity: messageVisible ? 1 : 0,
                        visibility: messageVisible ? "visible" : "hidden",
                        transition: "opacity 0.5s ease, visibility 0s 0.5s", // Transición suave
                      }}
                    >
                      {errors.correo}
                    </div>
                  )}
                </div>
                <div style={{ flex: "1", marginLeft: "16px" }}>
                  {/* Dirección */}
                  <div
                    style={{
                      display: "flex",
                      margin: "16px",
                      alignItems: "center",
                      marginBottom: errors.direccion ? "0" : "16px",
                    }}
                  >
                    <MdMapsHomeWork
                      style={{ color: "black", fontSize: "1.6rem" }}
                    />
                    <input
                      type="text"
                      placeholder="Dirección"
                      style={{
                        margin: "12px",
                        height: "48px",
                        border: "none",
                        borderBottom: "2px solid black",
                        backgroundColor: "#F5F5F5",
                        color: "black",
                        width: "100%",
                        paddingLeft: "16px",
                        outline: "none",
                        borderRadius: "3px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                      }}
                      name="direccion"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.direccion && touched.direccion && messageVisible && (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        opacity: messageVisible ? 1 : 0,
                        visibility: messageVisible ? "visible" : "hidden",
                        transition: "opacity 0.5s ease, visibility 0s 0.5s", // Transición suave
                      }}
                    >
                      {errors.direccion}
                    </div>
                  )}

                  {/* Ciudad */}
                  <div
                    style={{
                      display: "flex",
                      margin: "16px",
                      alignItems: "center",
                      marginBottom: errors.ciudad ? "0" : "16px",
                    }}
                  >
                    <BiSolidCity
                      style={{ color: "black", fontSize: "1.6rem" }}
                    />
                    <input
                      type="text"
                      placeholder="Ciudad"
                      style={{
                        margin: "12px",
                        height: "48px",
                        border: "none",
                        borderBottom: "2px solid black",
                        backgroundColor: "#F5F5F5",
                        color: "black",
                        width: "100%",
                        paddingLeft: "16px",
                        outline: "none",
                        borderRadius: "3px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                      }}
                      name="ciudad"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.ciudad && touched.ciudad && messageVisible && (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        opacity: messageVisible ? 1 : 0,
                        visibility: messageVisible ? "visible" : "hidden",
                        transition: "opacity 0.5s ease, visibility 0s 0.5s", // Transición suave
                      }}
                    >
                      {errors.ciudad}
                    </div>
                  )}

                  {/* Fecha de Nacimiento */}
                  <div
                    style={{
                      display: "flex",
                      margin: "16px",
                      alignItems: "center",
                      marginBottom: errors.fechaNacimiento ? "0" : "16px",
                    }}
                  >
                    <MdDateRange
                      style={{ color: "black", fontSize: "1.6rem" }}
                    />
                    <input
                      type="date"
                      style={{
                        margin: "12px",
                        height: "48px",
                        border: "none",
                        borderBottom: "2px solid black",
                        backgroundColor: "#F5F5F5",
                        color: "black",
                        width: "100%",
                        paddingLeft: "16px",
                        outline: "none",
                        borderRadius: "3px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                      }}
                      name="fechaNacimiento"
                      onChange={handleChange}
                      placeholder="Fecha de Nacimiento" // Establece un placeholder visual
                      value={values.fechaNacimiento || ""} // Muestra una fecha vacía si no hay valor
                    />
                  </div>
                  {errors.fechaNacimiento &&
                    touched.fechaNacimiento &&
                    messageVisible && (
                      <div
                        style={{
                          color: "red",
                          textAlign: "center",
                          opacity: messageVisible ? 1 : 0,
                          visibility: messageVisible ? "visible" : "hidden",
                          transition: "opacity 0.5s ease, visibility 0s 0.5s", // Transición suave
                        }}
                      >
                        {errors.fechaNacimiento}
                      </div>
                    )}
                  {/* Género */}
                  <div
                    style={{
                      display: "flex",
                      margin: "16px",
                      alignItems: "center",
                      marginBottom: errors.genero ? "0" : "16px",
                    }}
                  >
                    <FaUserGroup
                      style={{ color: "black", fontSize: "1.3rem" }}
                    />
                    <select
                      name="genero"
                      onChange={handleChange}
                      value={values.genero}
                      style={{
                        margin: "12px",
                        backgroundColor: "#F5F5F5",
                        color: "black",
                        height: "48px",
                        border: "none",
                        borderBottom: "2px solid black",
                        width: "100%",
                        paddingLeft: "16px",
                        paddingRight: "8px",
                        outline: "none",
                        borderRadius: "3px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                      }}
                    >
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  {errors.genero && touched.genero && messageVisible && (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        opacity: messageVisible ? 1 : 0,
                        visibility: messageVisible ? "visible" : "hidden",
                        transition: "opacity 0.5s ease, visibility 0s 0.5s", // Transición suave
                      }}
                    >
                      {errors.genero}
                    </div>
                  )}

                  {/* Botón de Guardar */}
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#2D3748",
                      color: "white",
                      width: "200px",
                      height: "48px",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      marginTop: "16px",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                      marginLeft: "150px",
                    }}
                    disabled={isSubmitting}
                    onClick={showMessage}
                  >
                    Registrarme
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default RegisterUser;
