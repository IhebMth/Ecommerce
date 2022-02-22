import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap' 
import Rating from './Rating'


const Product = ({product}) =>
{
    return (
        //< className='contact-card'>
        <div className="section_our_solution">
  <div className="row">
    <div className="col-lg-12 col-md-12 col-sm-12">
      <div className="our_solution_category">
        <div className="solution_cards_box">
          <div className="solution_card">
            <div className="hover_color_bubble"></div>

    <Card>
        <div className="c-img">
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top"  />
        </Link>
        </div>
        <Card.Body>
        <Link to={`/product/${product._id}`}>
        <Card.Title as='div'>
          <div className='product_title'>
        <strong>{product.name} </strong>
        </div>
        </Card.Title>
        </Link>

        <Card.Text as='div'>
            <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
           // color="red"
            />
        <div className='my-3'>
        {product.rating} from {product.numReviews} reviews
        </div>
        </Card.Text>
        <Card.Text as='h3'>${product.price}
        </Card.Text>
        </Card.Body>
        </Card>
        </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  
    )
    
}

export default Product 