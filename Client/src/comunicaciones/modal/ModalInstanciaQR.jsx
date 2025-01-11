import React from 'react';
import { useInstanciaQR } from '../../store/Comunicaciones';

function ModalInstanciaQR() {
  // Accede al estado qrBase64 del store
  const qrBase64 = useInstanciaQR((state) => state.qrBase64);
  console.log(qrBase64)
  return (
    <div className='top-0 z-50 fixed w-screen h-screen flex justify-center items-center'>
      <div className='bg-black w-screen h-screen opacity-40 absolute'></div>
      <div className='bg-black'>
        <p>Código QR:</p>
        {qrBase64 && <img src={qrBase64} alt="Código QR" />}
      </div>
    </div>
  );
}

export default ModalInstanciaQR;