import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import {FaFacebook, FaInstagram, FaTwitter, FaCopyright} from 'react-icons/fa'


function FooterPage() {
    return (
        <Col className="text-center">
            <Row>
                <Col className="footer">
                    <span className="pl-3"><FaCopyright/> Your Diving Buddy</span>
                    <span className="pl-3">|</span>
                    <span className="pl-3">Follow us:</span>
                    <span className="pl-3"><FaFacebook/></span>
                    <span className="pl-3"><FaInstagram/></span>
                    <span className="pl-3"><FaTwitter/></span>
                </Col>
            </Row>
        </Col>
    )
}

export default FooterPage
