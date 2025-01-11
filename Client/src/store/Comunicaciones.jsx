import { create } from 'zustand'; // Importa `create` como una exportación nombrada

// Crea el store con Zustand
export const useComunicacionesStore = create((set) => ({
  valor: false, // Estado inicial
  toggleValor: () => set((state) => ({ valor: !state.valor })), // Acción para cambiar el valor
}));

export const useInstanciaQR = create((set) => ({
    qrBase64: '',
    setQrBase64: (base64) => set({ qrBase64: base64 }),
  }));