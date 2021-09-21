import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap';

function Product(productProp) {
    console.log(productProp) //product document

    const {name, description, price, _id} = productProp
	
		return 
		(
			
			<Card className="mb-3">
				<Card.Body>
				<Card.Title>{name}</Card.Title>
					<h6>Description</h6>
					<p>{description}</p>
					<h6>Price:</h6>
					<p>{price}</p>
					
				<Link className="btn btn-sucess" to={`/products/${_id}`}>
					Details
				</Link>
				</Card.Body>
			</Card>
		
		)
}
export default Product

Product.propTypes = {
	product: PropTypes.shape({
	    name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
	})
}


