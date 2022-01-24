import React, {Component} from "react";
import axios from 'axios';

export default class LogIn extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
        }
    }


    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password }
        
        console.log(user);

        axios.post('http://localhost:5000/users/login/', user)
            .then(res => {
                if (res.data.length > 0){
                    localStorage.setItem('user-id', res.data[0]._id);
                    localStorage.setItem('user-name', res.data[0].name);
                    localStorage.setItem('user-city', res.data[0].city);
                    localStorage.setItem('user-USstate', res.data[0].USstate);
                    localStorage.setItem('user-dog-id', res.data[0].dog_id);
                    window.location = '/';
                }
                else {
                    alert("Wrong usename or password");
                }
            });
        
        this.setState({
            email: '',
            password: '',
        })
        
    }
    render() {
        return (
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong">
                        <div className="card-body p-5 text-center">
                                <h3 className="mb-5">Log In</h3>
                                <form onSubmit={this.onSubmit}>

                                    <div className="form-outline mb-4">
                                        <input type="email"
                                            id="email-info"
                                            required
                                            className="form-control form-control-lg"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail} />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password"
                                            id="password-info"
                                            required
                                            className="form-control form-control-lg"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.onChangePassword} />
                                    </div>

                                    <div className="form-btn">
                                        <input type="submit" value="Log In" className="btn btn-primary" />
                                    </div>
                                </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}