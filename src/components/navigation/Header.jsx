import { NavLink, Link } from "react-router-dom";
import "./Header.css"
import headerLogo from "/images/logo/logo-cyan.png"
import headerLogoWhite from "/images/logo/logo-white.png"
import Breadcrumb from "./Breadcrumb";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";



function Header() {

  const [showMenu, setShowMenu] = useState(false);
  const handleMenu = () => {
    
    setShowMenu(!showMenu);
  }

  return (
    <>

      <header className= {`z-50 lg:top-4 bg-white sticky top-0  lg:py-4 mb-[100px]  lg:rounded-xl  max-h-[5%]   lg:mx-14 shadow-lg 
        ${showMenu? "bg-gradient-to-tr from-white  to-cyan-950 h-screen" : ""}`}>

        <nav className={`flex lg:py-0 py-6 lg:px-0 px-5 items-center lg:mx-6  max-w-[1920px] 
          ${showMenu ? " gap-20 top-20 relative flex flex-col h-[80%] p-0 m-0 " : "justify-between "}`}>

          <Link to="/" >   
              <img src={headerLogo} className={`lg:w-[100px] w-20 sm:w-24 md:w-28 ${showMenu ? "hidden" : ""}`}alt="Header Logo" />
          </Link>


          <div className={`justify-center items-center text-center  w-full gap-5 lg:flex 
            ${showMenu ? "grid text-2xl gap-14 py-10 " : "hidden"}`}>
            <NavLink onClick={()=> setShowMenu(false)} to="/" className={({ isActive }) => `${isActive ? "text-cyan-700" : "text-black"}`}>Home</NavLink>
            <NavLink onClick={()=> setShowMenu(false)} to="/blogs" className={({ isActive }) => `${isActive ? "text-cyan-700" : "text-black"}`}>Blogs</NavLink>
            <NavLink onClick={()=> setShowMenu(false)} to="/colleges" className={({ isActive }) => `${isActive ? "text-cyan-700" : "text-black"}`}>Colleges</NavLink>
            <NavLink onClick={()=> setShowMenu(false)} to="/syllabus" className={({ isActive }) => `${isActive ? "text-cyan-700" : "text-black"}`}>Syllabus</NavLink>
          </div>

          <GiHamburgerMenu className={`text-3xl text-cyan-800 lg:hidden ${showMenu ? "hidden" : ""}`} onClick={() => handleMenu()} />

          <IoMdClose
           className={`w-12 h-12 text-white lg:hidden absolute top-10 border rounded-full p-2  right-10
          ${showMenu ? "" : "hidden"}`}
           onClick={() => handleMenu(false)} />


          <div className= {`gap-2 text-sm font-light text-white  lg:flex ${showMenu ? "flex gap-4" : "hidden"}`}>

            <Link onClick={()=> setShowMenu(false)} to="/signup" >
              <button className="px-3 py-2 text-xl lg:text-xs bg-cyan-700 hover:underline">SignUp</button>
            </Link >

            <Link onClick={()=> setShowMenu(false)} to="/login">
              <button className="px-3 py-2 text-xl lg:text-xs bg-cyan-700 hover:underline">LogIn</button>
            </Link>


          </div>

          
          
        </nav>

      </header>


      <Breadcrumb paths={[
        { title: 'Home', url: '/' },
        { title: 'Current Page', url: '/current-page' },
      ]} />



    </>
  )
}

export default Header

