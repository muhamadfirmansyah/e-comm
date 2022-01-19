import './cart-icon.style.scss'

import { connect } from 'react-redux'

import { ReactComponent as ShopoingIcon } from '../../assets/shopping-bag.svg'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import { selectCartItemsCount } from '../../redux/cart/cart.selector'
import { createStructuredSelector } from 'reselect'

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={() => toggleCartHidden()}>
        <ShopoingIcon className='shopping-icon' />
        <span className='item-count'>
            {itemCount}
        </span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount // reduce always returning new value
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)