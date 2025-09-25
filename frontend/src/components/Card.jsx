import React, { useContext } from 'react';
import { userDataContext } from '../context/UserContext';

function Card({ image }) {
  const {
    serverUrl,
    userData,
    setUserData,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    SelectedImage,
    setSelectImage
  } = useContext(userDataContext);
    
  return (
    <div 
      className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px]
        bg-[#020220] border-2 border-[#0000ff66] rounded-2xl
        overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer 
        hover:border-4 hover:border-white 
        ${SelectedImage === image ? "border-4 border-white shadow-2xl shadow-blue-950" : ""}`} 
      onClick={() => {
        setSelectImage(image);
        setBackendImage(null);
        setFrontendImage(null);
      }}
    >
      <img src={image} className='w-full h-full object-cover' alt="Assistant" />
    </div>
  );
}

export default Card;
