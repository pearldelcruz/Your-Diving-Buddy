import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../App.css';

function PageNotFound() {
    return (
        <Container fluid='md' className="mt-5">
            <Row>
                <Col className="text-center form-style-errorPage">  
                <h1>404</h1> 
                <p> Page not Found</p> 
                <Link to="/">Go Back to Home</Link>
                </Col> 
            </Row>
        </Container>
    )
}

export default PageNotFound
