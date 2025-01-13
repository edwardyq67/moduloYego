import { useInstanciaQR } from '../../store/Comunicaciones';
import { IoMdClose } from "react-icons/io";
import { UseModal } from '../../store/Modal';
function ModalInstanciaQR() {
  // Accede al estado qrBase64 del store
  const qrBase64 = useInstanciaQR((state) => state.qrBase64);
  const setIsOpen=UseModal((state)=> state.setIsOpen)
  return (
    <div className='top-0 z-50 fixed w-screen h-screen flex justify-center items-center'>
      <div className='relative bg-black text-white z-50 gap-5 flex flex-col p-10 rounded-xl'>
      <IoMdClose onClick={()=>setIsOpen(false)} className='absolute right-5 top-5 cursor-pointer' size={20}/>
        <p className=' font-bold text-center text-lg'>Código QR de Conexión</p>
        {qrBase64 && <img src={qrBase64} alt="Código QR" />}
      </div>  
       <div className='bg-black w-screen h-screen opacity-40 absolute'></div>
   
    </div>
  );
}

export default ModalInstanciaQR;