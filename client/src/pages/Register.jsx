import React, { useEffect, useState } from "react";
import "./Register.css";
import Logo from "../assets/BiLLY.png";
import GoogleLogo from "../assets/googleFilled.png";
import { GoogleLogin } from "react-google-login";

import RemoveRedEyeIcon from "../assets/eye.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerRoute } from "../utils/APIRoutes";
import FacebookLogin from "react-facebook-login";
import { gapi } from "gapi-script";
const clientId =
  "394003379659-jgpi3peh2b3ij0uusschvl9s2m6g5fu6.apps.googleusercontent.com";
function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [show, setShow] = useState(false);
  function passwordToggler() {
    setShow((prev) => !prev);
  }
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, password, name } = values;
      const { data } = await axios.post(registerRoute, {
        name,
        email,
        password,
      });
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        // localstorage aklia
        navigate("/company");
      }
    } else {
    }
  };
  function componentClicked(data) {
    console.log(data);
  }
  const responseFacebook = async (response) => {
    console.log(response);
    const facebookEmail = response.email;
    const { data } = await axios.post(registerRoute, { facebookEmail });

    if (!data.status) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status) {
      navigate("/company");
    }
  };
  useEffect(() => {
    // fb button
    var fb_img = document.createElement("img");
    fb_img.src = "../images/facebookFilled.png";
    const fb = document.getElementsByClassName("metro");
    let fbText = "Sign Up with Facebook";
    let answer = fb[0].hasChildNodes();
    if (answer) {
      fb[0].replaceChildren(fb_img, fbText);
    }

    return () => {};
  }, [0]);
  // fb button
  const handleValidation = () => {
    const { email, password, name } = values;
    if (password.length < 6) {
      toast.error(
        "Password should be equal or greater than 6 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (name.length < 3) {
      toast.error("Username should be equal or greater than 3", toastOptions);
      return false;
    }
    return true;
  };
  // google button
  const responseGoogle = async (response) => {
    const googleEmail = response.profileObj.email;
    const { data } = await axios.post(registerRoute, { googleEmail });
    console.log(data.status);

    if (!data.status) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status) {
      navigate("/company");
    }
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  // end google button
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <div className="Register">
      <form autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
        <img className="logo" src={Logo} alt="" />
        <h1 className="Register-title">Welcome to Billy</h1>
        <p>Enter your info to get started?</p>

        <div className="button-group">
          <GoogleLogin
            clientId={clientId}
            className="google-button"
            buttonText="Sign Up With Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            disabledStyle={true}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId="558786399347976"
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
          />
        </div>
        <h3 className="middle-text">OR</h3>
        <label className="name">
          Name
          <br />
          <input onChange={handleChange} name="name" type="text" />
        </label>
        <br />
        <label className="email">
          Email
          <br />
          <input onChange={handleChange} name="email" type="email" />
        </label>
        <br />
        <label className="password">
          <div>
            <h1>Password</h1>
            <h3 className="forgot-password">Forgot Password?</h3>
          </div>
          <input
            onChange={handleChange}
            name="password"
            type={show ? "text" : "password"}
          />

          <img
            className="eye-logo"
            onClick={passwordToggler}
            src={RemoveRedEyeIcon}
            alt=""
          />
        </label>
        <br />
        <button className="signin-button">Create my account</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
