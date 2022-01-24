import DogProfile from "./dog-profile.component";
import axios from 'axios';
import React, {Component} from "react";

export default class myDogs extends Component {
    constructor(props) {
        super(props);

        this.state  = {
            myDogs: []
        }
    }

    // componentDidMount() {
    //     console.log("I am in get my dogs")
    //     axios.get('http://localhost:5000/dogs/' + localStorage.getItem('user-id'))
    //     .then(res => {
    //         console.log(res.data);
    //         this.setState({
    //             my_dogs: res.data
    //         });
    //     })
    // }

    render () {
        return (
        <>
            {/* const { myDogs } = this.state */}
            {this.myDogs.map((dog) => (
                <div>
                    {
                        <DogProfile dog={dog}/>
                    }
                </div> 
            ))}
        </>  
        );
    }
}