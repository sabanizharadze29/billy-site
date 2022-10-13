import React, { useState } from "react";
import "./Register.css";
import Logo from "../assets/BiLLY.png";
import FacebookLogo from "../assets/facebookFilled.png";
import GoogleLogo from "../assets/googleFilled.png";
import RemoveRedEyeIcon from "../assets/eye.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerRoute } from "../utils/APIRoutes";
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
          <button>
            <img src={GoogleLogo} alt="" />
            Sign Up with Facebook
          </button>
          <button>
            <img src={FacebookLogo} alt="" />
            Sign Up with Google
          </button>
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
