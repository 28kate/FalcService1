import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import falcorpLogo from '../assets/falcorp-logo11062.png';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={falcorpLogo} alt='Falcorp Logo' className='logo-image' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          {click ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
         
          <li className='nav-item'>
            <Link to='/skills' className='nav-links' onClick={closeMobileMenu}>
              Skills
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/addservice' className='nav-links' onClick={closeMobileMenu}>
              Add Service
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/gpt' className='nav-links' onClick={closeMobileMenu}>
              Gpt
            </Link>
          </li>
         
          <li className='nav-item'>
            <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
              Login
            </Link>
          </li>
         
        </ul>
      </nav>
      <div className='main-content'>
        {/* Your main content goes here */}
      </div>
    </>
  );
}

export default Navbar;
