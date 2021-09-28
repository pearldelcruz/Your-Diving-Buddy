import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import ProductComponent from './ProductComponent';

function UserView({productData}){

	

	const [products, setProducts] = useState([])

	useEffect( () => {
		const prodArr = productData.map( (product) => {
			
			if(product.isActive === true){
				return <ProductComponent key={product._id} productProp={product}/>
			} else {
				return null
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