import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Register() {

  let nm = JSON.parse(localStorage.getItem("loggedinemp"));

  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("loggedinuser");
  }
  const navigateto = () => {
    if (nm.login.role == "manager")
      navigate("/manager")
    else
      navigate("/admin")

  }
  const [first_name, setfirst_name] = useState("");
  const [email, setemail] = useState("");
  const [last_name, setlast_Name] = useState("");
  const [phone, setphone] = useState("");
  const [job_title, setjob_title] = useState("");
  const [password, setpassword] = useState("");
  const [department, setdepartment] = useState([]);
  const [location, setlocation] = useState("");
  const [join_date, setjoin_date] = useState("");
  const [manager_id, setmanager_id] = useState(0);
  const [department_id, setdepartment_id] = useState(0);
  const [gender, setgender] = useState("");
  const [manager, setmanager] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8080/getmanagerbydept?department_id=" + department_id)
      .then(r => r.json())
      .then(d => setmanager(d))
  }, [department_id]);

  useEffect(() => {
    fetch("http://localhost:8080/alldepartment")
      .then(r => r.json())
      .then(d => setdepartment(d))
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/registere", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        gender: gender,
        job_title: job_title,
        department_id: department_id,
        location: location,
        password: password,
        join_date: join_date,
        manager_id: manager_id,
        email: email,
      })
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        /* if(Result=="true")
         alert("leave is updated, and assigned");
         else
         alert("leave didn't update");*/
        //{setleave(data);localStorage.setItem("loggedinemp", JSON.stringify(data))}
      });
  }
  return (
    <div className="staffreg">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h6 className="text-light">e-CARGOWARE</h6>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item ">
                <button
                  type="button"
                  className="btn btn-light "
                  aria-current="page"
                  onClick={() => navigateto()}
                >
                  Back
                </button></li>
              <li className="nav-item mx-2">
                <button
                  type="button"
                  className="btn btn-light "
                  aria-current="page"
                  onClick={() => { logout(); navigate("/login") }}
                >
                  logout
                </button>
              </li>


            </ul>

          </div>
        </div>
      </nav>

      <h3 style={{ textAlign: "center", marginTop: 25 }}> Employee Registration Form</h3>
      <div className="containers">
        <div className="registeresdpatient pt-4 pb-4">
          <div className="register-container-fluid">
            <div className="container card w-50 ">

              <form className="register-form" onSubmit={handleSubmit}>
                <br></br>

                <br />

                <Row>
                  <Col className="md-5">
                    <label>
                      <b>First Name:</b>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      autoComplete="off"
                      onChange={(event) => {
                        setfirst_name(event.target.value);
                      }}
                    />
                  </Col>
                  <Col className="md-5">
                    <label>
                      <b>Last Name:</b>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      autoComplete="off"
                      onChange={(event) => {
                        setlast_Name(event.target.value);
                      }}
                    />
                  </Col>
                </Row>

                <br />
                <Row>

                  <Col className="md-5">
                    <label>
                      <b>Email ID :</b>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="off"
                      onChange={(event) => {
                        setemail(event.target.value);
                      }} />
                  </Col>



                  <Col className="md-5">
                    <label>
                      <b>Contact :</b>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Contact"
                      autoComplete="off"
                      onChange={(event) => {
                        setphone(event.target.value);
                      }}
                    />
                  </Col>

                </Row>
                <br />

                <Row>
                  <Col className="md-5">
                    <label>
                      <b>Department  :</b>
                    </label>
                    <select
                      name="department_id"
                      onChange={(e) => {
                        setdepartment_id(e.target.value);
                      }}>
                      <option value='Select'>Department</option>
                      {department.map(
                        (el) => {
                          return <option value={el.department_id}> {el.department_name}</option>;
                        }
                      )}
                    </select>
                  </Col>

                  <Col className="md-5">
                    <label>
                      <b>Password :</b>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={(event) => {
                        setpassword(event.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col className="md-5">
                    <label>
                      <b>location :</b>
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="location"
                      autoComplete="off"
                      onChange={(event) => {
                        setlocation(event.target.value);
                      }}
                    />
                  </Col>

                  <Col className="md-5">
                    <label>
                      <b>join_date :</b>
                    </label>
                    <input
                      type="date"
                      name="join_date"
                      placeholder="join_date"
                      autoComplete="off"
                      onChange={(event) => {
                        setjoin_date(event.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>

                  <Col className="md-5">
                    <label>
                      <b>job_title : </b>
                    </label>
                    <input
                      type="text"
                      name="job_title"
                      placeholder="job title"
                      autoComplete="off"
                      onChange={(event) => {
                        setjob_title(event.target.value);
                      }}
                    />
                  </Col>


                  <Col className="md-5">
                    <b>
                      <label for="gender">Gender : </label>
                    </b>
                    <input
                      type="radio" value="male" name="gender" onChange={(event) => {
                        setgender(event.target.value);
                      }} />
                    Male
                    <input
                      type="radio" value="female" name="gender" onChange={(event) => {
                        setgender(event.target.value);
                      }} />
                    Female
                  </Col>

                </Row>
                <br />
                <Row>
                  <Col className="md-5">
                    <b>
                      <label for="manager_id">manager : </label>
                    </b>
                    <select
                      name="employee_id"
                      onChange={(e) => {
                        setmanager_id(e.target.value);
                      }}>
                      <option value='Select'>Name</option>
                      {manager.map(
                        (el) => {
                          return <option value={el.m_id}>{el.first_name + " " + el.last_name}</option>;
                        }
                      )}
                    </select>
                  </Col>
                </Row>
                <button className="btn btn-primary " style={{ marginLeft: 250 }} type="submit">
                  Register
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
