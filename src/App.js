import { Navigate, Route, Routes } from 'react-router-dom';

import { connect } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'

import './App.css'

// Pages
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// Components
import Header from './components/header/header.component';

// Config
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import React from 'react';

import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selector';
import CheckoutPage from './pages/checkout/checkout.component';

const NotFound = () => (<h1>404 &mdash; Not Found</h1>)



class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
    //   this.setState({ currentUser: user })

    //   createUserProfileDocument(user);

    //   // console.log(user)
    // })

    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => { // waching changes of data (subscribe)
          // console.log(snapShot.data())
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }) // because setState asyncronously
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {

    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/signin" element={this.props.currentUser ? <Navigate to={"/"} /> : <SignInAndSignUpPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);