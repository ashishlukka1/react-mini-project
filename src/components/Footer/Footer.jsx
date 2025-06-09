import React from 'react'
import { FaPinterest, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import '../../styles/Footer.css';

function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footer-head d-flex align-items-center justify-content-center mb-3">
          <img src="https://i.postimg.cc/xC4xmtTS/image.png" alt="" className="footer-logo me-2" />
          <div className="logo-text1 ">Tasty Kitchens</div>
        </div>
        <div className="footer-content d-flex flex-column align-items-center justify-content-center">
          <p className="lead text-white fs-5">The only thing we are serious about is food.</p>
          <p className="lead text-white fs-5 mb-4">Contact us on</p>
        </div>
        <div className="footer-lower d-flex justify-content-center align-items-center gap-4 pb-3">
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaPinterest size={35} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
            <FaInstagram size={35}/>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
            <FaTwitter size={35}/>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
            <FaFacebook size={35}/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer