import React, {useContext, useEffect, useState}from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useHistory, Redirect } from 'react-router-dom';
import UserContext from './../UserContext'
import Swal from 'sweetalert2';

function Register() {

    const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	const {user} = useContext(UserContext)

	let history = useHistory();

	useEffect( () => {
		if(email !== '' && password !== '' && password2 !== '' && password === password2){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, password, password2]);


	function register(e){
		e.preventDefault();

		
		fetch('https://gentle-wave-67856.herokuapp.com/api/users/checkEmail', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then( result => result.json())
		.then( result => {
			console.log(result)	

			if(result === true){
				
				Swal.fire({
					title: 'Failed',
					icon: 'error',
					text: 'This email has already registered. Please login to your account or use another email'
				})
			} else {
				

				fetch('https://gentle-wave-67856.herokuapp.com/api/users/register', {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						mobileNo: mobileNo,
						password: password
					})
				})
				.then( result => result.json())
				.then( result => {
					

					if(result === true){

						Swal.fire({
							title: "Success",
							icon: "success",
							text: "You have successfully created an account. Please proceed to login"
						})

						history.push('/login');

					} else {
						Swal.fire({
							title: 'Failed',
							icon: 'error',
							text: 'Oh-oh! Something went wrong. Please try again.'
						})
					}
				})

			}
		})

		setEmail('');
		setPassword('');
		setPassword2('');
	}

	return(
		(user.id !== null) ?

			<Redirect to="/" />

		:
        <Col className="mt-5 p-3 justify-content-center">
            <Row className="justify-content-center">
                <Col sm={true} md={3}>
                    <div className="text-center"><h1>Register</h1></div>
                    <Form onSubmit={(e)=> register(e)}>
                    <Form.Group className="mb-3" controlId="formlirstName">
                    <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formlastName">
                        <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formmobileNo">
                        <Form.Control type="text" placeholder="Mobile Number" value={mobileNo} onChange={(e)=> setMobileNo(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>  setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword2">
                    <Form.Control type="password" placeholder="Confirm Password" value={password2} onChange={(e)=> setPassword2(e.target.value)}/>
                    </Form.Group>
                    <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" disabled={isDisabled}>
                            Create
                    </Button>
                    </div>
                    </Form>   
                </Col>
            </Row>
        </Col>
	)

}

export default Register
