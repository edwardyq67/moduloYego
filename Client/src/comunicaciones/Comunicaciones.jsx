import  { useEffect } from 'react';
import { fetchInstances } from '../api/api';
import Instancias from './Instancias';
import { useComunicacionesStore, useInstanciaQR } from '../store/Comunicaciones';
import { UseSibar } from '../store/Sibar';

function Comunicaciones() {

  // Obtén el estado y las acciones del store
  const valor = useComunicacionesStore((state) => state.valor);
  const toggleValor = useComunicacionesStore((state) => state.toggleValor);
  const valorModulo=UseSibar((state) => state.valorModulo)
  const setdataInstancia = useInstanciaQR((state) => state.setDataInstancia);

  useEffect(() => {
    // Define una función async para obtener los datos
    const fetchData = async () => {
      try {
        const data = await fetchInstances();
        setdataInstancia(data);
      } catch (error) {
        console.error('Error al obtener las instancias:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {valorModulo == 1 ? (
        <div>
          <Instancias />
        </div>
      ) : valorModulo == 2 ? (
        <div>
          <p>Valor: {valor ? 'Verdadero' : 'Falso'}</p>
          <button onClick={toggleValor}>Cambiar valor</button>
        </div>
      ) : (
        <div>Camp Call</div>
      )}
    </>
  );
}

export default Comunicaciones;