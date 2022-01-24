import React, { Component } from 'react';
import DogProfile from './dog-profile.component'
import axios from 'axios';

export default class Home extends Component {
    
    // This is for the dogs -----------------------
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);

        this.state = {
            array_of_dogs: [],
            breed_for: '',
            breed_group: '',
            height: '',
            image_height: 0,
            image_id: '',
            image_url: '',
            image_width: 0,
            life_span: '',
            name: '',
            origin: '',
            reference_image_id: '',
            temperament: '',
            weight: '',
          
            my_dogs: [],
            name: '',
            breed: '',
            age: '',
            size: ''

        }
    }

    onChangeName(e) {

        console.log("I changed the name");
        console.log(e.target.value);
        var image_id;

        if (e.target.value == "Select a breed") {
            this.setState({
                breed_for: '',
                breed_group: '',
                height: '',
                image_height: 0,
                image_id: '',
                image_url: '',
                image_width: 0,
                life_span: '',
                name: '',
                origin: '',
                reference_image_id: '',
                temperament: '',
                weight: ''
            })
        }
        else {
            fetch("https://api.thedogapi.com/v1/breeds/search?q=" + e.target.value)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data[0]);
                            image_id = data[0].reference_image_id;
                            console.log(image_id);
                            this.setState({
                                breed_for: data[0].bred_for,
                                breed_group: data[0].breed_group,
                                height: data[0].height,
                                life_span: data[0].life_span,
                                name: data[0].name,
                                origin: data[0].origin,
                                reference_image_id: data[0].reference_image_id,
                                temperament: data[0].temperament,
                                weight: data[0].weight
                            });
                            fetch("https://api.thedogapi.com/v1/images/" + image_id)
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                    this.setState({
                                        image_height: data.height,
                                        image_url: data.url,
                                        image_width: data.width
                                    });
                                });
                        });
        }
    }

    componentDidMount() {
        fetch("https://api.thedogapi.com/v1/breeds/")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    array_of_dogs: data.map(dog => dog.name)
                });
                console.log(this.state.array_of_dogs);
            });
        
        console.log("before the my dogs")
        console.log(localStorage.getItem('user-id'));
        axios.get('http://localhost:5000/dogs/' + localStorage.getItem('user-id'))
            .then(res => {
                console.log(res.data.name);
                this.setState({
                    my_dogs: res.data
                });
            })
    }

    render() {
        if (localStorage.getItem('user-id')){
            const breeds = this.state.array_of_dogs;
            const dogs = this.state.my_dogs;
            console.log('I did this');
            console.log(this.state.my_dogs)
            return (
                <div>
                    <div className='row'>
                        <div className='col'>
                            <h2 style={{textAlign: 'center'}}> Welcome to PuppyLove, {localStorage.getItem('user-name')}!</h2>
                            <h4> How to use PuppyLove </h4>
                            <p>
                                To begin, click the drop down menu from "Settings" and select "Dog Profile." When there, select "Add Dog" and enter in all relevant information
                                regarding your dog. Next, head to the browse page and look at all available dogs. If you feel like that dog is a good match, click "Like." If you
                                do not feel like it is a good match, select "Pass." If the other user likes your dog as well, then it will appear on the "Matches" page. You will
                                then be able to contact the user via email and set up a play date!
                            </p>
                            <h4> My Dogs </h4>
                            <div className="my-dogs">
                         {
                            this.state.my_dogs && this.state.my_dogs.length   && this.state.my_dogs.map((dog) => { return <div className="my-dog-profile"> {<DogProfile dog={dog}/>} </div> }
                            )}
                    </div>
                        </div>
                        <div className='col'>
                            <div>
                                <h2 style={{textAlign: 'center'}}> Find out some information on dogs! </h2>
                                <div style={{textAlign: 'center'}}>
                                    <select onChange={this.onChangeName}>
                                        <option value="Select a breed"> Select a breed </option>
                                        {breeds.map((breed) => <option value={breed}>{breed}</option>)}
                                    </select>
                                </div>
                                <div className="container">
                                    <h1> Name: {this.state.name}</h1>
                                    <h3> Average Lifespan: {this.state.life_span}</h3>
                                    <h3> Bred for: {this.state.breed_for}</h3>
                                    <h3> Breed group: {this.state.breed_group}</h3>
                                    <h3> Temperament: {this.state.temperament}</h3>
                                    <div style={{textAlign: 'center'}}>
                                        <img src={this.state.image_url} width="460" height="460" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            );
        }
        else {
            const breeds = this.state.array_of_dogs;
            console.log('No, I did this');
            return (
                <div>
                    <div className="row text-align center">
                        <h2 style={{fontSize: '50px', paddingBottom: '20px', textAlign: 'center'}}> Welcome to PuppyLove! </h2>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <h3 style={{textAlign: 'center'}}> About PuppyLove </h3>
                            <p style={{paddingLeft: '15px'}}>
                                PuppyLove is an online application that lets dog owners match up their dogs with other dogs in order to set up safe and
                                secure playdates. This application is mainly targeted towards college students in order to make the process of finding
                                similar dogs quicker and more efficient. This application also includes many accessability features in order to accomidate people
                                who are colorblind or cannot read too bright of screens.
                            </p>
                            <h3 style={{paddingLeft: '15px'}}> Created by: </h3>
                            <ul>
                                <li>
                                    Zachary Lawton
                                </li>
                                <li>
                                    Isabelle Rhoads
                                </li>
                                <li>
                                    Nikita Udodenko
                                </li>
                                <li>
                                    Isaiah Villagomez
                                </li>
                            </ul>
                        </div>
                        <div className='col'>
                            <div>
                                <h2 style={{textAlign: 'center'}}> Find out some information on dogs! </h2>
                                <div style={{textAlign: 'center'}}>
                                    <select onChange={this.onChangeName}>
                                        <option value="Select a breed"> Select a breed </option>
                                        {breeds.map((breed) => <option value={breed}>{breed}</option>)}
                                    </select>
                                </div>
                                <div className="container">
                                    <h1>Name: {this.state.name}</h1>
                                    <h3>Average Lifespan: {this.state.life_span}</h3>
                                    <h3>Bred for: {this.state.breed_for}</h3>
                                    <h3>Breed group: {this.state.breed_group}</h3>
                                    <h3>Temperament: {this.state.temperament}</h3>
                                    <div style={{textAlign: 'center'}}>
                                        <img src={this.state.image_url} width="460" height="460" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}