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

Modal.setAppElement("#root");

function RegisterUser() {
  const [messageVisible, setMessageVisible] = useState(true);

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

  const correoRegistrado = async (correo) => {
    try {
      const response = await axios.get("http://localhost:4000/api/usuarios");
      const usuarios = response.data;
      const usuarioEncontrado = usuarios.some(
        (usuario) => String(usuario.correo) === String(correo)
      );
      return usuarioEncontrado;
    } catch (error) {
      console.error("Error al verificar el correo:", error);
      return false;
    }
  };

  const documentoRegistrado = async (identificacion) => {
    try {
      const response = await axios.get("http://localhost:4000/api/usuarios");
      const usuarios = response.data;
      const usuarioEncontrado = usuarios.some(
        (usuario) => String(usuario.identificacion) === String(identificacion)
      );
      return usuarioEncontrado;
    } catch (error) {
      console.error("Error al verificar el documento:", error);
      return false;
    }
  };

  const telefonoRegistrado = async (telefono) => {
    try {
      const response = await axios.get("http://localhost:4000/api/usuarios");
      const usuarios = response.data;
      const usuarioEncontrado = usuarios.some(
        (usuario) => String(usuario.telefono) === String(telefono)
      );
      return usuarioEncontrado;
    } catch (error) {
      console.error("Error al verificar el teléfono:", error);
      return false;
    }
  };

  const validationSchema = Yup.object().shape({
    identificacion: Yup.string()
      .matches(
        /^\+?[0-9]{8,10}$/,
        "La cédula debe tener entre 8 y 10 dígitos numéricos"
      )
      .required("El documento es requerido")
      .test(
        "check-duplicado",
        "Documento ya registrado en el sistema",
        async (identificacion) => {
          const duplicado = await documentoRegistrado(identificacion);
          return !duplicado;
        }
      ),
    nombre: Yup.string()
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .matches(/^[A-Za-z ]+$/, "Solo letras permitidas")
      .required("El nombre es requerido"),
    apellido: Yup.string()
      .max(50, "El apellido no puede tener más de 50 caracteres")
      .matches(/^[A-Za-z ]+$/, "Solo letras permitidas")
      .required("El apellido es requerido"),
    telefono: Yup.string()
      .matches(/^\+?[0-9]{10}$/, "El teléfono debe tener 10 dígitos numéricos")
      .required("El teléfono es requerido")
      .test(
        "check-duplicado",
        "Teléfono ya registrado en el sistema",
        async (telefono) => {
          const duplicado = await telefonoRegistrado(telefono);
          return !duplicado;
        }
      ),
    correo: Yup.string()
      .max(125, "El correo no puede tener más de 125 caracteres")
      .email("Formato de correo electrónico inválido")
      .required("El Correo es requerido")
      .test(
        "check-duplicado",
        "El Correo ya está registrado en el sistema",
        async (correo) => {
          const duplicado = await correoRegistrado(correo);
          return !duplicado;
        }
      ),
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
            nombre: "",
            apellido: "",
            telefono: "",
            correo: "",
            direccion: "",
            ciudad: "",
            genero: "",
            fechaNacimiento: "",
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              console.log(values);
              await registerDocente(values);
              resetForm();
            } catch (error) {
              console.error("Error al crear el docente:", error);
            }
            setSubmitting(false);
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
                      marginBottom: errors.nombre ? "0" : "16px",
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
                      name="nombre"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.nombre && touched.nombre && messageVisible && (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        opacity: messageVisible ? 1 : 0,
                        visibility: messageVisible ? "visible" : "hidden",
                        transition: "opacity 0.5s ease, visibility 0s 0.5s", // Transición suave
                      }}
                    >
                      {errors.nombre}
                    </div>
                  )}
                  {/* Apellidos */}
                  <div
                    style={{
                      display: "flex",
                      margin: "16px",
                      alignItems: "center",
                      marginBottom: errors.apellido ? "0" : "16px",
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
                      name="apellido"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.apellido && touched.apellido && messageVisible && (
                    <div
                      style={{
                        color: "red",
                        textAlign: "center",
                        opacity: messageVisible ? 1 : 0,
                        visibility: messageVisible ? "visible" : "hidden",
                        transition: "opacity 0.5s ease, visibility 0s 0.5s", // Transición suave
                      }}
                    >
                      {errors.apellido}
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
