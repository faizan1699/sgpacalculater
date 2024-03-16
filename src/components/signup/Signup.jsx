import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firbase/Firebase';

function Signup() {

  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [passwordtext, setPasswordText] = useState("SHOW");
  const [showpassword, setShowPassword] = useState("password");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleInputchange = (event) => {
    const { name, value } = event.target;
    setData((prevdata) => ({ ...data, [name]: value }));
  }

  const handleSignup = (event) => {
    event.preventDefault();
    const { name, email, password } = data;
    createUserWithEmailAndPassword(auth, email, password, name)
      .then((res) => {
        const user = res.user;
        updateProfile(user, {
          displayName: name,
        })

        setMessage("Account Created Successfully");
        setData({ name: "", email: "", password: "" });
        navigate("/login")
      })
      .catch((error) => {
        setMessage(`A user with ( ${data.email} ) Already Exist`);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      });
  }

  const handleShowPassword = () => {
    const checkbox = document.getElementById("checkbox");

    if (checkbox.checked) {
      setShowPassword("text");
      setPasswordText("hide");
    }
    else {
      setShowPassword("password")
      setPasswordText("Show");
    }
  };

  return (

    <div className='signup'>

      <h3 className='text-center fw-bold mt-3 mb-4 text-decoration-underline'>SignUp Form</h3>

      <div className="text-center small text-danger">{message}</div>
      <form action="" onSubmit={handleSignup}>

        <div className="mb-2">
          <input type="text" className='form-control py-3' name='name' value={data.name} onChange={handleInputchange} autoComplete='false' placeholder='Enter Your Name' />
        </div>

        <div className="mb-2">
          <input type="email" className='form-control py-3' name='email' value={data.email} onChange={handleInputchange} autoComplete='false' placeholder='Enter Your Email Here' />
        </div>

        <div className="mb-2">
          <input type={showpassword} className='form-control py-3' name='password' value={data.password} onChange={handleInputchange} autoComplete='false' placeholder='Enter Your Password Here' />
        </div>

        <div className="mb-2 text-uppercase d-flex align-items-center justify-content-between">
          <div className="d-flex">
            <input type='checkbox' className='me-2' id='checkbox' onClick={handleShowPassword} />
            <label htmlFor="check box " style={{ fontSize: "12px" }}>{passwordtext} PASSWORD</label>
          </div>
          <div className="small">
            <Link to='/login' className=' text-danger'>Already have account ?</Link>
          </div>

        </div>

        <div className="d-flex justify-content-end mt-3">
          <button className='btn btn-dark px-4 rounded-0'>SignUp</button>
        </div>

      </form>

    </div>
  )
}

export default Signup