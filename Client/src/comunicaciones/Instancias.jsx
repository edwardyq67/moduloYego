import React, { useState } from "react";
import { IoQrCodeSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";
import { generateQrCode, logoutInstance } from "../api/api";
import { IoMdAdd } from "react-icons/io";
import { useInstanciaQR } from "../store/Comunicaciones";
import { FaRegTrashCan } from "react-icons/fa6";
import { UseModal } from "../store/Modal";

function Instancias() {
  const setQrBase64 = useInstanciaQR((state) => state.setQrBase64);
  const dataInstancia = useInstanciaQR((state) => state.dataInstancia);
  const setIsOpen = UseModal((state) => state.setIsOpen);
  const setModalContent = UseModal((state) => state.setModalContent);

  // Estado para el término de búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Estado para el filtro de conexión
  const [filtroConexion, setFiltroConexion] = useState("Todos");

  // Filtrar las instancias basadas en el término de búsqueda y el estado de conexión
  const instanciasFiltradas = dataInstancia.filter((instancia) => {
    const coincideNombre = instancia.name
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideTelefono = instancia.ownerJid
      .split("@")[0]
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideBusqueda = coincideNombre || coincideTelefono;

    if (filtroConexion === "Todos") {
      return coincideBusqueda;
    } else if (filtroConexion === "Conectado") {
      return coincideBusqueda && instancia.connectionStatus === "open";
    } else if (filtroConexion === "Desconectado") {
      return coincideBusqueda && instancia.connectionStatus !== "open";
    }

    return false;
  });

  const envioQR = async (name) => {
    const qrData = await generateQrCode(name);
    if (qrData.status === 200 && qrData.base64) {
      setQrBase64(qrData.base64);
    }
  };

  const handleDelete = async (name) => {
    const logoutResponse = await logoutInstance(name);
    if (logoutResponse.status !== "SUCCESS") {
      throw new Error("Error al cerrar la sesión de la instancia.");
    }
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-5">
      <div className="col-span-1 lg:col-span-2 2xl:col-span-3 3xl:col-span-4 items-center justify-between grid grid-cols-1 md:grid-cols-6 gap-2">
        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)} // Actualiza el término de búsqueda
          className="border border-gray-300 p-2 rounded-lg w-full col-span-4 outline-none"
        />
        <button className="border-gray-300 border p-2 rounded-lg col-span-1 text-black font-bold flex items-center justify-center gap-2">
          <IoMdAdd className="text-black" /> Instancia
        </button>
        <form className="max-w-sm mx-auto col-span-1 w-full outline-none">
          <select
            id="filtro-conexion"
            value={filtroConexion}
            onChange={(e) => setFiltroConexion(e.target.value)} // Actualiza el filtro de conexión
            className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white overflow-hidden"
          >
            <option value="Todos">Todos</option>
            <option value="Conectado">Conectado</option>
            <option value="Desconectado">Desconectado</option>
          </select>
        </form>
      </div>

      {/* Mostrar instancias filtradas */}
      {instanciasFiltradas.map((instancia) => (
        <div
          key={instancia.id}
          className="bg-gray-50 shadow-lg text-black rounded-lg p-4 font-semibold gap-3 flex flex-col"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{instancia.name}</h2>
            {instancia.connectionStatus !== "open" && (
              <IoQrCodeSharp
                className="cursor-pointer"
                onClick={() => {
                  setIsOpen(true); // Activa el modal
                  setModalContent(instancia); // Valor del modal, estado global
                  envioQR(instancia.name); // Usar la API para obtener el QR
                }}
                size={20}
              />
            )}
          </div>
          <div className="flex gap-2 items-center">
            {instancia.profilePicUrl ? (
              <img
                width={60}
                className="rounded-full"
                src={instancia.profilePicUrl}
                alt="Profile"
              />
            ) : (
              <FaFileImage className="text-gray-400 w-12 h-12" />
            )}
            <div>
              <h3>Yego</h3>
              {instancia.ownerJid.split("@")[0]}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <button
                className={`flex justify-start items-center gap-2 flex-1 bg-gray-200 p-2 rounded-lg`}
              >
                <h4
                  className={`${
                    instancia.connectionStatus == "open"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {instancia.connectionStatus == "open"
                    ? "Disponible"
                    : "No Disponible"}
                </h4>
                <FaCircle
                  className={`${
                    instancia.connectionStatus == "open"
                      ? "text-green-500"
                      : "text-red-500"
                  } w-2 h-2`}
                />
              </button>
            </div>
            <FaRegTrashCan
              onClick={() => handleDelete(instancia.name)}
              className="cursor-pointer"
              size={20}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Instancias;