import React, {Component} from "react";

export default class UserSettings extends Component {
    render() {
        return (
            <body>
                <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong">
                                <div className="card-body p-5">
                                    <h3 className="mb-5 text-center"> User Settings </h3>
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-outline mb-4">
                                            <input type="name"
                                                id="name-info"
                                                required
                                                className="form-control form-control-lg"
                                                placeholder="Change Name"
                                                // value={this.state.name}
                                                // onChange={this.onChangeName}
                                            />
                                            {/* <label className="info-label" for="name-info">Name</label> */}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="email"
                                                id="email-info"
                                                required
                                                className="form-control form-control-lg"
                                                placeholder="Change Email"
                                                // value={this.state.email}
                                                // onChange={this.onChangeEmail}
                                            />
                                            {/* <label className="info-label" for="email-info">Email</label> */}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password"
                                                id="password-info"
                                                required
                                                className="form-control form-control-lg"
                                                placeholder="Old Password"
                                                // value={this.state.password}
                                                // onChange={this.onChangePassword}
                                            />
                                            {/* <label className="info-label" for="password-info">Password</label> */}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password"
                                                id="password-info"
                                                required
                                                className="form-control form-control-lg"
                                                placeholder="New Password"
                                                // value={this.state.password}
                                                // onChange={this.onChangePassword}
                                            />
                                            {/* <label className="info-label" for="password-info">Password</label> */}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password"
                                                id="confirm-password-info"
                                                required
                                                className="form-control form-control-lg"
                                                placeholder="Confirm New Password"
                                                // value={this.state.confirm}
                                                //onChange={this.onChangeConfirmPassword}
                                                />
                                            {/* <label className="info-label" for="password-info">Password</label> */}
                                        </div>
                                    </form>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                {/* <div className="row">
                    <h4> User Info </h4>
                    <div className="col-md">
                        
                    </div>  
                </div>
                <div className="row">
                    <h4> Dog Info </h4> 
                </div>
                <div className="row">
                    <h4> Accessibility </h4> 
                </div> */}

            </body>
        );
    }
}