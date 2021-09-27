import React from 'react'
import { Container, Jumbotron, Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'

function PageNotFound() {
    return (
        <Container>
            <Row>
                
                <Col className="pt-5 mt-5">
                    <Jumbotron fluid className="px-3 text-center">
                        <h1>404</h1>
                        <p>
                        Page not Found
                        </p>  
                        <Link to="/">Go Back to Home</Link>
                    </Jumbotron>  
                </Col>
            </Row>
        </Container>
    )
}

export default PageNotFound
