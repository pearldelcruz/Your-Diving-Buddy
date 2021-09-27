import React, {useContext, useEffect, useState} from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useHistory, Redirect } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

function AddProduct() {

	const { user } = useContext(UserContext);
	const history = useHistory();
	

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [isActive, setIsActive] = useState(true);

	let token = localStorage.getItem('token')


	useEffect(()=>{

		if(name !== '' && description !== '' && price !== 0){
			setIsActive(true);
		}else{
			setIsActive(false);
		}

	}, [name, description, price]);


	function addProduct(e){

		e.preventDefault();

		fetch('https://gentle-wave-67856.herokuapp.com/api/products/addProduct', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

			if(data === true){

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "You have succcessfully added a product"
				})

				history.push('/products');

			} else {

				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Oh-oh! Something went wrong. Please try again."
				})

			}
		})

		setName('');
		setDescription('');
		setPrice(0);

	};


	return (
		
		(user.id === null || user.isAdmin === null || user.isAdmin !== true) ? 

		<Redirect to="/login" />
		:
		<Col className="mt-5 p-3 justify-content-center">
			<Row className="justify-content-center">
				<Col sm={12} md={4}>
					<div className="text-center"><h1>Add Product</h1></div>
					
						<Form onSubmit={ e => addProduct(e)}>
						
						<Form.Group>
							<Form.Label>Product Name:</Form.Label>
							<Form.Control type="text" placeholder="Enter Product Name" value={name} onChange={(e) => setName(e.target.value)}/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Description:</Form.Label>
							<Form.Control as="textarea" rows={3} type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
						</Form.Group>
					    
						<Form.Group>
							<Form.Label>Price:</Form.Label>
							<Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
						</Form.Group>

						{ 
							(isActive === true) ? 
								<Button type="submit" variant="primary">Submit</Button>
							:
								<Button type="submit" variant="primary" disabled>Submit</Button>
						}
						
					</Form>
				</Col>
			</Row>
		</Col>
		
	)
}

export default AddProduct

