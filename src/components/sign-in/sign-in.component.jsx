import React, { Component } from "react";
import FormInput from "./../form-input/from-input.component";
import CustomButtom from "./../custom-button/custom-buttom.component";
import "./sign-in.styles.scss";

import { signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ email: "", password: "" });
  };
  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>{" "}
        <span>Sign in with your eamil and password</span>
        <form onSubmit={this.handleSubmit}>
          {" "}
          <FormInput
            name="email"
            value={this.state.email}
            required
            label="email"
            handleChange={this.handleChange}
          />
          <FormInput
            name="password"
            value={this.state.password}
            required
            label="password"
            handleChange={this.handleChange}
          />
          <div className="buttons">
            <CustomButtom type="submit"> Sign In </CustomButtom>
            <CustomButtom onClick={signInWithGoogle} isGoogleSignIn>
              {" "}
              Sign In With google
            </CustomButtom>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
