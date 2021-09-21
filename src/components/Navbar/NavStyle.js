import styled from "styled-components";
import {NavLink as Link} from 'react-router-dom';
import {FaBars} from 'react-icons/fa'

export const Navbar = styled.nav`
    background: green;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vh - 100px) / 2);
    z-index:10;
    `;

export const NavLink = styled(Link)`
    color: green;
    font-size: 2rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding:0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        color:#15cdfc;
    }
`
export const Bars = styled(FaBars)`
    display: none;
    color: #fff;

   @media screen and (max-width: 768px){
       display: block;
       position: absolute;
       top:0;
       right:0;
       transform: traslate(-100%,75%);
       font-size: 1.8rem;
       cursor:pointer
   }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right:-24px;

    @media screen and (max-width:768px){
        display: none;
    }
`
export const NavBtn =styled.nav `
    display: flex;
    align-items: center;
    margin-right: 24px;

    @media screen and (max-width:768px){
        display: none;
    }
`

export const NavBtnLink = styled(Link) `
    border-radius:4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: a
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`