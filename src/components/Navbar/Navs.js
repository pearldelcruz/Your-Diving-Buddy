import React, {useContext} from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import {FaUserPlus, FaShoppingCart, FaHome, FaSistrix} from 'react-icons/fa';
import {FiLogIn, FiLogOut} from 'react-icons/fi'
import {RiMenuAddLine} from 'react-icons/ri';
import {GiWhaleTail} from 'react-icons/gi'
import './Navs.css'

import UserContext from '../../UserContext';

function Navs() {

    const {user, unsetUser} = useContext(UserContext)

    
    let history = useHistory();
  
  
    const logout = () => {
      unsetUser();
      history.push('/login');
    }

let leftNav = (user.id !== null) ? 
        (user.isAdmin === true)?
            <>
            <Nav.Link as={NavLink} to="/addProducts"><span className="px-2"><RiMenuAddLine/></span> Add Products</Nav.Link>
             <Nav.Link onClick={logout}><span className="px-2"><FiLogOut/></span>Logout</Nav.Link>
            </>
            :
            <>
            <Nav.Link as={NavLink} to="/myOrder"><span className="px-2"><FaShoppingCart/></span>Cart</Nav.Link>
            <Nav.Link onClick={logout}><span className="px-2"><FiLogOut/></span>Logout</Nav.Link>
            </>
        :

        (
            <>
            <Nav.Link as={NavLink} to="/register"> <span className="px-2"><FaUserPlus/></span>Register</Nav.Link>
            <Nav.Link as={NavLink} to="/login"> <span className="px-2"><FiLogIn/>Login</span> </Nav.Link>
            </>
        ) 

    return (
        
        <Navbar expand="lg" className="nav-style">
        <Navbar.Brand as={Link} to="/" className="pl-3 nav-icon"> <GiWhaleTail size="35px"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/"><spam className="px-2"><FaHome/></spam>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/products"><span className="px-2"><FaSistrix/></span> View Products</Nav.Link>
            {/* </Nav>
            <Nav className="mr-auto"> */}
            {leftNav}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
};

export default Navs
