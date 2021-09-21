import React, { useEffect, useState } from 'react'
import { Col, Row, Table, Button, Modal, Form } from 'react-bootstrap'

import {GrUpdate} from 'react-icons/gr'
import {MdDeleteForever, MdArchive,MdUnarchive} from 'react-icons/md'

import Swal from 'sweetalert2'

function AdminView(props) {
    console.log(props)

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
			console.log(result)

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
			console.log(product)
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
							<Button variant="primary" size="sm" 
							onClick={ ()=> openEdit(product._id) }>
								<span className="p-1"><GrUpdate/></span>
							</Button>
								<span className="p-1"></span>
							<Button variant="danger" size="sm"
							onClick={ () => deleteToggle(product._id)}>
								<span className="p-1"><MdDeleteForever/></span>
							</Button>
							<span className="p-1"></span>
						</>

						{
							(product.isActive === true) ?
								<Button variant="warning" size="sm"
								onClick={()=> archiveToggle(product._id, product.isActive)}>
									<span className="p-1"><MdUnarchive/></span> 
									{/* Disable */}
								</Button>
							:
								
								<Button variant="success" size="sm"
								onClick={ () => unarchiveToggle(product._id, product.isActive)}>
									{/* Enable */}
									<span className="p-1"><MdArchive/></span>
								</Button>
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
			console.log(result) 

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
					text: "Product not updated. Please try again"
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
			console.log(result)

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
					"text": "Something went wrong"
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
			console.log(result)

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
					"text": "Something went wrong"
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
			console.log(result)

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
					"text": "Something went wrong"
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
			console.log(result)
			console.log(typeof result)

			if(typeof result !== 'undefined'){
				fetchData()

				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully added"
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
					text: "Something went wrong"
				})
			}
		})
	}

    return (
        <Col className="mt-5 p-3 justify-content-center">
            <Row className="justify-content-center">
                <Col sm={10} md={10}>
                    
                    <h2 className="text-center">Admin Dashboard</h2>
                    <div className="d-flex justify-content-end mb-3">
                        <Button variant="primary" onClick={openAdd}>Add New Product</Button>
                    </div>
                    

                    <Table>
                        <thead>
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
							<Form.Control
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
                            <Form.Group controlId="name" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                    />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
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
