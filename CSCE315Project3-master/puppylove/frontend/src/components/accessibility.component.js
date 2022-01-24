import React, {Component} from "react";

export default class Accessibility extends Component {
    constructor(props){
        super(props);
        this.onDarkMode = this.onDarkMode.bind(this);
    }
    onDarkMode(){
        if (localStorage.getItem('theme') == 'light'){
            localStorage.setItem('theme', 'dark');
        }
        else {
            localStorage.setItem('theme', 'light');
        }
        window.location.reload();
        console.log("The current theme:", localStorage.getItem('theme'));
    }
    render() {
        console.log("The current theme:", localStorage.getItem('theme'));
        return (
            <body>
                <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong">
                                <div className="card-body p-5">
                                    <h3 className="mb-5 text-center"> Accessibility Settings </h3>
                                        <button type="button" class="btn btn-dark align-items-center" onClick={this.onDarkMode}>Toggle: Eye sensitivity setting</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                <div className="row">
                    <h4> Accessibility </h4> 
                </div>
            </body>
        );
    }
}