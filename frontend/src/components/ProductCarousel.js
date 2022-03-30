import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import  {Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import '../Css/ProductCarousel.css'

const ProductCarousel = () => {
    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch] 
    )

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
    : (
        <Carousel  pause='hover'  style={{width:'100%', backgroundColor:"#363432"}}>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name}  />
                        
                        <Carousel.Caption className="carousel.caption" style={{paddingLeft: '400px', margin:'50px'}}>
                            <h2 >{product.name}</h2> 
                            <h2 >(${product.price})</h2>
                            </Carousel.Caption> 
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel