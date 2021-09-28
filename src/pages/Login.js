import React , {useState, useContext, useEffect} from 'react'

import UserContext from './../UserContext'
import {Redirect} from 'react-router-dom'

import {Form, Button, Col, Row} from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../App.css'

function Login() {

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	
	const {user, setUser} = useContext(UserContext);

	useEffect( () => {
		if(email !== '' && password !== ''){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, password]);

	function login(e){
		e.preventDefault();

		fetch('https://gentle-wave-67856.herokuapp.com/api/users/login', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			
			if(typeof result.access !== "undefined"){
				
				localStorage.setItem('token', result.access)
				userDetails(result.access)
			}
			else if (result === false)
			{
				
				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Failed to login. If you haven't registered yet, please create an account"
				})

				
			
			}
		})

		const userDetails = (token) => {
			fetch('https://gentle-wave-67856.herokuapp.com/api/users/profile',{
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then(result => result.json())
			.then(result => {
				console.log(result) 

				setUser({
					id: result._id,
					isAdmin: result.isAdmin
				});
			})
		}

		setEmail('');
		setPassword('');
	}

	return(
		(user.id !== null) ? 

			<Redirect to="/" />

		: 
            <Col className="mt-5 p-3 justify-content-center">
                <Row className="justify-content-center">
                    <Col sm={true} md={3} className="form-style-login">
                        <div className="mb-3 text-center"><h1 className="text-center">Login</h1></div>
                        <Form onSubmit={ (e) => login(e) }>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                
                                <Form.Control type="email" placeholder="Enter email" value={email}
                                onChange={(e)=> setEmail(e.target.value) }/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                               
                                <Form.Control type="password" placeholder="Password" value={password}
                                onChange={(e)=> setPassword(e.target.value) }/>
                            </Form.Group>

                            <Button className="btn-style" variant="primary" type="submit" disabled={isDisabled}>Submit</Button>
							
                        </Form>
                    </Col>
                </Row>
            </Col>
	)

}

export default Login