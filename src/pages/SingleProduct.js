import React, { useEffect, useState, useContext } from 'react'
import { Col, Row, Card, Button, Container } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

function SingleProduct() {


	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0)

	const { user } = useContext(UserContext);
	const { productId } = useParams(); 
	let token = localStorage.getItem('token')

	let history = useHistory();

	useEffect( () => {
		fetch(`https://gentle-wave-67856.herokuapp.com/api/products/${productId}`,
			{
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			}
		)
		.then(result => result.json())
		.then(result => {
			console.log(result)

			setName(result.name);
			setDescription(result.description);
			setPrice(result.price);
		})
	}, [])

	const addCart = () => {
		fetch('https://gentle-wave-67856.herokuapp.com/api/users/addCart', 
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					productId: productId
				})
			}
		)
		.then(result => result.json())
		.then(result => {
			console.log(result)

			if(result === true){

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "You have successfully joined a program" 
				})

				history.push('/products');
			} else {
				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Oh-oh! Something went wrong. Please try again"
				})
			}
		})
	}

	return(
		<Container className="mt-5">
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Card>
						<Card.Header>
							<h6> {name} </h6>
						</Card.Header>
						<Card.Body>
							<Card.Text> {description} </Card.Text>
							<h6> Price: Php <span className="mx-2">{price}</span> </h6>
						</Card.Body>
						<Card.Footer>
							{
								(user.id !== null) ?
										<Button variant="primary" onClick={ () => addCart() }><span className="p-2"><FaShoppingCart/></span>Checkout</Button>
									:
										<Link className="btn btn-danger" to="/login"><span className="p-2"><FaShoppingCart/></span>Checkout</Link>
							}
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
	)

}

export default SingleProduct
