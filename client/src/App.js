import './App.css';
import Services from './pages/services/Services';
import AddService from './pages/addService/AddService';
import Comments from './pages/Comments/Comments';
import Login from './pages/Login/Login';
import Register from './pages/Register/Rejister';
import Gpt from './pages/GPT/Gpt';
import AdminService from './pages/AdminService/AdminService';
import { AuthContext } from './pages/helpers/Authcontext';
import { useState, useEffect } from 'react';
import "./components/Navbar.css";
import { Link, Navigate } from 'react-router-dom';
import falcorpLogo from './assets/falcorp-logo11062.png';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [authstate, setAuthstate] = useState({ userName: "", id: 0, role: "", status: false });

  useEffect(() => {
    axios
      .get("http://localhost:3001/user/authen", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthstate({ ...authstate, status: false });
        } else {
          setAuthstate({ userName: response.data.userName, role: response.data.role, id: response.data.id, status: true });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthstate({ userName: "", id: 0, role: "", status: false });
    setClick(false);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authstate, setAuthstate }}>
        <Router>
          <nav className='navbar'>
            <Link className='navbar-logo' onClick={closeMobileMenu}>
              <img src={falcorpLogo} alt='Falcorp Logo' className='logo-image' />
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <AiOutlineClose /> : <AiOutlineMenu />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              {authstate.role === 'user' ? (
                <>
                  <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/gpt' className='nav-links' onClick={closeMobileMenu}>
                      Gpt
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <Link to='/adminserv' className='nav-links' onClick={closeMobileMenu}>
                      Admin Services
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
                </>
              )}

              {!authstate.status ? (
                <li className='nav-item'>
                  <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                    Login
                  </Link>
                </li>
              ) : (
                <li className='nav-item'>
                  <Link to='/login' className='nav-links' onClick={logout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <Routes>
          <Route path='/' element={<Services />} />
            <Route path='/service/:id' element={<Comments />} />
            <Route path='/addservice' element={authstate.status ? <AddService /> : <Navigate to='/login' />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/gpt' element={authstate.status ? <Gpt /> : <Navigate to='/login' />} />
            <Route path='/adminserv' element={authstate.status ? <AdminService /> : <Navigate to='/login' />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
