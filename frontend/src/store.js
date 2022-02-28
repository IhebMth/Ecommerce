import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import  { addToCart } from './actions/cartActions'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})

const cartItemsFormStorage = localStorage.getItem('cartItems')
? JSON.parse(localStorage.getItem('cartItems')) : []


const initialState = {
    cart: {cartItems: cartItemsFormStorage}
}

const middleWare = [thunk]

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store