import React, { useState } from "react";
import "../SignupLogin/SignupLogin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("image", image);
    axios
      .post("http://localhost:3000/user/signup", formData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate("/login");
        toast.success("Signup Successful! Welcome aboard!", {
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

  const fileHandler = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
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
            <h1 id="signup-right-heading">Create Your Account</h1>
            <input
              required
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              type="text"
              placeholder="Institute Name"
            />
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
                setPhone(e.target.value);
              }}
              type="number"
              placeholder="Phone"
            />
            <input
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
            <input required onChange={fileHandler} type="file" />
            {imageUrl && (
              <img
                className="signup-right-imgUrl"
                src={imageUrl}
                alt="signupImagesPreview"
              />
            )}
            <button id="signup-right-btn" type="submit">
              <i className="fa-solid fa-user"></i>
              <span>Signup</span>
            </button>

            <Link id="signup-login-create-acc" to={"/login"}>
              <i className="fas fa-sign-in"></i>
              <span>Login</span>
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

export default Signup;
