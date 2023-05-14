import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const LeaveofManager = () => {
  let nm = JSON.parse(localStorage.getItem("loggedinuser"));
  const navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("loggedinuser");
  }
  const [leave, setleave] = useState([]);
  const [empdata, setempdata] = useState(0);
  
   if (nm.role === "manager") {
    var emp = "getManagerbylogin";
    var emp1 = "getleavebymangid";
    var emp2 = "manager_id";
  
  }
  
  useEffect(() => {
    fetch("http://localhost:8080/" + emp + "?login_id=" + nm.login_id)
      .then((resp) => resp.json())
      .then((data) => {
        {
         setempdata(data.m_id); localStorage.setItem("loggedinemp", JSON.stringify(data))
        };
      })

  }, []);
  useEffect(() => {
    
        fetch("http://localhost:8080/" + emp1 + "?" + emp2 + "=" + empdata)
      .then((resp) => resp.json())
      .then((data) => {
        {
          setleave(data);console.log("");
        }
      });
  }, )
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
   
     if (nm.role == "manager")
      navigate("/manager")
   
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
     
          {leave.map((p) => {

            return (
               
              <tr>
                
                <td style={{ backgroundColor: "lightseagreen" }}>{p.manager.first_name + " " + p.manager.last_name}</td>
                <td style={{ backgroundColor: "lightgray" }}>{p.start_date}</td>
                <td style={{ backgroundColor: "lightgray" }}>{p.end_date}</td>
                <td style={{ backgroundColor: "lightskyblue" }}>{p.nuleavs}</td>
                <td style={{ backgroundColor: "lightpink" }}>{p.leavetype.leave_type}</td>
                <td style={{ backgroundColor: "lightgoldenrodyellow" }}>{p.status}</td>
                {callfun(p)}


              </tr>
            )
          })}
       
          <tr style={{ backgroundColor: "lightcyan" }} >
            <td><b>Total leaves :</b>{countpl + countsl + countal}/20</td>
            <td><b>Remaning leave :</b>{20 - (countpl + countsl + countal)}/20</td>
            <td><b>Pl leaves :</b>{countpl}</td>
            <td><b>Al leaves :</b>{countal}</td>
            <td><b>Sl leave :</b>{countsl}</td>
            <td></td>
          </tr>
       

      </table>

    </div>
  )
}
export default LeaveofManager;