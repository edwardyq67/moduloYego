import axios from "axios";

// Base URL para la API
const API_URL = "http://localhost:5001/api";

export const fetchInstances = async () => {
    try {
      const response = await axios.get(`${API_URL}/instances`);
      return response.data;
    } catch (error) {
      console.error("Error al recuperar instancias:", error);
      throw error;
    }
  };

  // Función para generar el QR de una instancia
export const generateQrCode = async (instanceName) => {
    try {
      const response = await axios.get(`${API_URL}/generate-qr/${instanceName}`);
      return response.data; // Se espera que esto devuelva el base64
    } catch (error) {
      console.error("Error generating QR code:", error);
      throw error.response?.data || error;
    }
  };