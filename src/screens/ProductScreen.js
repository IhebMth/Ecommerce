import React from 'react'
import { Link, useParams }  from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../product'
import '../Css/ProductScreen.css'

const ProductScreen = () =>
{
    const num = useParams()
   
    const product = products.find((p) => p._id === num.id)
   
    return(
        <>
        <Link className='btn btn-dark my-3' to='/'>
        Go Back
        </Link>
           <Row>
          
            <Col md={3}>
            <Image src={product.image} alt={product.name} className="p-img" fluid/>
            </Col>
          
            <Col md={5}>
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

            <Col md={4}>
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

                    <ListGroupItem>
                        <Button className='btn-block' type='Button' disabled={product.countInStock === 0}  className='btnAdt'> Add to Cart 
                        </Button> 
                    </ListGroupItem>
            </ListGroup> 
            </Card>       
            </Col>

    </Row>
    </>
        
    ) 
    

}

export default ProductScreen