import React from 'react'
import { IoQrCodeSharp } from "react-icons/io5";
import { FaCircle } from 'react-icons/fa';
import { FaFileImage } from "react-icons/fa";
import { generateQrCode } from '../api/api';
import { useInstanciaQR } from '../store/Comunicaciones';
function Instancias({ dataInstancia }) {
    const setQrBase64 = useInstanciaQR((state) => state.setQrBase64);
    const envioQR=async(name)=>{
        const qrData = await generateQrCode(name);
        if (qrData.status === 200 && qrData.base64) {
            setQrBase64(qrData.base64);
        }
    }
    return (
        <div className='relative grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-5'>
            {
                dataInstancia.map(instancia => (
                    <div key={instancia.id} className='bg-gray-50 shadow-lg text-black rounded-lg p-4 font-semibold gap-3 flex flex-col'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-2xl font-bold'>{instancia.name}</h2>
                            <IoQrCodeSharp className='cursor-pointer' onClick={()=>envioQR(instancia.name)} size={20} />
                        </div>
                        <div className='flex gap-2 items-center'>
                            {instancia.profilePicUrl ? (
                                <img
                                    width={60}
                                    className="rounded-full"
                                    src={instancia.profilePicUrl}
                                   
                                />
                            ) : (
                                <FaFileImage className="text-gray-400 w-12 h-12" /> 
                            )}
                            <div>
                                <h3>Yego</h3>
                                {instancia.ownerJid.split('@')[0]}
                            </div>
                        </div>
                        <div>
                            <button className={`flex justify-start items-center gap-2 flex-1 bg-gray-200 p-2 rounded-lg`}>
                                <h4 className={`${instancia.connectionStatus == "open" ? "text-green-500" : "text-red-500"}`}>{instancia.connectionStatus == "open" ? "Disponible" : "No Disponible"}</h4>
                                <FaCircle
                                    className={`${instancia.connectionStatus == "open" ? "text-green-500" : "text-red-500"} w-2 h-2`}
                                />
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Instancias
