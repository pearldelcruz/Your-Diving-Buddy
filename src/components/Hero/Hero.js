import React, { useContext } from 'react';
import {Button, Jumbotron} from 'react-bootstrap'
import { FaLink } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import './Hero.css'


function Hero() {

    const {user} = useContext(UserContext)
    
    return (
        <div className='hero-container'>
            
                <h1>Be a part of the adventure</h1>
                <p>Explore the depth of the ocean. Enjoy life to the fullest. What are you waiting for?</p>
                <p>

                {   (user.id === null|| user.isAdmin !== true)?
                    <>
                        <span className="p-3">
                            <Button size="lg" className='hero-btns btns' as={Link} to="/products">Join a program</Button>
                        </span>
                    </>
                        :
                        <span className="p-3">
                            
                        </span>

                } 
                
                </p>
            
        </div>
    )
}

export default Hero
