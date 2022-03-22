import React, { useState, useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate}  from 'react-router-dom'
import { Row, Col, Form, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductsDetails } from '../actions/productActions'
import '../Css/ProductScreen.css'
import ReactImageMagnify from 'react-image-magnify'


const ProductScreen = () =>
{
     const history = useNavigate()
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const num = useParams()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    
    useEffect(() => 
    {
    dispatch(listProductsDetails(num.id)) }, [dispatch, num.id]) 

    // eslint-disable-next-line
   
    const addToCartHandler = () => {
        history(`/cart/${num.id}?qty=${qty}`)}

        // eslint-disable-next-line

    //const product = products.find((p) => p._id === num.id)
    
    return(
        <>
        <Link className='btn btn-dark my-3' to='/'>
        Go Back
        </Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Row>
            <Col md={3} >
            <div className="perimeter">
             <div className="image"> 

              <ReactImageMagnify {...{
                  smallImage: {
                      value:'',
                    alt: product.name,
                    isFluidWidth: true,
                    src: product.image
                },
                  largeImage: {
                     src: product.image,
                     width: 800,
                     height: 744
                },
                isHintEnabled: true
                }} />
                </div>
                </div>
            </Col>
          
            <Col md={5} className='product-adj'>
                <ListGroup variant='flush' className='list-group'>
                <ListGroupItem>
                    <h3> {product.name}</h3>
                </ListGroupItem>
                    <Rating value = {product.rating} text={`${product.numReviews} reviews` }/>
                
                <ListGroupItem>
                    Price: ${product.price}
                </ListGroupItem>

                <ListGroupItem>
                    Description: ${product.description}
                </ListGroupItem>
                </ListGroup>
            </Col>

            <Col md={4} className="C-pad">
               <Card className='Cart' fluid> 
                <ListGroup variant='flush' className='cart-group'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Price:
                            </Col>

                            <Col>
                                <strong> ${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item className='list-group-3'>
                        <Row>
                            <Col>
                                Price:
                            </Col>

                            <Col>
                                {product.countInStock > 0 ? 'In stock' : 'Not in stock'} 
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0  && (
                    <ListGroupItem>
                        <Row>
                            <Col>Qty</Col>
                            <Col>
                            <Form>
                                
                                <input type= "number" min={1} max={product.countInStock} step={1} value={qty}
                            onChange = {(e) => setQty(e.target.value)} />
                
                              {/*   <option >Select</option>
                                {[...Array(product.countInStock).keys()].map((x) => (
                                    <option key= { x + 1} value= {x + 1}>
                                        { x + 1}
                                    </option>
                                    
                                )) */ } 
                            </Form>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    )}
                    <ListGroup.Item>
                        <Button 
                          onClick={addToCartHandler}
                          className='btn-block btnAdt'
                          type='Button'
                          disabled={product.countInStock === 0}  
                          > Add to Cart 
                        </Button> 
                    </ListGroup.Item>
            </ListGroup> 
            </Card>       
            </Col>

    </Row>
        )}
           
    </>
        
    ) 
                            

}

export default ProductScreen