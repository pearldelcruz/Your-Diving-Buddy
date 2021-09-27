import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {Col, Row, Card} from 'react-bootstrap';

function ProductComponent({productProp}) {
	
	console.log(productProp)
	const {name, description, price, _id} = productProp

	// console.log(_id)
	
	return(
		
	<Col>
		<Row>
			<Col fluid sm={12}>
				
				<Card className="mb-3">
					<Card.Body>
						<Card.Title>{name}</Card.Title>
						<h6>Description</h6>
						<p>{description}</p>
						<h5>Price:</h5>
						<p>{price}</p>
						<Link className="btn btn-primary" to={`/products/${_id}`}>
							Details
						</Link>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	</Col>
	)
}
ProductComponent.propTypes = {
	product: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}
export default ProductComponent

