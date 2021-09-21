import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Product from './Product';

function UserView({productData}){

	console.log(productData) //array of documents

    const [products, setProducts] = useState([]);

	useEffect( () => {
		const prodArr = productData.map( (product) => {
			console.log(product) //product document

			if(product.isActive === true){
				return <Product key={product._id} productProp={product}/>

			} 
		})
		setProducts(prodArr)
	}, [productData])

	
	return(
		<Container>
			{products}
		</Container>
	)
}
export default UserView
