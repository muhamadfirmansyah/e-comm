import { useState } from 'react'
import CustomButton from '../custom-button/custom-button.component'
import FormInput from '../form-input/form-input.component'

import './sign-in.style.scss'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await auth.signInWithEmailAndPassword(email, password)

            setEmail('')
            setPassword('')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput type="email" label={"Email"} name='email' value={email} required id='email' handleChange={(e) => setEmail(e.target.value)} />
                <FormInput type="password" label={"Password"} name='password' value={password} required id='password' handleChange={(e) => setPassword(e.target.value)} />

                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" isGoogleSignIn={true} onClick={signInWithGoogle}>
                        {' '}
                        Sign In with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn