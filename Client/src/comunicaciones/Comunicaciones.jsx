import  { useEffect } from 'react';
import { fetchInstances } from '../api/api';
import Instancias from './Instancias';
import { useComunicacionesStore, useInstanciaQR } from '../store/Comunicaciones';
import { UseSibar } from '../store/Sibar';
import { UseSlider } from '../store/Modal';

function Comunicaciones() {

  // Obtén el estado y las acciones del store
  const valor = useComunicacionesStore((state) => state.valor);
  const toggleValor = useComunicacionesStore((state) => state.toggleValor);
  const valorModulo=UseSibar((state) => state.valorModulo)
  const setdataInstancia = useInstanciaQR((state) => state.setDataInstancia);
  //Slider activacion
  const setIsOpenSlider = UseSlider((state) => state.setIsOpenSlider);
  //activar Slider
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInstances();
        setdataInstancia(data);
      } catch (error) {
        console.error('Error al obtener las instancias:', error);
      }finally{
        setIsOpenSlider(false)
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