import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/BiLLY.png";
import FacebookLogo from "../assets/facebook.png";
import GoogleLogo from "../assets/google.png";
import RemoveRedEyeIcon from "../assets/eye.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      navigate("/company");
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
          <button>
            <img src={GoogleLogo} alt="" />
          </button>
          <button>
            <img src={FacebookLogo} alt="" />
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
