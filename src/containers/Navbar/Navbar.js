import React from 'react'
import './Navbar.css'
import logo from '../../assets/img/logo.jpg'
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import {NavLink} from 'react-router-dom'

const Navbar = (props) => {
    console.log(props)
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <NavLink 
                    className="navbar-brand logo_wrapper" 
                    to="/" exact>
                    <img className="logo" src={logo} alt="logo"/>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink 
                                className="nav-link" 
                                to="/usage">Usage</NavLink>
                        </li>
                        <li className="nav-item">
                            {props.isLoggedIn ? 
                                <NavLink 
                                    onClick={props.logout}
                                    className="nav-link" 
                                    to="/logout">Logout</NavLink> :  
                                <NavLink 
                                    className="nav-link" 
                                    to="/login">Login</NavLink>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.onLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
