import React, {Component} from "react";
import axios from 'axios';

export default class CreateUsers extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeUSState = this.onChangeUSState.bind(this);
        this.onChangeZip = this.onChangeZip.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            states: [],
            name: '',
            email: '',
            password: '',
            confirm: '',
            street: '',
            city: '',
            USstate: '',
            zip: ''
        }
        
    }

    componentDidMount() {
        fetch("https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    states: data.map(state => state.abbreviation)
                });
            });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
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

    onChangeConfirmPassword(e) {
        this.setState({
            confirm: e.target.value
        });
    }

    onChangeStreet(e) {
        this.setState({
            street: e.target.value
        });
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onChangeUSState(e) {
        this.setState({
            USstate: e.target.value
        });
    }

    onChangeZip(e) {
        this.setState({
            zip: e.target.value
        });
    }

    onSubmit(e) {

        e.preventDefault();

        const { password, confirm } = this.state;

        if (password !== confirm) { 
            alert("Passwords do not match") 
            this.setState({
                password: '',
                confirm: ''
            })
        }

        else {
            var addr = this.state.street + " " + this.state.city + " " + this.state.USstate + " " + this.state.zip;
            console.log(addr);
            const SmartyStreetSDK = require("smartystreets-javascript-sdk");
            const SmartyStreetsCore = SmartyStreetSDK.core;
            const Lookup = SmartyStreetSDK.usStreet.Lookup;
            let authId = "00b02f32-f575-2144-8c8f-dbcc5e433f10";
            let authToken = "q1WvuJPxrkgBUltBFVT8"
            const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);
            let client = SmartyStreetsCore.buildClient.usStreet(credentials);
            let lookup = new Lookup(addr);

            const name = this.state.name;
            const email = this.state.email;
            const password = this.state.password;

            client.send(lookup)
                .then(handleSuccess)
                .catch(handleError);
            
            // console.log(lookup.city + " " + lookup.state);

            function handleSuccess(response) {
                var result = response.lookups[0].result[0];
                console.log(result);
                console.log("Address: " + result.lastLine);
                const city = result.components.cityName;
                const state = result.components.state;
                const street = result.components.streetName;
                const zip = result.components.zipCode;
                console.log(city + state + street + zip);
                var lat = result.metadata.latitude;
                console.log("Latitude: " + lat);
                var long = result.metadata.longitude;
                console.log("Longitude: " + long);

                const user = {
                    name: name,
                    email: email,
                    password: password,
                    street: street,
                    city: city,
                    USstate: state,
                    zip: zip
                }

                console.log(user);
                axios.post('http://localhost:5000/users/add/', user)
                    .then(res => {
                        console.log(res.data);
                        localStorage.setItem('user-id', res.data._id);
                        localStorage.setItem('user-name', res.data.name);
                        localStorage.setItem('user-city', res.data.city);
                        localStorage.setItem('user-USstate', res.data.USstate);
                        console.log(localStorage.getItem('user-id'));
                        window.location = '/dogsettings';
                    });
            }

            function handleError(response) {
                console.log("ERROR: " + response);
                alert("Address Does Not Exist");
                this.setState({
                    street: '',
                    city: '',
                    USstate: '',
                    zip: ''
                });
            }

            this.setState({
                name: '',
                email: '',
                password: '',
                confirm: '',
                street: '',
                city: '',
                USstate: '',
                zip: ''
            });

            // window.location = '/dogsettings';

        }
    }

    render() {
        const states_array = this.state.states;

        return (
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong">
                        <div className="card-body p-5 text-center">
                                <h3 className="mb-5">Create User</h3>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-outline mb-4">
                                        <input type="name"
                                            id="name-info"
                                            required
                                            className="form-control form-control-lg"
                                            placeholder="Name"
                                            value={this.state.name}
                                            onChange={this.onChangeName} />
                                    </div>
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
                                    <div className="form-outline mb-4">
                                        <input type="password"
                                            id="confirm-password-info"
                                            required
                                            className="form-control form-control-lg"
                                            placeholder="Confirm Password"
                                            value={this.state.confirm}
                                            onChange={this.onChangeConfirmPassword} />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="street"
                                                id="street-info"
                                                required
                                                className="form-control form-control-lg"
                                                placeholder="Street Address"
                                                value={this.state.street}
                                                onChange={this.onChangeStreet}/>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <div className='row'>
                                            <div className='col'>
                                                <input type="city"
                                                    id="city-info"
                                                    required
                                                    className="form-control form-control-lg"
                                                    placeholder="City"
                                                    value={this.state.city}
                                                    onChange={this.onChangeCity} />
                                            </div>
                                            <div className='col'>
                                                <select className="form-select form-select-lg" onChange={this.onChangeUSState}>
                                                    <option value="Select State"> State </option>
                                                    {states_array.map((USstate) => <option value={USstate}>{USstate}</option>)}
                                                </select>
                                                
                                            </div>
                                            <div className='col'>
                                                <input type="zip"
                                                    id="zip-info"
                                                    maxLength="5"
                                                    required
                                                    className="form-control form-control-lg"
                                                    placeholder="Zip Code"
                                                    value={this.state.zip}
                                                    onChange={this.onChangeZip} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-btn">
                                        <input type="submit" value="Create Account" className="btn btn-primary" />
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