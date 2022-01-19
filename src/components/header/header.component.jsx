import './header.style.scss'

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { Link } from 'react-router-dom'

import { auth } from '../../firebase/firebase.utils'

import { connect } from 'react-redux'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import { selectCartHidden } from '../../redux/cart/cart.selector'
import { selectCurrentUser } from '../../redux/user/user.selector'

import { createStructuredSelector } from 'reselect'

const Header = ({ currentUser, hidden }) => {
    return (
        <div className='header'>
            <Link className='logo-container' to={"/"}>
                <Logo className='logo' />
            </Link>
            <div className="options">
                <Link className='option' to={"/shop"}>Shop</Link>
                <Link className='option' to={"/contact"}>Contact</Link>
                {currentUser ? (
                    <div className='option' onClick={() => auth.signOut()}>Sign Out</div>
                ) : (
                    <Link className='option' to={"/signin"}>Sign In</Link>
                )}
                <CartIcon />
            </div>
            {
                !hidden && (
                    <CartDropdown />
                )
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)