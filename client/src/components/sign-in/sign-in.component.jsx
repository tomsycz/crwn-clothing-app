import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "./../form-input/from-input.component";
import CustomButtom from "./../custom-button/custom-buttom.component";
import "./sign-in.styles.scss";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;

  const handleSubmit = async e => {
    e.preventDefault();

    emailSignInStart(email, password);
  };
  const handleChange = e => {
    const { value, name } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>{" "}
      <span>Sign in with your eamil and password</span>
      <form onSubmit={handleSubmit}>
        {" "}
        <FormInput
        name="email"
          type="email"
          value={email}
          required
          label="email"
          handleChange={handleChange}
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          required
          label="password"
          handleChange={handleChange}
        />
        <div className="buttons">
          <CustomButtom type="submit"> Sign In </CustomButtom>
          <CustomButtom
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            {" "}
            Sign In With google
          </CustomButtom>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
