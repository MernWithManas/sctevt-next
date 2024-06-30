import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./Syllabus.css";
import Link from 'next/link';
import { FaFilePdf } from "react-icons/fa6";


const Syllabus = () => {
  const [syllabuses, setSyllabuses] = useState([]);

  useEffect(() => {
    handleSyllabuses();
  }, []);

  const handleSyllabuses = async () => {
    try {
      const resp = await axios.get("admin/syllabus");
      setSyllabuses(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching syllabuses! AxiosError");
    }
  };


  return (
    <div>
      <ToastContainer />
      <section className='grid grid-cols-4 text-white gap-x-8 gap-y-8'>
        {syllabuses.map((syllabus, index) => (
          <div  className='syllabus-box' key={syllabus._id}>
            <h3 className='text-lg'>{syllabus.name}</h3>
            <button onClick={() => handleClick(index)}>DOWNLOAD <FaFilePdf /></button>
         
              <div className='flex flex-col'>
                <Link target='_blank' to={syllabus.common}>1st & 2nd semester</Link>
                <Link target='_blank' to={syllabus.third}>3rd semester</Link>
                <Link target='_blank' to={syllabus.fourth}>4th semester</Link>
                <Link target='_blank' to={syllabus.fifth}>5th semester</Link>
                <Link target='_blank' to={syllabus.sixth}>6th semester</Link>
              </div>
  
          </div>
        ))}
      </section>
    </div>
  );
};

export default Syllabus;
