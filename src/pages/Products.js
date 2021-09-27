import React, { useEffect,useContext, useState } from 'react';
import { Container } from 'react-bootstrap';

import AdminView from '../components/Products/AdminView';
import UserView from '../components/Products/UserView';

import UserContext from './../UserContext';

function Products() {

	const [products, setProducts] = useState([]);

	const {user} = useContext(UserContext);

	const fetchData = () => {
		let token = localStorage.getItem('token')

		fetch('https://gentle-wave-67856.herokuapp.com/api/products/allProducts',{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)
			setProducts(result)
		})
	}

	useEffect( () => {
		fetchData()
	}, [])
 
	return(
		<Container className="p-4">
			{ (user.isAdmin === true) ?
					<AdminView productData={products} fetchData={fetchData}/>
				:
					<UserView productData={products} />
			}
		</Container>
	)
}

export default Products
