"use client"

import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import React, { useEffect, useState } from "react";



const Colleges = () => {


    const [colleges, setColleges] = useState([]) ;

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const resp = await axios.get("api/admin/colleges");
                setColleges(resp.data);
            } catch (error) {
                console.log("Error getting colleges", error);
            }
        }
        fetchColleges();
    }, []);

   

    return (
        <>

            {/* SEARCH FOR COLLEGE ..........   */}
            {/* SEARCH FOR COLLEGE ..........   */}
            {/* SEARCH FOR COLLEGE ..........   */}


            <div className="flex items-center justify-center ">
                <div className="flex px-20 items-center  bg-gray-300 w-[70%] rounded-lg shadow-inner">
                    <input className="w-full py-4 text-3xl font-light bg-transparent outline-none text-cyan-700 " type="search" placeholder="Find your college..." />
                    <IoIosSearch className="w-10 h-10 bg-gray-300 " />
                </div>
            </div>

            {/* COLLEGE PROFILE LIST BOX ............ */}
            {/* COLLEGE PROFILE LIST BOX ............ */}
            {/* COLLEGE PROFILE LIST BOX ............ */}


            <div className="grid grid-cols-4 py-16 gap-y-8 gap-x-8 ">
                {
                    colleges.map((college, index) => {
                        return (
                            <div key={index} className="overflow-hidden text-white border-2 shadow-inner bg-cyan-600 rounded-xl group">
                                <img src="/images/gpbbsr-principal.jpeg" className="w-full " />
                                <div className="px-3 py-3 ">
                                    <span className="px-3 py-1 text-base text-white rounded-lg bg-cyan-500"> {college["District Name"]}</span>
                                    <h3 className="w-full h-full m-auto mt-4 font-bold uppercase text-slate-100 ">{college["Institute Name"]}</h3>
                                </div>
                            </div>
                        )
                    })
                }
            </div>



        </>
    )
}


export default Colleges;