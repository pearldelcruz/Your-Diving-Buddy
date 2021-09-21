import React, {useContext} from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap'
import {FaUser, FaShoppingCart} from 'react-icons/fa'


// import logo from './../../images/logo.png';
import UserContext from './../../UserContext';

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
            <Nav.Link as={NavLink} to="/addProducts">Add Products</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
            </>
            :
            <>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
            <Nav.Link><span><FaShoppingCart/></span></Nav.Link>
            </>
        :

        (
            <>
            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
            <Nav.Link as={NavLink} to="/login"> Login
            {/* <span><FaUser/></span> */}
            </Nav.Link>
            </>
        ) 

    return (
        
        <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ml-auto'>
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/products">View Products</Nav.Link>
            </Nav>
            <Nav>
            {leftNav}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
};

export default Navs
