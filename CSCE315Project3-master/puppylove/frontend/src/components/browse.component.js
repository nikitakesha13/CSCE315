import React, {Component} from "react";
import axios from 'axios';

export default class Browse extends Component {
    constructor(props) {
        super(props);

        this.onLike = this.onLike.bind(this);
        this.onPass = this.onPass.bind(this);

        this.state = {
            current_user: {
                city: localStorage.getItem('user-city'),
                USstate: localStorage.getItem('user-USstate'),
                matches: {
                    user_id: localStorage.getItem('user-id'),
                    dog_id: localStorage.getItem('dog-id')
                },
                push: "true"
            },
            user: {
                _id: '',
                name: '',
                email: ''
            },
            users: '',
            counter: 0,
            dog: '',
            image: ''
        }
    }

    componentDidMount() {

        if (localStorage.getItem('user-id')){
            axios.get("http://localhost:5000/users/browse/" + localStorage.getItem('user-id') + 
                        '/' + localStorage.getItem('user-city') + 
                        '/' + localStorage.getItem('user-USstate'))
            .then(res => {
                if (res.data.length > 0){
                    console.log(res.data);
                    this.setState({
                        users: res.data,
                        user: res.data[0],
                        counter: this.state.counter
                    });
                    var user = this.state.user._id;
                    console.log(user);
                    axios.get('http://localhost:5000/dogs/' + user)
                        .then(res =>  { 
                            console.log("initial dog: ", res.data)
                            this.setState({
                                dog: res.data[0],
                                image: res.data[0].image
                            });
                            console.log("this dog: ", this.state.dog)
                        });
                } else {
                    alert("There are currently no one to browse for");
                }
            });
        }
    }

    onLike() {

        const matches = {
            matches: {
                user_id: localStorage.getItem('user-id'),
                dog_id: localStorage.getItem('user-dog-id')
            },
            push: 'true'
        }
        
        axios.post("http://localhost:5000/users/update/" + this.state.user._id + "/", matches)
            .then(res => console.log(res.data));
        let count = this.state.counter + 1;
        if (this.state.counter >= this.state.users.length-1) {
            count = 0;
        }
        var user = this.state.users[count]._id;
        console.log(user);
        axios.get('http://localhost:5000/dogs/' + user)
            .then(res =>  { 
                console.log("users dogs: ", res.data)
                this.setState({
                    dog: res.data[0],
                    image: res.data[0].image,
                    user: this.state.users[count],
                    counter: count
                });
            });
    }

    onPass() {
        let count = this.state.counter + 1;
        if (this.state.counter >= this.state.users.length-1) {
            count = 0;
        }
        var user = this.state.users[count]._id;
        console.log(user);
        axios.get('http://localhost:5000/dogs/' + user)
            .then(res =>  { 
                console.log("users dogs: ", res.data)
                this.setState({
                    dog: res.data[0],
                    image: res.data[0].image,
                    user: this.state.users[count],
                    counter: count
                });
            });
    }

    render() {
        console.log(this.state.users);
        console.log("The length " + this.state.users.length);
        console.log("Current user " + this.state.user.name);
        console.log("The counter: " + this.state.counter)
        console.log("The dog in render: " + this.state.dog)
        // if (this.state.dog) {
        if (this.state.users.length > 0) {
            return (
                <body>
                    <section className="vh-100">
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-10 col-lg-10 col-xl-6">
                                    <div className="card shadow-2-strong">
                                        <div className="card-body p-5 text-center">
                                            <form>
                                            <h3 className="mb-5"> {this.state.dog.name} </h3>
                                                <div className="form-group">
                                                    Breed: {this.state.dog.breed}                         
                                                </div>
                                                <div className="form-group">
                                                    Age: {this.state.dog.age}                                       
                                                </div>
                                                <div className="form-group">
                                                    Size: {this.state.dog.size}                                        
                                                </div>
                                                <div className="form-group">
                                                    Activity: {this.state.dog.activity}                                        
                                                </div>
                                                <div className="form-group">
                                                    Aggression: {this.state.dog.aggression}                                        
                                                </div>
                                                <div className="form-group">
                                                    Potty Trained: {this.state.dog.potty}                                        
                                                </div>
                                                <div className="form-group">
                                                    UTD on vaccines: {this.state.dog.vaccine}                                       
                                                </div>
                                                <div style={{paddingBottom: "20px"}} className="form-group">
                                                    Bio: {this.state.dog.bio}                                        
                                                </div>
                                                <div className="form-group">
                                                    Owner: {this.state.user.name}
                                                </div>
                                                <div className="form-group">
                                                    Email: {this.state.user.email}
                                                </div>
                                                {/* <label>{this.state.image}</label> */}
                                                {/* <img src={`http://localhost:5000/public/${this.state.image}`} alt="..."/> */}
                                                <button type="button" className="btn btn-success" onClick={this.onLike}>Like</button>
                                                <button type="button" className="btn btn-danger" onClick={this.onPass}>Pass</button>
                                            </form>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </section>
                </body>
            );
        }
        else {
            return (
                <h2>There are currently no one to browse for</h2>
            );
        }
    }
}