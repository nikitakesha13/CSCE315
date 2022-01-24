import React, {Component, useState} from "react";
import axios from 'axios';
import Popup from "./popup.component";
import Dog from "./dog.component";

export default class Settings extends Component {
    state = {
        seen: false
    };
    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };
    render() {
        return (
            <div>
                <div className="btn" onClick={this.togglePop}>
                <button>Add Dog</button>
                </div>
                {this.state.seen ? <Popup toggle={this.togglePop} /> : null}
            </div>
        );
    }
}