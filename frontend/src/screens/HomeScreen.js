import React, {useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { Helmet } from 'react-helmet'
import {Row, Col,} from "react-bootstrap"
import { listProducts} from '../actions/productActions'
import { Link, useParams} from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
const HomeScreen = () =>
{
    const num = useParams()
   const dispatch = useDispatch()

    const keyword = num.keyword
    const pageNumber = num.pageNumber || 1  
       // show products
   const productList = useSelector(state => state.productList)
   const {loading, error, products, page, pages} = productList
    
   useEffect(() => 
    {
    dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
  

    return(
        <>
  <Meta />
        <h1> Latest products</h1>
        {loading ? (
        <Loader /> 
     ) : error ? ( 
     <Message variant='danger'>{error}</Message> 
     ) : products.length ?  ( 
        <>
        <Row> 
              
                {products.map((product) => ( 
            
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />

                    </Col>
            ))}
        </Row>
        <Paginate 
            pages={pages} 
            page={page} 
            keyword= {keyword ? keyword : ''}
            />
            
        </>
         ) : (
            
            <Message variant='danger'>there is no such product</Message> 
            
          
        )}
      
      {!keyword ? <ProductCarousel /> : 
      <Link to='/' className='btn btn-dark'>Go back</Link>
      }
        </> 
                
    )
} 


export default HomeScreen