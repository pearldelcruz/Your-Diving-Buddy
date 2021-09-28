import React, { useEffect, useState } from 'react'
import { Col, Row, Table, Button, Modal, Form } from 'react-bootstrap'

import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import {MdArchive,MdUnarchive} from 'react-icons/md'
import '../../App.css'

import Swal from 'sweetalert2'

function AdminView(props) {


    const { productData, fetchData} = props;

    const [productId, setProductId] = useState('');
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

    const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);

    const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);

    let token = localStorage.getItem('token');

    const openEdit = (productId) => {
		fetch(`https://gentle-wave-67856.herokuapp.com/api/products/${productId}`,{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
		

			setProductId(result._id);
			setName(result.name);
			setDescription(result.description);
			setPrice(result.price)
		})

		setShowEdit(true);
	}

	const closeEdit = () => {

		setShowEdit(false);
		setName("")
		setDescription("")
		setPrice(0)
	}

	useEffect( () => {
		const prodArr = productData.map( (product) => {
			
			return(
				
				<tr key={product._id}>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td>
						{
							(product.isActive === true) ?
								<span>Available</span>
							:
								<span>Unavailable</span>
						}
					</td>
					<td>
						<>
							<Button variant="info" size="sm" className="mx-1 p-2" onClick={ () => openEdit(product._id) }><FaEdit/>{/* Edit */}</Button>
							<Button variant="danger" size="sm"  className="mx-1 p-2" onClick={ () => deleteToggle(product._id)}><FaTrashAlt/>{/* Delete */}</Button>
				
						</>

						{
							(product.isActive === true) ?
								<Button variant="warning" size="sm" className="mx-1 p-2" onClick={ () => archiveToggle(product._id, product.isActive)}><MdUnarchive/> {/* Archive */} </Button>
							:
								
								<Button variant="success" size="sm" className="mx-1 p-2" onClick={ () => unarchiveToggle(product._id, product.isActive)}>{/* Unarchive */}<MdArchive/></Button>
						}
					</td>
				</tr>
			)
		})

		setProducts(prodArr)
	}, [productData])

    //Edit product
    const editProduct = (e, productId) => {

		e.preventDefault()

		fetch(`https://gentle-wave-67856.herokuapp.com/api/products/${productId}/edit`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(result => result.json())
		.then(result => {
			

			fetchData()

			if(typeof result !== "undefined"){
				

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product has been updated"
				})

				closeEdit();
			} else {

				fetchData()

				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Oh-oh! Something went wrong. Please try again."
				})
			}
		})
	}

    //Archive product
    const archiveToggle = (productId, isActive) => {

		fetch(`https://gentle-wave-67856.herokuapp.com/api/products/${productId}/archive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			

			fetchData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					"text": "Product status has been updated"
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Failed",
					icon: "error",
					"text": "Oh-oh! Something went wrong. Please try again."
				})
			}
		})
	}
    //Unarchive
    const unarchiveToggle = (productId, isActive) => {
		fetch(`https://gentle-wave-67856.herokuapp.com/api/products/${productId}/unarchive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			

			fetchData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					"text": "Product status has been updated"
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Failed",
					icon: "error",
					"text": "Oh-oh! Something went wrong. Please try again."
				})
			}
		})
	}

    //Delete product
    const deleteToggle = (productId) => {
		fetch(`https://gentle-wave-67856.herokuapp.com/api/products/${productId}/delete`, 
		{
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			

			fetchData();
			if(result === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					"text": "Product has been deleted"
				})
			} else {
				fetchData();
				Swal.fire({
					title: "Failed",
					icon: "error",
					"text": "Oh-oh! Something went wrong. Please try again."
				})
			}
		})
	}

    const addProduct = (e) => {
		e.preventDefault()
		fetch('https://gentle-wave-67856.herokuapp.com/api/products/addProduct', 
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(result => result.json())
		.then(result => {
		

			if(typeof result !== 'undefined'){
				fetchData()

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "You have successfully added a product"
				})

				setName('');
				setDescription('');
				setPrice(0);

				closeAdd();

			} else {
				fetchData();

				Swal.fire({
					title: "Failed",
					icon: "error",
					text: "Oh-oh! Something went wrong. Please try again"
				})
			}
		})
	}

    return (
        <Col className="mt-5 p-3 justify-content-center">
            <Row className="justify-content-center">
                <Col sm={12} md={12} className="form-style-dashboard">
                    
                    <h2 className="text-center">Admin Dashboard</h2>   
					<div className="d-flex justify-content-end mb-3">
                        <Button variant="primary" onClick={openAdd}>Add New Product</Button>
                    </div>
                    <Table responsive="sm">
                        <thead className="text-center">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Availability</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*display the products*/}
                            {products}
                        </tbody>
                    </Table>
				{/*Edit product Modal*/}
                    <Modal show={showEdit} onHide={closeEdit}>
						<Form onSubmit={(e) => editProduct(e, productId)} >
						<Modal.Header>
						<Modal.Title>Edit Product</Modal.Title>
						</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="Name" >
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)} 
								/>
						</Form.Group>
						<Form.Group controlId="Description">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" rows={3}
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)} 
								/>
						</Form.Group>
						<Form.Group controlId="Price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								value={price}
								onChange={(e) => setPrice(e.target.value)} 
								/>
						</Form.Group>
					</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={closeEdit}>Close</Button>
							<Button variant="success" type="submit">Submit</Button>					
						</Modal.Footer>
						</Form>
					</Modal>
			{/*Add product Modal*/}
                <Modal show={showAdd} onHide={closeAdd}>
                    <Form onSubmit={(e)=> addProduct(e)}>
                        <Modal.Header>
                            <Modal.Title>Add Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
							<Form.Label>Product Name:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Product Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							</Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} 
                                    />
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)} 
                                    />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeAdd}>Close</Button>
                            <Button variant="success" type="submit">Submit</Button>					
                        </Modal.Footer>
                    </Form>
                </Modal>
	
                </Col>
            </Row>
        </Col>
    )
}

export default AdminView
