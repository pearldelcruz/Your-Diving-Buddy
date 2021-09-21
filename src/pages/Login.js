import React , {useState, useContext, useEffect} from 'react'

import UserContext from './../UserContext'
import {Redirect} from 'react-router-dom'

import {Form, Button, Col, Row} from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

    const {user, setUser} = useContext(UserContext);

    useEffect( () => {
		if(email !== '' && password !== '')
        {
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, password]);

   const login = (e) =>{
        e.preventDefault();

        fetch('https://gentle-wave-67856.herokuapp.com/api/users/login',
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email:email,
                    password:password
                })
            })
            .then(result => result.json())
            .then(result => {
                console.log(result) //result = user access token

                if(typeof result.access !== "undefined")
                    {
                        localStorage.setItem('token', result.access);
                        userInfo(result.access)
                    }
            })
    const userInfo = (token)=>{
        fetch('https://gentle-wave-67856.herokuapp.com/api/users/profile',
            {
                method: "GET",
                headers: {
                    "Authotization": `Bearer ${token}`
                }
            })
            .then(result => result.json())
            .then(result =>{
                console.log(result)
                setUser({
                    id: result._id,
                    isAdmin: result.isAdmin
                })

            })
         }
         setEmail('');
         setPassword('');
   }

    return (
        (user.id !== null)?
		 	<Redirect to="/"/>
		 	:
            <Col className="mt-5 p-3 justify-content-center">
                <Row className="justify-content-center">
                    <Col sm={true} md={3}>
                    <div className="mb-3 text-center"><h1>Login</h1></div>
                    <Form onSubmit={(e) => login(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            {/* <Form.Label>Email address</Form.Label> */}
                            <Form.Control type="email" placeholder="Email" value={email}
                            onChange={(e)=> setEmail(e.target.value) }/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control type="password" placeholder="Password" value={password}
                            onChange={(e)=> setPassword(e.target.value) }/>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isDisabled}>Submit</Button>
                    </Form>
                    </Col>
                </Row>
            </Col>
			 
     )
}

export default Login