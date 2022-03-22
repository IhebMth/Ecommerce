import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector, } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () =>
{
    
    const dispatch = useDispatch()
    const history = useNavigate()
    const cart = useSelector(state => state.cart)
    const {shippingAdress} = cart

    if(!shippingAdress) {
        history('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    

     const submitHandler = (e) =>
     {
         e.preventDefault()
         dispatch(savePaymentMethod(paymentMethod))
         history('/placeorder')
        }

    return <FormContainer>
     <CheckoutSteps step1 step2 step3 />
        <br></br>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
        
        <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
        
        <Col>
        <Form.Check 
        type='radio' 
        label="Paypal" 
        id='Paypal' 
        name='paymentMethod'
        value='Paypal'
        checked onChange = {(e) => setPaymentMethod(e.target.value)}>  
        </Form.Check>

        <Form.Check 
        type='radio' 
        label="Credit Card" 
        id='CreditCard' 
        name='paymentMethod'
        value='Credit Card'
         onChange = {(e) => setPaymentMethod(e.target.value)}>

        </Form.Check>
        </Col>
       </Form.Group>
       <br></br>
       <Button type='submit' variant='primary'>
            Continue
        </Button>

        </Form>
        </FormContainer>
}

export default PaymentScreen
