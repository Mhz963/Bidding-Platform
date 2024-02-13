import React, { Component } from 'react';
import './Login.css'


class Login extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log('Login props', this.props)
        return (
            <div>
                <fieldset>
                    <legend>Login details:</legend>

                    <div className="username">
                        <label>Email:</label>
                        <input type="text" id="email" name="email" required
                            placeholder="enter email address"
                            onBlur={(event) => this.props.onFieldChange(event.target.value, 'userName')}
                        />
                        <span className="validity"></span>
                    </div>
                    <br />

                    <div className="username">
                        <label >Password:</label>
                        <input type="password" id="password" name="password" required
                            placeholder="password"
                            onBlur={(event) => this.props.onFieldChange(event.target.value, 'password')}
                        />
                        <span className="validity"></span>
                    </div>

                    <div>
                        <p><button className="styledButton" onClick={() => this.props.Login('userLogin')}>User Login</button>
                            <button className="styledButton" onClick={() => this.props.Login('adminLogin')}>Admin Login</button>
                        </p>
                    </div>

                </fieldset>
                <p>
                    User Login: userName: <b>123</b>, password: <b>123</b>
                </p>
                <p>
                    Admin Login: userName: <b>admin@vitwit.com </b>, password: <b>adminpassword</b>
                </p>
            </div>
        );
    }
}

export default Login;



