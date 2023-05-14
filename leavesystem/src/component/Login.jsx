import React from "react";
//import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/login.css';
import FooterSection from "./FooterSection";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errormsg, seterror] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqOption = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }
    fetch("http://localhost:8080/CheckLogin", reqOption)
      .then(resp => resp.json())
      .then((resp) => {
        if (resp == null)
          seterror("id or passoward is wrong")
        else if (resp.role === "employee") {
          localStorage.setItem("loggedinuser", JSON.stringify(resp));
          navigate("/home");
        } else if (resp.role === "manager") {
          localStorage.setItem("loggedinuser", JSON.stringify(resp));
          navigate("/home");
        }else {
          alert("Invalid usename or password");
        }
      })
  }



  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h6 className="text-light">LeaveTracking</h6>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <button
                  type="button"
                  className="btn btn-light "
                  aria-current="page"
                  onClick={() => { navigate("/login") }}
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="background  ">
        <div className="container-fluids login">
          <div className="container card w-50 mt-5 ">
            <form className="login pt-4">
              <div className="row mb-3">
                <label htmlFor="inputEmail3" className="col-sm-4 col-form-label ">
                  email :
                </label>
                <div className="col-sm-5">
                  <input
                    type="email"
                    placeholder="email"
                    className="form-control "
                    autoComplete="off"
                    id="inputEmail3"
                    onChange={(event) => {
                      setemail(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row mb-3 p">
                <label htmlFor="inputPassword3" className="col-sm-4 col-form-label">
                  Password :
                </label>
                <div className="col-sm-5">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="inputPassword3"
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                  />
                </div>
                <span style={{
                  fontWeight: 'bold',
                  color: 'red',
                }}>{errormsg}</span>
              </div>
              <button style={{ textAlign: "center", marginLeft: "40%" }}
                type="submit"
                className="btn btn-success  "
                onClick={(e) => {
                  handleSubmit(e);
                }} >
                Login
              </button>

            </form>
          </div>
        </div>
      </div>
      <FooterSection/>
    </div>
  );
}



export default Login;

