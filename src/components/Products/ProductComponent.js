import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {Col, Row, Card} from 'react-bootstrap';
import './Product.css';

function ProductComponent({productProp}) {
	
	
	const {name, description, price, _id} = productProp

	
	return(
		
	<Col fluid>
		<Row>
			<Col className="container" sm={12}>
				<Card className="product-card">
					<Card.Body>
						<h3>{name}</h3>
						<h5>Description</h5>
						<p>{description}</p>
						<h5>Price:</h5>
						<p>{price}</p>
						<Link className="btn-style btn btn-primary" to={`/products/${_id}`}>
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

