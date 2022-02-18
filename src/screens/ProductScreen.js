import React from 'react'
import { Link, useParams }  from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../product'

const ProductScreen = () =>
{
    const num = useParams()
    
    const name= products[num.id-1].name
    const image= products[num.id-1].image
    const rating = products[num.id-1].rating
    const numReviews = products[num.id-1].numReviews
    const price = products[num.id-1].price
    const description = products[num.id-1].description
    const category = products[num.id-1].category
    
    //const product = products.find((p) => p._id === num.id-1)
    //const {name, image } = product;
    //console.log(product);
    
   // const product = products.find((p) => p.id === match.useParams.Number(id)) 
    return(
        <>
        <Link className='btn btn-dark my-3' to='/'>
        Go Back
        </Link>
           <Row>
          
            <Col md={4}>
            <Image src={image} alt={name} className="p-img" fluid/>
            </Col>
          
            <Col md={6}>
                <ListGroup variant='flush' className='list-group'>
                <ListGroupItem>
                    <h3> {name}</h3>
                </ListGroupItem>
                    <Rating value = {rating} text={`${numReviews} reviews` }/>
                
                <ListGroupItem>
                    Price: ${price}
                </ListGroupItem>

                <ListGroupItem>
                    Description: ${description}
                </ListGroupItem>
                </ListGroup>
            </Col>

            <Col md={3}>
                <ListGroup variant='flush'>


</ListGroup>        
            </Col>

    </Row>
    </>
        
    ) 
    

}

export default ProductScreen