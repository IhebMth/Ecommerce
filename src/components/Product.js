import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap' 
import Rating from './Rating'

const Product = ({product}) =>
{
    return (
        //< className='contact-card'>
        <div class="section_our_solution">
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div class="our_solution_category">
        <div class="solution_cards_box">
          <div class="solution_card">
            <div class="hover_color_bubble"></div>

    <Card>
        <div className="c-img">
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant="top"  />
        </Link>
        </div>
        <Card.Body>
        <Link to={`/product/${product._id}`}>
        <Card.Title as='div'>
        <strong>{product.name} </strong>
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