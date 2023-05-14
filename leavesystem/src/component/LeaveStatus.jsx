import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LeaveStatus = () => {
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
  const [leave, setLeave] = useState([]);
  const [status, setStatus] = useState("pending");
  const [leave_id, setLeaveId] = useState(0);
  const [employee, setEmployee] = useState([])
  const handleSubmit = () => {

    fetch("http://localhost:8080/updateleave?leave_id=" + leave_id + "&status=" + status, {

      method: "POST",
      headers: { "content-type": "application/json" }
    })
      .then(resp => resp.json())
      .then((resp) => { setEmployee(resp); });
    if (employee != null)
      alert("Leave is " + status)
  }
  useEffect(() => {
    fetch("http://localhost:8080/allpendingleavesbydept?manager_id=" + nm.m_id)
      .then(r => r.json())
      .then(d => { setLeave(d) })
  }, []);
  const approve = (a) => {


    setStatus("approve")
    setLeaveId(a)
    handleSubmit()

  }
  const Reject = (a) => {


    setStatus("reject")
    setLeaveId(a)
    handleSubmit()
  }

  return (
    <div >
   {/*   <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
  </nav>*/}
      <table className="table">
        <thead className="bg-dark text-light">

          <tr style={{ textAlign: "center" }}>
            <th>Name</th>
            <th>Start Date</th>
            <th>End date</th>
            <th>Number of leave</th>
            <th>typle of leave</th>
            <th colSpan={2}>Status</th>

          </tr>
        </thead>
        {leave.map((p) => {

          return (
            <tr key={Math.random()} style={{ textAlign: "center" }}>
              <td style={{backgroundColor:"lightseagreen"}}>{p.employee.first_name + " " + p.employee.last_name}</td>
                  <td  style={{backgroundColor:"lightgray"}}>{p.start_date}</td>
                  <td style={{backgroundColor:"lightgray"}}>{p.end_date}</td>
                  <td style={{backgroundColor:"lightskyblue"}}>{p.nuleavs}</td>
                  <td style={{backgroundColor:"lightpink"}}>{p.leavetype.leave_type}</td>
                 
              <td style={{backgroundColor:"lightgoldenrodyellow"}}><button style={{ backgroundColor: "green", borderRadius: 10, marginRight: 5 }} onClick={() => approve(p.leave_id)} >Approve</button>
              </td>
              <td style={{backgroundColor:"lightgoldenrodyellow"}}> <button style={{ backgroundColor: "red", borderRadius: 10 }} onClick={() => Reject(p.leave_id)}  >Reject </button></td>
            </tr>
          );
        })}


      </table>

    </div>
  )


}
export default LeaveStatus;