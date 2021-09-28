import React, { useEffect, useState, useContext } from 'react'
import { Card, Button, Container } from 'react-bootstrap';
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
	}, [token, productId])

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
					<Card>
						<Card.Body>
							<h3>{name}</h3>
							<h5>Description</h5>
							<p>{description}</p>
							<h5>Price:</h5>
							<p>{price}</p>
						</Card.Body>

						<Card.Footer>
							{
								(user.id !== null) ?
										<Button variant="primary" onClick={ () => addCart() }><span className="p-2"><FaShoppingCart/></span>Checkout</Button>
									:
										<Link className="btn btn-danger btn-2" to="/login"><span className="p-2"><FaShoppingCart/></span>Checkout</Link>
							}
						</Card.Footer>
					</Card>
		</Container>
	)

}
export default SingleProduct
