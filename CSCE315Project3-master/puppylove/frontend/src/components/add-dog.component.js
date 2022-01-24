import React, {Component} from 'react'
import RangeSlider from 'react-bootstrap-range-slider';
import axios from 'axios';


export default class AddDog extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            breeds: [],
            name: '',
            user_id: '',
            fixed: '',
            age: '',
            size: '',
            breed: '',
            activity: '',
            aggression: '',
            potty: '',
            vaccine: '',
            bio: ''
        }

    }

    componentDidMount() {
        return fetch("https://api.thedogapi.com/v1/breeds/")
        .then((res) => res.json())
        .then((data) => {
            // allBreeds = data.map(dog => dog.name)
            this.setState({
                breeds: data.map(breed => breed.name)
            });
            console.log(this.state.breeds);
        });
    };


    onSubmit(e) {
        e.preventDefault()
    
        if (!this.state.name) {
            alert('Please add dog')
        }
        else {
            axios.post('http://localhost:5000/dogs/add/', dog)
                .then(res => console.log(res.data));
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <h3 align="center">Add Dog</h3>
                    <div className="form-outline mb-4">
                        <input type="name"
                            id="name-info"
                            required
                            className="form-control form-control-lg"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className="form-outline mb-4">
                    <label className="dog-info-label">Breed</label>
                        <select onChange={(e) => setBreed(e.target.value)}>
                            <option value="Select a breed"> Select </option>
                            {allBreeds.map((breed) => 
                                <option value={breed}>{breed}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-outline mb-4">
                    <label className="dog-info-label">Age</label>
                        <select onChange={(e) => setAge(e.target.value)}>
                            <option value="Select">Select</option>
                            <option value="Puppy (0-2 years)">Puppy (0-2 years)</option>
                            <option value="Young (2-5 years)">Young (2-5 years)</option>
                            <option value="Adult (5-10 years)">Adult (5-10 years)</option>
                            <option value="Senior (10+ years)">Senior (10+ years)</option>
                        </select>
                    </div>
                    <div className="form-outline mb-4">
                    <label className="dog-info-label">Size</label>
                        <select label="Select Size" onChange={(e) => setSize(e.target.value)}>
                        <option value="Select">Select</option>
                            <option value="Small (0-20lbs)">Small (0-20lbs)</option>
                            <option value="Medium (21-50lbs)">Medium (21-50lbs)</option>
                            <option value="Large (51-90lbs)">Large (51-90lbs)</option>
                            <option value="X-Large (90+ lbs)">X-Large (90+ lbs)</option>
                        </select>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="dog-info-label">Activity Level</label>
                        <RangeSlider aria-label="Restricted values"
                            defaultValue={3}
                            step={null}
                            size='lg'
                            min='1'
                            max='5'
                            step='1'
                            valueLabelDisplay="auto"
                            onChange={(e) => setActivity(e.target.value)}
                            />
                    </div>
                    <div className="form-outline mb-4">
                        <label>Aggression Level</label>
                        <RangeSlider aria-label="Restricted values"
                            defaultValue={3}
                            step={null}
                            size='lg'
                            min='1'
                            max='5'
                            step='1'
                            valueLabelDisplay="auto"        
                            onChange={(e) => setAggression(e.target.value)}
                            />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="dog-info-label">Potty Trained?</label>
                        <select onChange={(e) => setPotty(e.target.value)}>
                        <option value="Select">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="dog-info-label">Fixed?</label>
                        <select onChange={(e) => setFixed(e.target.value)}>
                        <option value="Select">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="form-outline mb-4">
                    <label className="dog-info-label">Up to date on Vaccinations?</label>
                        <select onChange={(e) => setVaccinations(e.target.value)}>
                        <option value="Select">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="form-outline mb-4">
                    <label className="dog-info-label">Add Bio</label>:
                        <textarea onChange={(e) => setBio(e.target.value)} />
                    </div>
                    <div className="form-outline mb-4">
                    <label className="dog-info-label">Add Photo</label>:
                    </div>
                    <div className="form-btn">
                        <input type="submit" value="Add" className="btn btn-dark"/>
                    </div> 
                </form>
        </div>
        );
    }
    
}

export default AddDog