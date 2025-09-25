import React, { useState, useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Customize2() {
  const {
    userData,
    backendImage,
    SelectedImage,
    serverUrl,
    setUserData
  } = useContext(userDataContext);
  
  const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleUpdateAssistant = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", SelectedImage);
      }
      
      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      );
      
      console.log(result.data);
      setUserData(result.data);
      navigate('/home');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <div className='w-full h-[100vh] bg-gradient-to-b from-[#030353]
     via-[#030353] to-black
     flex justify-center items-center 
     flex-col p-[20px] '>
      <h1 className='text-white mb-[30px] text-[30px] text-
      '>Enter Your <span className='text-blue-200'>Assistant Name
      </span></h1>
      <input
          type="text"
         placeholder="eg. sachin"
         className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
         required
         value={assistantName}
         onChange={(e) => setAssistantName(e.target.value)}
        />


        {assistantName && <button className='min-w-[300px] h-[50px] mt-[30px] text-black 
        font-semibold cursor-pointer bg-white 
        rounded-full text-[19px]' disabled={loading} onClick={()=>{
        handleUpdateAssistant()
        }
        } >{!loading?"Finally Create Your Assistant": "Loading..."} </button>}
          
    </div>
  )
}

export default Customize2
