import React, {Component} from "react";
// import Dogs from "./dogs.component";
// import DogProfile from "./dog-profile.component";
import RangeSlider from 'react-bootstrap-range-slider';
import axios from 'axios';
import './style.css'


export default class DogSettings extends Component {
    
    constructor(props) {
        super(props);

        this.setName = this.setName.bind(this)
        // this.setUserID = this.setUserID.bind(this)
        this.setFixed = this.setFixed.bind(this)
        this.setBreed = this.setBreed.bind(this)
        this.setAge = this.setAge.bind(this)
        this.setSize = this.setSize.bind(this)
        this.setActivity = this.setActivity.bind(this)
        this.setAggression = this.setAggression.bind(this)
        this.setPotty = this.setPotty.bind(this)
        this.setVaccinations = this.setVaccinations.bind(this)
        this.setBio = this.setBio.bind(this)
        // this.setImage = this.setImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            allBreeds: [],
            name: '',
            user_id: localStorage.getItem('user-id'),
            fixed: '',
            breed: '',
            age: '',
            size: '',
            activity: '',
            aggression: '',
            potty: '',
            vaccine: '',
            bio: '',
            // image: ''
        }
    }

    setName(e) {
        this.setState({
            name: e.target.value
        });
    }
    setBreed(e) {
        this.setState({
            breed: e.target.value
        });
    }
    setFixed(e) {
        this.setState({
            fixed: e.target.value
        });
    }
    setAge(e) {
        this.setState({
            age: e.target.value
        });
    }
    setSize(e) {
        this.setState({
            size: e.target.value
        });
    }
    setActivity(e) {
        this.setState({
            activity: e.target.value
        });
    }
    setAggression(e) {
        this.setState({
            aggression: e.target.value
        });
    }
    setPotty(e) {
        this.setState({
            potty: e.target.value
        });
    }
    setVaccinations(e) {
        this.setState({
            vaccine: e.target.value
        });
    }
    setBio(e) {
        this.setState({
            bio: e.target.value
        });
    }
    // setImage(e){
    //     this.setState({
    //         image: e.target.files[0]
    //     });
    // }

    onSubmit (e) {
        e.preventDefault()

        // const formData = new FormData();
        // formData.append("name", this.state.name);
        // formData.append("user_id", this.state.user_id);
        // formData.append("fixed", this.state.fixed);
        // formData.append("age", this.state.age);
        // formData.append("size", this.state.size);
        // formData.append("breed", this.state.breed);
        // formData.append("activity", this.state.activity);
        // formData.append("aggression", this.state.aggression);
        // formData.append("potty", this.state.potty);
        // formData.append("vaccine", this.state.vaccine);
        // formData.append("bio", this.state.bio);
        // formData.append("image", this.state.image);

        const formData = {
            name: this.state.name,
            user_id: localStorage.getItem('user-id'),
            fixed: this.state.fixed,
            breed: this.state.breed,
            age: this.state.age,
            size: this.state.size,
            activity: this.state.activity,
            aggression: this.state.aggression,
            potty: this.state.potty,
            vaccine: this.state.vaccine,
            bio: this.state.bio,
        };
    
    
        console.log(formData)
        axios.post('http://localhost:5000/dogs/add', formData)
            .then(res => {
                console.log(res.data._id);
                localStorage.setItem('user-dog-id', res.data._id);
                this.setState ({
                    name: '',
                    fixed: '',
                    breed: '',
                    age: '',
                    size: '',
                    activity: '',
                    aggression: '',
                    potty: '',
                    vaccine: '',
                    bio: '',
                    // image: ''
                });
                const dog_id = {
                    dog_id: res.data._id
                };
                axios.post('http://localhost:5000/users/update/' + localStorage.getItem('user-id'), dog_id)
                    .then(res => {
                        console.log(res.data);
                        // localStorage.setItem('user-dog-id', res.data.dog_id);
                    });
                window.location = '/';
                
            })
            .catch(err => {
                console.log(err);
                alert("Please complete form");
                this.setState ({
                    name: '',
                    fixed: '',
                    breed: '',
                    age: '',
                    size: '',
                    activity: '',
                    aggression: '',
                    potty: '',
                    vaccine: '',
                    bio: '',
                    // image: ''
                });
            });
            // formData.delete("name");
                // formData.delete("user_id");
                // formData.delete("fixed");
                // formData.delete("age");
                // formData.delete("size");
                // formData.delete("breed");
                // formData.delete("activity");
                // formData.delete("aggression");
                // formData.delete("potty");
                // formData.delete("vaccine");
                // formData.delete("bio");
                // formData.delete("image");
    }

    componentDidMount() {
        fetch("https://api.thedogapi.com/v1/breeds/")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    allBreeds: data.map(dog => dog.name)
                });
                console.log(this.state.allBreeds);
            });
    }

    render() {
        const breeds = this.state.allBreeds;
        return (
            <div>
                <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong">
                                <div className="card-body p-5">
                                {/* <form onSubmit={this.onSubmit} encType="multipart/form-data"> */}
                                <form onSubmit={this.onSubmit}>
                                    <h3 align="center">Add Dog</h3>
                                    <div className="form-outline mb-4">
                                        <input type="name"
                                            id="name-info"
                                            required
                                            className="form-control form-control-lg"
                                            placeholder="Name"
                                            value={this.state.name}
                                            onChange={this.setName} 
                                        />
                                        {/* <label className="info-label" for="name-info">Name</label> */}
                                    </div>
                                    <div style={{width: '100%'}} className="form-outline mb-4">
                                    <label className="dog-info-label">Breed</label>
                                        <select style={{width: '300px'}} defaultValue="Select" onChange={this.setBreed}>
                                            <option value="Select a breed"> Select </option>
                                            {breeds.map((breed) => 
                                                <option value={breed}>{breed}</option>
                                            )}
                                        </select>

                                        {/* <label className="info-label" for="email-info">Email</label> */}
                                    </div>
                                    <div className="form-outline mb-4">
                                    <label className="dog-info-label">Age</label>
                                        <select style={{width: '300px'}} defaultValue="Select"onChange={this.setAge}>
                                            <option value="Select">Select</option>
                                            <option value="Puppy (0-2 years)">Puppy (0-2 years)</option>
                                            <option value="Young (2-5 years)">Young (2-5 years)</option>
                                            <option value="Adult (5-10 years)">Adult (5-10 years)</option>
                                            <option value="Senior (10+ years)">Senior (10+ years)</option>
                                        </select>
                                        {/* <label className="info-label" for="password-info">Password</label> */}
                                    </div>
                                    <div style={{width: '500px'}} className="form-outline mb-4">
                                    <label className="dog-info-label">Size</label>
                                        <select style={{width: '300px'}} defaultValue="Select" label="Select Size" onChange={this.setSize}>
                                        <option value="Select">Select</option>
                                            <option value="Small (0-20lbs)">Small (0-20lbs)</option>
                                            <option value="Medium (21-50lbs)">Medium (21-50lbs)</option>
                                            <option value="Large (51-90lbs)">Large (51-90lbs)</option>
                                            <option value="X-Large (90+ lbs)">X-Large (90+ lbs)</option>
                                        </select>
                                        {/* <label className="info-label" for="password-info">Password</label> */}
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="dog-info-label">Activity Level</label>
                                        <RangeSlider style={{width: '300px'}} aria-label="Restricted values"
                                            defaultValue={0}
                                            size='lg'
                                            min='1'
                                            max='5'
                                            step='1'
                                            valueLabelDisplay="auto"
                                            onChange={this.setActivity}
                                            />
                                        {/* <label className="info-label" for="password-info">Password</label> */}
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="dog-info-label">Aggression Level</label>
                                        <RangeSlider style={{width: '300px'}} aria-label="Restricted values"
                                            defaultValue={0}
                                            size='lg'
                                            min='1'
                                            max='5'
                                            step='1'
                                            valueLabelDisplay="auto"        
                                            onChange={this.setAggression}
                                            />
                                        {/* <label className="info-label" for="password-info">Password</label> */}
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="dog-info-label">Potty Trained?</label>
                                        <select style={{width: '300px'}} defaultValue="Select" onChange={this.setPotty}>
                                        <option value="Select">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        {/* <label className="info-label" for="password-info">Password</label> */}
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="dog-info-label">Fixed?</label>
                                        <select style={{width: '300px'}} defaultValue="Select" onChange={this.setFixed}>
                                        <option value="Select">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        {/* <label className="info-label" for="password-info">Password</label> */}
                                    </div>
                                    <div className="form-outline mb-4">
                                    <label className="dog-info-label">Up to date on Vaccinations?</label>
                                        <select style={{paddingLeft: '30px', width: '300px'}} defaultValue="Select" onChange={this.setVaccinations}>
                                        <option value="Select">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        {/* <label className="info-label" for="password-info">Password</label> */}
                                    </div>
                                    <div className="form-outline mb-4">
                                    <label className="dog-info-label">Add Bio</label>:
                                        <textarea style={{width: '300px'}} onChange={this.setBio} />
                                    </div>
                                    {/* <div className="form-outline mb-4">
                                    <label className="dog-info-label">Add Photo</label>:
                                        <input type="file" filename="image" onChange={this.setImage} />
                                    </div> */}
                                    <div className="form-btn">
                                        <input type="submit" value="Add" className="btn btn-dark"/>
                                    </div> 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );}
}