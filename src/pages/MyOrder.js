import React, { useEffect, useState } from 'react'
import { Col, Row, Table, Button } from 'react-bootstrap'
// import UserContext from '../UserContext'
import {MdPayment} from 'react-icons/md'
import '../App.css'


function MyOrder() {

   const orderArr = []
   const [orderList, setOrderList] = useState([])

    
    let token = localStorage.getItem('token')

useEffect( () => {
    fetch('https://gentle-wave-67856.herokuapp.com/api/users/myOrder', 
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => result.json())
        .then(result => {

            console.log(result)
            
            result.map((data)=>{
                console.log(data)

                orderArr.push(data);

                console.log(orderArr)

                const orders = orderArr.map((info)=>{
                    return(
                            
                        <tr key={info.productId}>
                            <td>{info.name}</td>
                            <td>{info.description}</td>
                            <td>{info.orderedOn}</td>
                            <td>{info.totalOrderValue}</td>
                        </tr>
                    )
                })
                setOrderList(orders)

            })
        })
}, [])

    return (

        <Col className="mt-5 p-3 justify-content-center">
            <Row className="justify-content-center">
                <Col sm={12} md={6} className="form-style-cart">
                    <div className="text-center" mb-3><h1>My Subscription</h1></div>
                    <Table responsive>
                    <thead className="text-center">
                    <tr>
                        <th>Product Name</th>
                        <th>Product Description</th>
                        <th>Date of Purchase</th>
                        <th>Purchase Price</th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                        {orderList}
                    </tbody>
                    </Table>
                    <div className="d-flex justify-content-end mt-5"><Button variant="warning" size="sm" className="mx-1 p-2"><MdPayment/> Proceed to payment </Button></div>
                </Col>
            </Row>
        </Col>
    )
}

export default MyOrder
