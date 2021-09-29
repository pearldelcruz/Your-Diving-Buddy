import React, {useState, useEffect} from 'react';
import {Card, Button, Container, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './Highlight.css'

import Dive1 from '../../images/Dive1.png';
import Dive2 from '../../images/Dive2.png';
import Dive3 from '../../images/Dive3.png';
import Dive4 from '../../images/Dive4.png';
import Dive5 from '../../images/Dive5.png';
import Dive6 from '../../images/Dive6.png';




function Feature() {
    
        let data = [
            {
                id:1,
                imgSrc:Dive1
            },
            {
                id:2,
                imgSrc:Dive2
            },
            {
                id:3,
                imgSrc:Dive3
            },
            {
                id:4,
                imgSrc:Dive4
            },
            {
                id:5,
                imgSrc:Dive5
            },
            {
                id:6,
                imgSrc:Dive6
            }
        ]
    


        const [img, setImg] = useState('');
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
    

       
    
        const fetchData = () => {
            let token = localStorage.getItem('token')
    
            fetch('https://gentle-wave-67856.herokuapp.com/api/products/allProducts',{
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(result => result.json())
            .then(result => {
                
                let feature = Math.floor(Math.random()*result.length);
                
                setName(result[feature].name);
                setDescription(result[feature].description)

                
                let featuredImg = Math.floor(Math.random()*data.length);
                setImg(data[featuredImg].imgSrc);
                
            })
        }
    
        useEffect( () => {
            fetchData()
        }, [])

    
    
    return (
        <>
        <Container className="justify-content-center">
            <Row>
                <Col>

                </Col>
            </Row>
        </Container>
        <Container className="justify-content-center">
            <Row flex className="justify-content-center">
                <Col className="feature" xs={12} sm={12} md={8}>
                    <h1 className="text-center mb-3 p-5">Featured Program</h1>
                    <Card className="featured-image">
                        <Card.Img variant="top" src={img} />
                        <Card.Body>
                            <Card.Title>{name}</Card.Title>
                            <Card.Text>{description}</Card.Text>
                            <Button className="btn-style" as={Link}  to='/products'>Check out our programs</Button>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
       </Container>
       <Container className="justify-content-center mb-5 p-5">
            <Row>
                <Col>

                </Col>
            </Row>
        </Container>
       </>
    )
}

export default Feature
