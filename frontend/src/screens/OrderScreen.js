import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'




const OrderScreen = () => {
    const num = useParams()
    const orderId = num.id

    const dispatch = useDispatch()
    const history = useNavigate()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    if (!loading)
    {
        //calculate prices 
order.itemsPrice = order.orderItems.reduce(
    (acc, item) => acc + item.price * item.qty, 
    0 
)

const addDecimals = (num) => 
{
     return (Math.round(num * 100) / 100 ).toFixed(2)
}

    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}
    </Message> : <>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong> {order.user.name}</p>
                        <p>
                        <strong>Email: </strong>
                            <a  href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Adress:</strong>
                            {order.shippingAdress.adress},
                            {order.shippingAdress.city},{' '},
                            {order.shippingAdress.postalCode}{' '},
                            {order.shippingAdress.country}
                        </p>

                        {order.isDelivered ? (
                        <Message variant='sucess'> Delivered on {order.deliveredAt}</Message> 
                    ):( <Message variant='danger'>Not delivered</Message> 
                    )}

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                        <Message variant='sucess'>Paid on {order.paidAt}</Message> 
                    ):( <Message variant='danger'>Not Paid</Message> 
                    )}
                    
                        </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ?
                            <Message> Your order is empty </Message>
                            : (
                                <div>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>

                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`} />
                                                    {item.name}
                                                </Col>
                                                <Col md={5}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}

                                                </Col>

                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </div>
                            )
                        }

                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup vairant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>               

                    </ListGroup>
                </Card>

            </Col>

        </Row>
    </>
}

export default OrderScreen 
