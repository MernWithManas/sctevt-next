import logo from "/images/logo/logo-white.png"
import "./Footer.css"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Footer = () => {

  const currentYear = () => {
    return new Date().getFullYear();
  }


  return (
    <footer
      className='w-full flex flex-col  lg:flex-row mt-1 lg:mt-[200px] lg:gap-0 gap-7  justify-between items-center px-20 lg:max-w-[1920px] py-12 lg:py-5  text-white bg-cyan-700'
    >
      <Link to="/">
        <img src={logo} className="w-[100px]" />
      </Link>

<nav className="flex gap-5 opacity-75">

        <Link to="/contact-us">Contact Us</Link>
        <Link to="/about-us">About Us</Link>
</nav>
        

      
      
      <div className="icon-container">
        <a href="https://facebook.com" className="icon" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" className="icon" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" className="icon" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" className="icon" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
      </div>

      <div className="text-xs lg:text-sm "> Copyright ©{currentYear()} SCTEVT.IN </div>

    </footer>
  )
}

export default Footer