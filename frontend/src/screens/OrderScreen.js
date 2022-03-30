import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link,  useNavigate,  useParams } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails,  deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import '../Css/orderScreen.css'
 


const OrderScreen = () => {
    const num = useParams()
    const orderId = num.id

    const history= useNavigate()
    const dispatch = useDispatch() 
    

    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const {  success: successPay } = orderPay 

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    if (!loading) 
    {
        //calculate prices 
    order.itemsPrice = order.orderItems.reduce(
    (acc, item) => acc + item.price * item.qty, 
    0 
)

/*const addDecimals = (num) => 
{
     return (Math.round(num * 100) / 100 ).toFixed(2)
}*/

    }


    useEffect(() => {
        if (!userInfo)
        {
            history('/login')
        }
        if (!order || successPay || successDeliver){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
        dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, history, order, orderId, successDeliver, successPay, userInfo])

const deliverHandler = () => {
    dispatch(deliverOrder(order))
}

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
                        <Message variant='success'> Delivered on {order.deliveredAt}</Message> 
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
                        <Message variant='success'>Paid on {order.paidAt}</Message> 
                    ):( <Message variant='danger'>Not Paid</Message> 
                    )}
                    
                        </ListGroup.Item>
                            <Card>
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
                    </Card>
                </ListGroup>
            </Col>

            <Col md={4}>
  
                    <ListGroup vairant='flush'
                    style = {{border: "2px solid #0C3E35", marginTop:'100px'}}
                    >
                        
                        <ListGroup.Item 
                        
                        >
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
                                {loadingDeliver && <Loader />}     
                                {userInfo && userInfo.isAdmin && order.isPaid &&  !order.isDelivered && (
                                    <ListGroup.Item  className="delivered-btn">
                                        <Button type='button' 
                                        className="btn btn-block delivered-btn" 
                                        style={{margin: '28px', border: '2px solid black', borderRadius: '20px'}}
                                        onClick={deliverHandler} > 
                                            <b>Mark as Delivered</b>
                                        </Button>
                                    </ListGroup.Item>
                                
                                )}
                                
                    </ListGroup>
                   

            </Col>

        </Row>
    </>
}

export default OrderScreen 
