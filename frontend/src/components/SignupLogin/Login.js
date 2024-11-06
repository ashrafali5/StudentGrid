import React, { useState } from "react";
import "../SignupLogin/SignupLogin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:3000/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("fullName", res.data.fullName);
        localStorage.setItem("imageUrl", res.data.imageUrl);
        localStorage.setItem("imageId", res.data.imageId);
        console.log(res.data);
        navigate("/dashboard");
        toast.success("Login Successful! Welcome!", {
          autoClose: 5000, // Closes after 3 seconds
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something is wrong....", {
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(err);
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="signup-left">
          <img
            className="signup-logo"
            src={require("../../assets/g.png")}
            alt="signupLogo"
          />
          <h1 style={{ fontWeight: "900" }} id="signup-left-heading">
            Smart Student Management
          </h1>
          <p id="signup-left-para">
            empowers institutions to seamlessly organize, track, and manage
            student data with efficiency and ease.
          </p>
        </div>
        <div className="signup-right">
          <form onSubmit={submitHandler} className="signup-login-form">
            <h1 id="signup-right-heading">Login Your Account</h1>
            <input
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
            />
            <input
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
            <button id="signup-right-btn" type="submit">
              <i className="fas fa-sign-in signupLoginIcon"></i>
              <span>Login</span>
            </button>

            <Link id="signup-login-create-acc" to={"/signup"}>
              <i className="fa-solid fa-user"></i>
              <span style={{ marginLeft: "18px" }}>Signup</span>
            </Link>
          </form>

          {isLoading && (
            <i className="fa-solid fa-cog fa-spin" id="loading"></i>
          )}
          {isLoading && <span id="loading">Loading...</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
