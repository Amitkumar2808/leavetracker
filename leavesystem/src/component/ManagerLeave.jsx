import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ManagerLeave = () => {
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
  const [myData, setMyData] = useState([]);
  useEffect(() => {

    fetch("http://localhost:8080/allmangLeaves")
      .then(req => req.json())
      .then((res) => { setMyData(res) });
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h6 className="text-light">e-CARGOWARE</h6>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <button
                  type="button"
                  className="btn btn-light "
                  aria-current="page"
                  onClick={() => { navigateto() }}
                >
                  Back
                </button>
              </li>
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
      <div className="pt-4">

        <table className="table  ">
          <thead className="bg-dark text-light">

            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End date</th>
              <th>Number of leave</th>
              <th>typle of leave</th>
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
            {myData.map((p) => {

              return (
                <tr>
                  <td style={{backgroundColor:"lightseagreen"}}>{p.manager.first_name + " " + p.manager.last_name}</td>
                  <td  style={{backgroundColor:"lightgray"}}>{p.start_date}</td>
                  <td style={{backgroundColor:"lightgray"}}>{p.end_date}</td>
                  <td style={{backgroundColor:"lightskyblue"}}>{p.nuleavs}</td>
                  <td style={{backgroundColor:"lightpink"}}>{p.leavetype.leave_type}</td>
                  <td style={{backgroundColor:"lightgoldenrodyellow"}}>{p.status}</td>



                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}
export default ManagerLeave;