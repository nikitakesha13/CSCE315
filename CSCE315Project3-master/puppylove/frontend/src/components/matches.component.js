import axios from "axios";
import React, {Component} from "react";

export default class Matches extends Component {
    constructor(props){
        super(props);

        this.onNext = this.onNext.bind(this);
        this.onRemove = this.onRemove.bind(this);

        this.state = {
            matches: [],
            counter: 0,
            dog: '',
            user: '',
            name: '',
            email: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/matches_user/' + localStorage.getItem('user-id'))
            .then(res => {
                console.log("matches: ", res.data.matches)
                this.setState({
                    matches: res.data.matches,
                    user: res.data.matches[0],
                });
                if (res.data.matches[0]){
                    axios.get('http://localhost:5000/users/' + res.data.matches[0].user_id)
                        .then(res => {
                            this.setState({
                                name: res.data.name,
                                email: res.data.email
                            });
                        });
                    var user = this.state.user.user_id;
                    console.log("starting user ", user);
                    axios.get('http://localhost:5000/dogs/' + user)
                        .then(res =>  { 
                            console.log("initial dog: ", res.data)
                            this.setState({
                                dog: res.data[0],
                            });
                            console.log("this dog: ", this.state.dog)
                        });
                }
            });
    }

    onNext() {
        let i = this.state.counter + 1;
        if (this.state.counter >= this.state.matches.length-1) {
            i = 0;
        }
        var user = this.state.matches[i].user_id;
        axios.get('http://localhost:5000/users/' + user)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email
                });
            });
        axios.get('http://localhost:5000/dogs/' + user)
            .then(res =>  { 
                console.log("users dogs: ", res.data)
                this.setState({
                    user: this.state.matches[i],
                    dog: res.data[0],
                    counter: i
                });
            });
    }

    onRemove(){
        const match = {
            matches: this.state.matches[this.state.counter],
            push: 'false'
        }
        axios.post('http://localhost:5000/users/update/' + localStorage.getItem('user-id'), match)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            });        
    }

    render() {
        // const matches = this.state.matches;
        console.log("The array ", this.state.matches);
        console.log("The counter ", this.state.counter);
        if (this.state.matches.length > 0) {
            return (
                <body>
                    <div>
                        <section className="vh-100">
                            <div className="container py-5 h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-12 col-md-10 col-lg-10 col-xl-6">
                                        <div className="card shadow-2-strong">
                                            <div className="card-body p-5 text-center">
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
                                                    Owner: {this.state.name}
                                                </div> 
                                                <div style={{paddingBottom: "20px"}} className="form-group">
                                                    CONTACT: {this.state.email}
                                                </div>
                                                <button type="button" className="btn btn-danger" onClick={this.onRemove}> Remove </button>
                                                <button type="button" className="btn btn-primary" onClick={this.onNext}> Next Match </button>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </body>
            );
        }
        else {
            return (
                <h3>There are no matches to display</h3>
            );
        }
    }
}