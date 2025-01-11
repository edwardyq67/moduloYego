import React, { useEffect, useState } from 'react';
import { fetchInstances } from '../api/api';
import Instancias from './Instancias';
import { useComunicacionesStore } from '../store/Comunicaciones';

function Comunicaciones({ valorModulo }) {
  const [dataInstancia, setDataInstancia] = useState([]);

  // Obtén el estado y las acciones del store
  const valor = useComunicacionesStore((state) => state.valor);
  const toggleValor = useComunicacionesStore((state) => state.toggleValor);

  useEffect(() => {
    // Define una función async para obtener los datos
    const fetchData = async () => {
      try {
        const data = await fetchInstances();
        setDataInstancia(data);
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
          <Instancias dataInstancia={dataInstancia} />
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