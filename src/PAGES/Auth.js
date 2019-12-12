import React, {useRef, useState} from 'react'
import './Auth.css';
import {connect} from 'react-redux';
import * as actions from '../store/actions'
import {withRouter} from 'react-router-dom'

// IMG SRC
import bg from '../assets/img/bg.jpg'
import user from '../assets/img/user.png'

const Auth = (props) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(false)

    const onAuthHandler = () => {
        const re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
        const pass = password.trim()
        if(re.test(email) && pass.length >= 6) {
            console.log('worked')
            emailRef.current.classList.remove('is-invalid')
            passwordRef.current.classList.remove('is-invalid')
            const data = {
                email,
                password,
                returnSecureToken: true
            }
            const key = 'AIzaSyARsnED08tGiAs4atKRai4jHqoCZ0qGI8w'
            const url = register ? 
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${key}` : 
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${key}`

            props.onAuthAsync(url, data, register, props.history)
        } else {
            if(!re.test(email)) emailRef.current.classList.add('is-invalid')
            if(pass.length !== 6) passwordRef.current.classList.add('is-invalid')
        }
    }

    const onRegisterHandler = () => {
        const prevRegis = register
        setRegister(!prevRegis)
    }
        
    return ( 
        <div 
            className="Auth d-flex justify-content-center align-items-center" 
            style={{backgroundImage: `url(${bg})`}}>
            <div className="card">
                <div className="card-body">
                    <img src={user} alt="user"/>
                    <h3 className="card-title">{register? "Register New Account" :  "Log In"}</h3>
                    <p className="Auth_Error">{props.error}</p>
                    <form className="mb-5">
                        <div className="form-group mb-4">
                            <label htmlFor="exampleInputEmail2">Email address: </label>
                            <input 
                                ref={emailRef}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" 
                                className="form-control" 
                                id="exampleInputEmail2" 
                                aria-describedby="emailHelp" 
                                placeholder="Enter Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input 
                                ref={passwordRef}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" 
                                className="form-control" 
                                id="exampleInputPassword1" 
                                placeholder="Password" />
                            <div className="invalid-feedback">
                                Enter 6 Charters At Least
                            </div>
                        </div>
                    </form>
                    <div className="text-center">
                        <button 
                            onClick={() => onAuthHandler()}
                            className="card-link btn btn-success mb-5">Submit</button>
                        <button 
                            onClick={onRegisterHandler}
                            className="card-link btn btn-warning btn-block d-flex align-items-center justify-content-center">
                            {register ? "Log In" : "Register"}
                            <i className="fas fa-arrow-circle-right ml-3"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.error
})

const mapDispatchToProps = dispatch => ({
    onAuthAsync: (url, data, register, history) => dispatch(actions.onAuthAsync(url, data, register, history))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth))