import './cart-dropdown.style.scss'

import { connect } from 'react-redux'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

import { selectCartItems } from '../../redux/cart/cart.selector'
import { createStructuredSelector } from 'reselect'
import { useNavigate } from 'react-router-dom'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

const CartDropdown = ({ cartItems, dispatch }) => {

    const navigate = useNavigate()

    return (
        <div className='cart-dropdown'>
            <div className="cart-items">
                {
                    cartItems.length > 0 ?
                        (
                            cartItems.map(cartItem => (
                                <CartItem key={cartItem.id} item={cartItem} />
                            ))
                        ) : (
                            <span className='empty-message'>Your cart is empty</span>
                        )
                }
            </div>
            <CustomButton onClick={() => { navigate('/checkout'); dispatch(toggleCartHidden()) }}>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default connect(mapStateToProps)(CartDropdown)