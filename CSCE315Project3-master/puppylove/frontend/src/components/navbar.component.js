import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        let buttons;

        if (localStorage.getItem('user-dog-id')){
            buttons = (
                <ul className="navbar-nav ms-auto">
                    <li className="navbar-item">
                        <Link to="/browse" className="nav-link">Browse</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/matches" className="nav-link">Matches</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> Settings </button>
                        <ul className="dropdown-menu">
                            <Link to="/accessibility" className="dropdown-item"> Accessibility </Link>
                        </ul>
                    </li>
                    <li className="navbar-item">
                        <Link to="/" onClick={() => {localStorage.clear(); window.location='/'}} className="nav-link">Logout</Link>
                    </li>  
                </ul>
                
            )
        }
        else {
            buttons = (
                <ul className="navbar-nav ms-auto">
                    <li className="navbar-item">
                        <Link to="/login" className="nav-link"> <i className="fa fa-fw fa-user"></i> Login </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create_user" className="nav-link">Create User</Link>
                    </li>  
                </ul>
            )
        }
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">PuppyLove</Link>
                <div className="collapse navbar-collapse">
                    { buttons}
                </div>
            </nav>
        );
        
    }
}