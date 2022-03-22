import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector, } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { SaveShippingAdress } from '../actions/cartActions'

const ShippingScreen = () =>
{
    const cart = useSelector(state => state.cart)
    const {shippingAdress} = cart

    const [adress, setAdress] = useState(shippingAdress.adress)
    const [city, setCity] = useState(shippingAdress.city)
    const [postalCode, setPostalCode] = useState(shippingAdress.postalCode)
    const [country, setCountry] = useState(shippingAdress.country)
    
    const dispatch = useDispatch()
    const history = useNavigate()

     const submitHandler = (e) =>
     {
         e.preventDefault()
         dispatch(SaveShippingAdress({adress, city, postalCode, country}))
         history('/payment')
        }

    return <FormContainer>
     <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='adress'>
           
            <Form.Label>Adress</Form.Label>
            <br></br>
            <Form.Control 
            type="text"
            placeholder="enter your adress"
            value={adress}
            required
            onChange= {(e) => setAdress(e.target.value)} >
            </Form.Control>  
        </Form.Group>
        <br></br>
        <Form.Group controlId='city'>
           
           <Form.Label>City</Form.Label>
           <br></br>
           <Form.Control 
           type="text"
           placeholder="enter your city"
           value={city}
           required
           onChange= {(e) => setCity(e.target.value)} >
           </Form.Control>
           <br></br>
         </Form.Group>
         <Form.Group controlId='postalCode'>
           
           <Form.Label>postal Code</Form.Label>
           <br></br>
           <Form.Control 
           type="number"
           placeholder="enter your postal Code"
           value={postalCode}
           required
           onChange= {(e) => setPostalCode(e.target.value)} >
           </Form.Control>
           <br></br>
       </Form.Group>

       <Form.Group controlId='country'>
           
           <Form.Label>Country</Form.Label>
           <br></br>
           <Form.Control 
           type="text"
           placeholder="enter your country"
           value={country}
           required
           onChange= {(e) => setCountry(e.target.value)} >
           </Form.Control>
       
       </Form.Group>
         <br></br>
       <Button type='submit' variant='primary'>
            Continue
        </Button>

        </Form>
        </FormContainer>
}

export default ShippingScreen