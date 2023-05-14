import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const LeaveById = () => {
  let nm = JSON.parse(localStorage.getItem("loggedinuser"));
  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("loggedinuser");
  }
  const [leave, setleave] = useState([]);
  const [empdata, setempdata] = useState(0);
  if (nm.role === "employee") {
    var emp = "getEmployeebylogin";
    var emp1 = "getleavebyempid";
    var emp2 = "employee_id";
    
  }
  else if (nm.role === "manager") {
    var emp = "getManagerbylogin";
    var emp1 = "getleavebyempid";
    var emp2 = "m_id";
  
  }
  else if (nm.role === "admin") {
    var emp = "getAdminbylogin";
    var emp1 = "getleavebyempid";
    var emp2 = "a_id";
    
  }
  useEffect(() => {
    fetch("http://localhost:8080/" + emp + "?login_id=" + nm.login_id)
      .then((resp) => resp.json())
      .then((data) => {         
          setempdata(data.employee_id); localStorage.setItem("loggedinemp", JSON.stringify(data))
       
      })

  }, nm.status);
  useEffect(() => {
    fetch("http://localhost:8080/" + emp1 + "?" + emp2 + "=" + empdata)
      .then((resp) => resp.json())
      .then((data) => {
        {
          setleave(data); 
        }
      });

  }, );
  const callfun = (p) => {
    if ((p.status) == "approve")
      if ((p.leavetype.leave_type) == "AL")
        countal += (p.nuleavs);
      else if ((p.leavetype.leave_type) == "PL")
        countpl += (p.nuleavs);
      else if ((p.leavetype.leave_type) == "SLs")
        countsl += (p.nuleavs);

  }
  var countpl = 0;
  var countal = 0;
  var countsl = 0;
  const navigateto = () => {
    if (nm.role == "employee")
      navigate("/employeeland")
    else if (nm.role == "manager")
      navigate("/manager")
    else if (nm.role == "admin")
      navigate("/admin")
  }
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
      <table className="table  my-4">
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
          {leave.map((p) => {

            return (
              <tr>
                <td style={{ backgroundColor: "lightseagreen" }}>{p.employee.first_name + " " + p.employee.last_name}</td>
                <td style={{ backgroundColor: "lightgray" }}>{p.start_date}</td>
                <td style={{ backgroundColor: "lightgray" }}>{p.end_date}</td>
                <td style={{ backgroundColor: "lightskyblue" }}>{p.nuleavs}</td>
                <td style={{ backgroundColor: "lightpink" }}>{p.leavetype.leave_type}</td>
                <td style={{ backgroundColor: "lightgoldenrodyellow" }}>{p.status}</td>
                {callfun(p)}


              </tr>
            );
          })}
        </tbody><tfoot>
          <tr style={{ backgroundColor: "lightcyan" }} >
            <td><b>Total leaves :</b>{countpl + countsl + countal}/20</td>
            <td><b>Remaning leave :</b>{20 - (countpl + countsl + countal)}/20</td>
            <td><b>Pl leaves :</b>{countpl}</td>
            <td><b>Al leaves :</b>{countal}</td>
            <td><b>Sl leave :</b>{countsl}</td>
            <td></td>
          </tr>
        </tfoot>

      </table>

    </div>
  )
}
export default LeaveById;