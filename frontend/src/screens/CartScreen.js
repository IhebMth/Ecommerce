import React, { useEffect } from "react"
import  '../Css/CartScreen.css' 
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
const location = useLocation()
const num = useParams() 
const productId = num.id 
const qty = location.search ? Number(location.search.split('=')[1]) : 1
const dispatch = useDispatch()
const cart = useSelector((state) => state.cart)
const { cartItems } = cart
const history = useNavigate()
useEffect(() => 
{
    if (productId)
    {
       
        dispatch(addToCart(productId, qty))
    }
}, [dispatch, productId, qty,location])
    
const removeFromCartHandler = (id) => 
{
    dispatch(removeFromCart(id))
}

const checkoutHandler = () =>
{
    history('/login?redirect=shipping')
}

    
    return <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? <Message>Your cart is empty <Link to="/">Go Back</Link> </Message> : (
              <ListGroup variant='flush'>
                  {cartItems.map(item => (
                      <ListGroup.Item key = {item.product}>
                          <Row>
                              <Col md={2}>
                                  <Image src={item.image} alt={item.name} fluid rounded />
                                  </Col>
                                  
                                  <Col md={3}>
                                      <Link to= {`/product/${item.product}`}>{item.name}</Link>
                                  </Col>

                                  <Col md={2}>
                                      ${item.price}
                                  </Col>

                                  <Col md={2}> 
                                  <Form>
                                <input type= "number" min={1} max={item.countInStock} step={1} value={item.qty}
                                onChange = {(e) => dispatch(addToCart(item.product,
                                 Number(e.target.value))) } />
                                </Form>
                                  </Col>

                                  <Col md={2}>
                                      <Button type="button" className="btnTrash" variant='light' onClick={() =>
                                    removeFromCartHandler(item.product) }>
                                        <i className='fas fa-trash'/>
                                        </Button>  
                                    
                                  </Col>

                                 
                          </Row>
                      </ListGroup.Item>
                      
                  ))}

              </ListGroup>  
            )}
        </Col>

        <Col md={4}> 
                                  <Card className="Cart">
                                      <ListGroup variant='flush'>
                                          <ListGroupItem> 
                                              <h2>
                                                  Subtotal 
                                                  ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) 
                                                  items
                                                  </h2>
                                                  ({cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}) 
                                          </ListGroupItem>
                                          <ListGroupItem>
                                                <Button type='button' className="btn-block" disabled={ cartItems.length === 0 } onClick={checkoutHandler} >Proceed</Button>
                                                
                                        
                                          </ListGroupItem>
                                        
                                      </ListGroup>
                                  </Card>
                                  </Col>      
    </Row>
}

export default  CartScreen