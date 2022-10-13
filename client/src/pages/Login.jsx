import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/BiLLY.png";
import GoogleLogo from "../assets/google.png";

import RemoveRedEyeIcon from "../assets/eye.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

import { gapi } from "gapi-script";
const clientId =
  "394003379659-jgpi3peh2b3ij0uusschvl9s2m6g5fu6.apps.googleusercontent.com";
function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
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
  function componentClicked(data) {
    console.log(data);
  }
  useEffect(() => {
    // fb button
    var fb_img = document.createElement("img");
    fb_img.src = "images/facebookColored.png";
    const fb = document.getElementsByClassName("metro");
    let fbText = "Login With Facebook";
    let answer = fb[0].hasChildNodes();
    if (answer) {
      fb[0].replaceChildren(fb_img, fbText);
    }
    console.log(answer);
    return () => {};
  });
  const responseFacebook = async (response) => {
    const facebookEmail = response.email;
    const { data } = await axios.post(loginRoute, { facebookEmail });

    if (!data.status) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status) {
      navigate("/company");
    }
  };
  const responseGoogle = async (response) => {
    const googleEmail = response.profileObj.email;
    const { data } = await axios.post(loginRoute, { googleEmail });
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;

      const { data } = await axios.post(loginRoute, { email, password });

      if (!data.status) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status) {
        // localstorage

        navigate("/company");
      }
    }
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (password.length < 6) {
      toast.error(
        "Password should be equal or greater than 6 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <div className="Login">
      <img className="logo" src={Logo} alt="" />
      <h1 className="Login-title">Sign in to your account</h1>
      <p>
        Don't have an account?{" "}
        <Link className="register-link" to="/register">
          Register
        </Link>
      </p>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label className="email">
          Email Address
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
        <button className="signin-button">Sign In</button>
        <h3 className="middle-text">or continue with</h3>

        <div className="buttons-group">
          <GoogleLogin
            clientId={clientId}
            buttonText=""
            className="google-button"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId="558786399347976"
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
