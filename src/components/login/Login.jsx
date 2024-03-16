import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firbase/Firebase";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [showpassword, setShowPassword] = useState("password");
  const [passwordtext, setPasswordText] = useState("show");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputchange = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleShowPassword = () => {
    const checkbox = document.getElementById("checkbox");

    if (checkbox.checked) {
      setShowPassword("text");
      setPasswordText("hide");
    } else {
      setShowPassword("password");
      setPasswordText("show");
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setMessage("user loged in successfully");
        setData({ email: "", password: "" });
        navigate("/");
      })
      .catch((error) => {
        setMessage(`${error.message}`);
        console.error("Error creating user", error);
      });
  };

  return (
    <div className="login">
      <h3 className="text-center fw-bold mt-3 mb-4 text-decoration-underline">
        Login Form
      </h3>
      <div className="text-center small text-danger">{message}</div>
      <form onSubmit={handleLogin}>
        <div className="mb-2">
          <input
            className="form-control py-3"
            type="email"
            value={data.email}
            name="email"
            onChange={handleInputchange}
            autoComplete="false"
            placeholder="Enter Your Email Here"
          />
        </div>

        <div className="mb-2">
          <input
            className="form-control py-3"
            type={showpassword}
            value={data.password}
            name="password"
            onChange={handleInputchange}
            autoComplete="false"
            placeholder="Enter Your Password Here"
          />
        </div>

        <div className="mb-2 d-flex align-items-center  justify-content-between text-uppercase">
          <div className="">
            <input
              type="checkbox"
              className="me-2"
              id="checkbox"
              onClick={handleShowPassword}
            />
            <label htmlFor="check box" style={{ fontSize: "12px" }}>
              {passwordtext} PASSWORD
            </label>
          </div>

          <div className="small">
            <Link className="text-danger" to="/signup">
              create new account
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-dark px-4 rounded-0">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
