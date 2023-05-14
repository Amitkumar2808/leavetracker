import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import check from '../images/righte.png';
import cross from '../images/crossremain.png';
import pending from '../images/pending.png';
import app from '../images/2126884.png';
import pend from '../images/clip1.png';
import clip from '../images/clip.png';
import LeaveApplication from "./LeaveApplication";
const LandingPage = () => {

  /* condition on basis of role which part need to show */
  const [mangcondition, setmangcondition] = useState(false);
  const [empcondition, setempcondition] = useState(false);
  /*conditions to show */
  const [displaypendingleaves, setdisplaypendingleaves] = useState(true);
  const [displayappliedleaves, setdisplayappliedleaves] = useState(false);
const[displaysearchleaves,setdisplaysearchleaves]=useState(false);

  /* manager data */
  const [persondata, setpersondata] = useState({});
  const [manager_id, setmanager_id] = useState(0);
  const [employee_id, setemployee_id] = useState(0);
  const [Employee_id, setEmployee_id] = useState(0);

  /* leave data store */
  const [leave, setleave] = useState([]);
  const [leavetype, setLeavetype] = useState([]);

  /*manager data from employee  */
  const [managerdata, setmanagerdata] = useState([]);

  /*pending leaves of employee */
  const [pendingLeaveofemployee, setpendingLeaveofemployee] = useState([]);

  /*update and save leave of employee */
  const [leave_id, setleave_id] = useState(0);
  const [status, setStatus] = useState("pending");
  const [leaveupdate, setleaveupdate] = useState([]);

  /*all employee data  */
  const [employeedata, setemployeedata] = useState([]);

  /* set search by employee id */
  const [leavesearch, setleavesearch] = useState([]);

  /* save manager leave  */
  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");
  const [nuleaves, setnuleavs] = useState(0);
  const [leavetype_id, setleavetype_id] = useState(0);
  const [comment, setcomment] = useState("");
  const [Result, setResult] = useState(false);
  const [errorMessag, seterrorMessag] = useState("");

 

  /* login information */
  let nm = JSON.parse(localStorage.getItem("loggedinuser"));
  let logout = () => {
    localStorage.removeItem("loggedinuser");
  }

  const navigate = useNavigate();

  /* show data according to role */
  useEffect(() => {

    if (nm.role == "manager")
      setmangcondition(true);
    else if (nm.role == "employee")
      setempcondition(true);

  }, []);
  const fetchdataformanager = () => {
    fetch("http://localhost:8080/getManagerbylogin?login_id=" + nm.login_id)
      .then((resp) => resp.json())
      .then((data) => {
        setpersondata(data); setmanager_id(data.m_id);

      });
  }
  const fetchmanagerpendingleaves = () => {

    fetch("http://localhost:8080/allpendingleavesofemployee?manager_id=" + persondata.m_id,{
      method: "GET",
      headers: { "content-type": "application/json" }
    })
      .then(r => r.json())
      .then(d => { setpendingLeaveofemployee(d) });

    
  }

  const fetchdataformanagerleaves = () => {
    fetch("http://localhost:8080/getleavebymangid?manager_id=" + manager_id)
      .then((resp) => resp.json())
      .then((d) => { setleave(d) })
  }

  /* data from loging */
  useEffect(() => {
    if (nm.role == "manager") {
      fetchdataformanager();
      fetchmanagerpendingleaves();
      fetchdataformanagerleaves();
    }
    else if (nm.role == "employee") {
      fetch("http://localhost:8080/getEmployeebylogin?login_id=" + nm.login_id)
        .then((resp) => resp.json())
        .then((data) => { setpersondata(data); setemployee_id(data.e_id); setmanager_id(data.manager.m_id); });
    }
  }, [manager_id]);
  /* leave data of manager/employee */

  const fetchdataforemployee = () => {
    fetch("http://localhost:8080/getmanager?manager_id=" + manager_id)
      .then(r => r.json())
      .then(d => setmanagerdata(d));
  }
  const fetchdataofemployeeleave = () => {
    fetch("http://localhost:8080/getleavebyempid?employee_id=" + employee_id)
      .then((resp) => resp.json())
      .then((d) => { setleave(d); });
  }
  useEffect(() => {
    if (nm.role == "employee") {
      fetchdataofemployeeleave();
      fetchdataforemployee();
 
    }
  }, [employee_id]);


  /* manager/admin accept or reject leave of employee  login */
  const updatePendingLeaveOfEmployee = () => {

    fetch("http://localhost:8080/updateleave?leave_id=" + leave_id + "&status=" + status, {

      method: "POST",
      headers: { "content-type": "application/json" }
    })
      .then(resp => resp.json())
      .then((resp) => { setleaveupdate(resp); });
    if (leaveupdate != null)
      alert("Leave is " + status)
  }


  const approve = (a) => {


    setStatus("approve");
    setleave_id(a);

    updatePendingLeaveOfEmployee();

  }


  const Reject = (a) => {


    setStatus("reject")
    setleave_id(a)
    updatePendingLeaveOfEmployee()
  }

  /* we want to see the leave of individual employee search leave by id */
  useEffect(() => {
    if (nm.role == "manager") {
      fetch("http://localhost:8080/allemployee", {

        headers: { "content-type": "application/json" }
      })
        .then(req => req.json())
        .then(data => { setemployeedata(data) })
    }
  }, []);
  const FetchEmployee = () => {
    {
      setdisplaypendingleaves(false);
      setdisplayappliedleaves(false);
      setdisplaysearchleaves(true);
      fetch("http://localhost:8080/getleavebyempid?employee_id=" + Employee_id)
        .then(r => r.json())
        .then(d => { setleavesearch(d) });
    }
  }

  /* counting the number of leave taken */
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


  /*  manager leave apply*/
  const handleSubmitleavemanag = () => {
    fetch("http://localhost:8080/savemangleave", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        manager_id: persondata.m_id,
        start_date: start_date,
        end_date: end_date,
        nuleaves: nuleaves,
        leavetype_id: leavetype_id,
        comment: comment,
        status: status,

      })
    }, console.log(end_date, start_date))
      .then((resp) => resp.json())
      .then((data) => {
        setResult(data)
        if (Result == "true")
          alert("leave is updated, and assigned");
        else
          alert("leave didn't update");
        //{setleave(data);localStorage.setItem("loggedinemp", JSON.stringify(data))}
      });
  }
  /* counting the leaves and leaving the weekend days and holidays given by company */
  const workingDaysBetweenDates = () => {
    /* Two working days and an sunday (not working day) */
    var holidays = ['2023-01-01', '2023-01-15', '2023-01-16', '2023-01-26', '2023-04-14', '2023-04-22 ', '2023-05-01', '2023-06-29', '2023-08-15', '2023-09-19', '2023-10-02', '2023-10-24', '2023-11-12', '2023-11-13', '2023-12-25'];
    var startDate = parseDate(start_date);
    var endDate = parseDate(end_date);

    // Validate input
    if (endDate <= startDate) {
      setnuleavs(0);
      seterrorMessag("End date cannot be less then Start date")
    }
    else
      seterrorMessag("")
    // Calculate days between dates
    var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
    startDate.setHours(0, 0, 0, 1);  // Start just after midnight
    endDate.setHours(23, 59, 59, 999);  // End just before midnight
    var diff = endDate - startDate;  // Milliseconds between datetime objects    
    var days = Math.ceil(diff / millisecondsPerDay);

    // Subtract two weekend days for every week in between
    var weeks = Math.floor(days / 7);
    days -= weeks * 2;

    // Handle special cases
    var startDay = startDate.getDay();
    var endDay = endDate.getDay();

    // Remove weekend not previously removed.   
    if (startDay - endDay > 1) {
      days -= 2;
    }
    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay == 0 && endDay != 6) {
      days--;
    }
    // Remove end day if span ends on Saturday but starts after Sunday
    if (endDay == 6 && startDay != 0) {
      days--;
    }
    /* Here is the code */
    holidays.forEach(day => {
      if ((day >= start_date) && (day <= end_date)) {
        /* If it is not saturday (6) or sunday (0), substract it */
        if ((parseDate(day).getDay() % 6) != 0) {
          days--;
        }
      }
    });
    setnuleavs(days);
  }

  function parseDate(input) {
    // Transform date from text to date
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
  }
  useEffect(() => {
    fetch("http://localhost:8080/allLeavestype")
      .then(r => r.json())
      .then(d => { setLeavetype(d) })
  }, []);
  /* save  employee leave */
  const handleSubmitforemployee = () => {

    fetch("http://localhost:8080/saveleave", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        employee_id: persondata.E_id,
        start_date: start_date,
        end_date: end_date,
        nuleaves: nuleaves,
        leavetype_id: leavetype_id,
        comment: comment,
        status: status,
        manager_id: persondata.manager_id
      })
    }, console.log(end_date, start_date))
      .then((resp) => resp.json())
      .then((data) => {
        setResult(data)
        if (Result == "true")
          alert("leave is updated, and assigned");
        else
          alert("leave didn't update");
      });
  }

  const displaypendigleave = () => {

    setdisplaypendingleaves(true);
    setdisplayappliedleaves(false);
    setdisplaysearchleaves(false);

  }

  const displayappliedleave = () => {

    setdisplaypendingleaves(false);
    setdisplayappliedleaves(true);
    setdisplaysearchleaves(false);

  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark  " style={{ boxShadow: 10, color: "black" }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">

        <p style={{color:"lightblue",marginLeft:50}}><b>LeaveTracking Application</b></p>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              
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

              <li className="nav-item dropdown">
                <a style={{ backgroundColor: "white", color: "black", borderRadius: "8px" }} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {persondata.first_name}
                </a>

              </li>
              
            </ul>

          </div>
        </div>
      </nav>
      <div className=" p-1 " style={{ backgroundColor: "lightgray" }}>

      </div>


      <div className="row row-cols-1 row-cols-md-5 g-4 mt-1 " style={{ marginLeft: "5%" }} >
        <a href="#" style={{ textDecoration: "none", textAlign: "center" }} onClick={() => { displaypendigleave() }} >
          <div className="col">
            <div className="card h-100">
              <img src={clip} style={{ marginTop:10 , width: 40, marginLeft: '45%' }} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Pending Leaves</h5>
              </div>

            </div>
          </div>
        </a>
        <a href="#" style={{ textDecoration: "none", textAlign: "center" }} onClick={() => { displayappliedleave() }} >
          <div className="col">
            <div className="card h-100">
              <img src={app} style={{marginTop:10 , width: 40, marginLeft: '45%' }} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Applied Leaves</h5>
              </div>

            </div>
          </div>
        </a>
        <a href="#" style={{ textDecoration: "none", textAlign: "center" }} onClick={() => { }} >
          <div className="col">
            <div className="card h-100">
              <img src={pend} style={{marginTop:10, width: 40, marginLeft: '45%' }} className="card-img-top" alt="..." />
             
              <div className="card-body">
              <LeaveApplication/>
              </div>
            </div>

          </div></a>
      </div>

      <div className="container-fluid pt-2 mt-2" style={{ backgroundColor: "whitesmoke" }}>
        <label style={{ marginTop: 1, marginLeft: 20 }} htmlFor="Dept" className="form-label"><b>
          Employee :</b>
        </label>
        <select
          name="employee_id"
          onChange={(e) => {
            setEmployee_id(e.target.value);
          }}
          style={{ marginTop: 10 }}
        >
          < option value='Select' style={{ borderRadius: 5 }} >Select</option>
          {employeedata.map(
            (el) => {
              return (<option value={el.employee_id}>{el.first_name}  {el.last_name}</option>)
            }
          )}

        </select>
        <button type="button" className=' ' style={{  borderRadius: 4, marginLeft: "5px", marginTop: "0px", paddingInline: 4, paddingLeft:5 , paddingRight:5 }} onClick={FetchEmployee}>Search</button>
      </div>
      <div className="managerpage" id="" style={mangcondition ? { display: "block" } : { display: "none" }} >

        {/* pending leaves */}
        <div className="pendingleavemanag" id="pending" style={displaypendingleaves ? { display: "block" } : { display: "none" }}>
          <table className="table mt-" style={{border:1}}>
            <thead className="bg-dark text-light">

              <tr style={{ textAlign: "" }}>
                <th>Name</th>
                <th>Start Date</th>
                <th>End date</th>
                <th>Number of leave</th>
                <th>typle of leave</th>
                <th colSpan={2}>Status</th>

              </tr>
            </thead>

            {pendingLeaveofemployee.map((p, i) => {
              return (

                <tr key={i} style={i % 2 == 0 ? { textAlign: "", backgroundColor: "white" } : { textAlign: "", backgroundColor: "whitesmoke" }}>
                  <td>{p.employee.first_name + " " + p.employee.last_name}</td>
                  <td >{p.start_date}</td>
                  <td >{p.end_date}</td>
                  <td  >{p.nuleavs}</td>
                  <td >{p.leavetype.leave_type}</td>

                  <td ><button style={{ border: "none", borderRadius: 10, marginRight: 5 }} onClick={() => approve(p.leave_id)} ><img style={{ maxWidth: 40, maxHeight: 30 }} src={check} /></button>
                  </td>
                  <td > <button style={{ border: "none", borderRadius: 10 }} onClick={() => Reject(p.leave_id)}  ><img style={{ maxWidth: 40, maxHeight: 25 }} src={cross} /> </button></td>
                </tr>
              );
            })}
          </table>
        </div>

        <div className="searchbyidmanag" style={displaysearchleaves ? { display: "block" } : { display: "none" }}>
          {/*  <div className="container card w-25 ">
            <label htmlFor="Dept" className="form-label"><b>
              Employee :</b>
            </label>
            <select
              name="employee_id"
              onChange={(e) => {
                setEmployee_id(e.target.value);
              }}
            >
              <option value='Select'>Select Employee</option>
              {employeedata.map(
                (el) => {
                  return (<option value={el.employee_id}>{el.first_name}  {el.last_name}</option>)
                }
              )}

            </select>
            <button className='btn btn-primary mx-5' style={{ marginLeft: "10px", marginTop: "10px" }} onClick={FetchEmployee}>Search</button>
          </div>
              */}
          <table className="table  my-" >
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
            {leavesearch.map((p, i) => {

              return (
                <tr style={i % 2 == 0 ? { textAlign: "", backgroundColor: "white" } : { textAlign: "", backgroundColor: "whitesmoke" }}>
                  <td >{p.employee.first_name + " " + p.employee.last_name}</td>
                  <td >{p.start_date}</td>
                  <td >{p.end_date}</td>
                  <td >{p.nuleavs}</td>
                  <td >{p.leavetype.leave_type}</td>
                  <td >{p.status == "approve" ? <img style={{ maxWidth: 50, maxHeight: 45 }} src={check} /> : p.status == "pending" ? <img style={{ maxWidth: 50 }} src={pending} /> : <img style={{ maxWidth: 40 }} src={cross} />}</td>
                  {() => { callfun(p) }}
                </tr>

              );
            })}

            {/*  <tr style={{ backgroundColor: "lightcyan" }}>
              <td><b>Total leaves :</b>{countpl + countsl + countal}/20</td>
              <td><b>Remaning leave :</b>{20 - (countpl + countsl + countal)}/20</td>
              <td><b>Pl leaves :</b>{countpl}</td>
              <td><b>Al leaves :</b>{countal}</td>
              <td><b>Sl leave :</b>{countsl}</td>
              <td></td>
          </tr>*/}
          </table>
        </div>

        <div className="managerRequestleave" style={displaypendingleaves ? { display: "none" } : { display: "none" }}>
          <div className="container card my-2 w-25">
            <form className="register-form" >
              <h3 style={{ textAlign: "center", backgroundColor: "lightgray" }} className="mt-2"> Manager Leave Application </h3>
              <div className="mb-3 pt-2">
                <label htmlFor="Dept" className="form-label">
                  <b>Manager :  </b>
                </label>
                {" " + persondata.first_name + " " + persondata.last_name}

              </div>
              <div>

                <label><b>Start date:</b></label>
                <input
                  type="Date"
                  disableToolbar
                  mindate={new Date()}

                  value={start_date}
                  name="start_Date"
                  autoComplete="off"
                  onChange={(event) => {
                    setstart_date(event.target.value);
                  }}
                />
                <br /><span style={{
                  fontWeight: 'bold',
                  color: 'red',
                }}>{ }</span>
              </div>
              <br />
              <label><b>End date:</b></label>
              <input
                type="Date"
                name="end_Date"
                autoComplete="off"
                onChange={(event) => {
                  setend_date(event.target.value);
                }}

              /> <span className="btn btn-secondary   " onClick={() => workingDaysBetweenDates()}>
                Leaves
              </span> <br /><span style={{

                color: 'red',
              }}>{errorMessag}</span>


              <div className="mb-3 pt-4 ">
                <label htmlFor="Dept" className="form-label">
                  <b>Number of Leaves:</b>
                </label>
                {nuleaves}
              </div>

              <div className="mb-3">
                <label htmlFor="Dept" className="form-label">
                  <b>leave type:</b>
                </label>
                <select
                  name="leavetype_id"
                  onChange={(e) => {
                    setleavetype_id(e.target.value);
                  }}>
                  <option value='Select'>Type of Leave</option>
                  {leavetype.map(
                    (el) => {
                      return <option value={el.l_id}>{el.leave_type}</option>;
                    }
                  )}
                </select>
              </div>


              <div>
                <label htmlFor="reason" className="form-label"><b>
                  Reason : </b>
                </label>
                <input
                  type="text"
                  name="reason"
                  autoComplete="off"
                  onChange={(event) => {
                    setcomment(event.target.value);
                  }}
                />

              </div>
              <br />
              <span className="btn btn-primary  container " onClick={() => handleSubmitleavemanag()}>
                Submit
              </span>
            </form>
          </div>
        </div>
      </div>
      <div className="selfleavemanag" style={displayappliedleaves ? { display: "block" } : { display: "none" }}>
        <table className="table  my-">
          <thead className="bg-dark text-light">

            <tr>

              <th>Start Date</th>
              <th>End date</th>
              <th>Number of leave</th>
              <th>typle of leave</th>
              <th>Status</th>

            </tr>
          </thead>

          {leave.map((p, i) => {

            return (

              <tr key={i} style={i % 2 == 0 ? { textAlign: "", backgroundColor: "white" } : { textAlign: "", backgroundColor: "whitesmoke" }}>

                <td >{p.start_date}</td>
                <td >{p.end_date}</td>
                <td >{p.nuleavs}</td>
                <td >{p.leavetype.leave_type}</td>
                <td >{p.status == "approve" ? <img style={{ maxWidth: 50, maxHeight: 45 }} src={check} /> : p.status == "pending" ? <img style={{ maxWidth: 50 }} src={pending} /> : <img style={{ maxWidth: 40 }} src={cross} />}</td>
                {callfun(p)}
              </tr>
            )
          })}

          {/* <tr style={{ backgroundColor: "lightcyan" }} >
              <td><b>Total leaves :</b>{countpl + countsl + countal}/20</td>
              <td><b>Remaning leave :</b>{20 - (countpl + countsl + countal)}/20</td>
              <td><b>Pl leaves :</b>{countpl}</td>
              <td><b>Al leaves :</b>{countal}</td>
              <td><b>Sl leave :</b>{countsl}</td>
              <td></td>
          </tr>*/}


        </table>
      </div>
      <div className="employeepage" style={empcondition ? { display: "block" } : { display: "none" }}>
        <div>
          <div className="container card my-2 w-25">
            <form className="register-form" >
              <h3 style={{ textAlign: "center", backgroundColor: "lightgray" }} className="mt-2"> Leave Application </h3>
              <div className="mb-3 pt-2">
                <label htmlFor="Dept" className="form-label">
                  <b>Employee :  </b>
                </label>
                {" " + persondata.first_name + " " + persondata.last_name}

              </div>


              <div>

                <label><b>Start date:</b></label>
                <input
                  type="Date"
                  disableToolbar
                  minDate={new Date()}

                  value={start_date}
                  name="start_Date"
                  autoComplete="off"
                  onChange={(event) => {
                    setstart_date(event.target.value);
                  }}
                />
                <br /><span style={{
                  fontWeight: 'bold',
                  color: 'red',
                }}>{ }</span>
              </div>
              <br />
              <label><b>End date:</b></label>
              <input
                type="Date"
                name="end_Date"
                autoComplete="off"
                onChange={(event) => {
                  setend_date(event.target.value);
                }}

              /> <span className="btn btn-secondary   " onClick={() => workingDaysBetweenDates()}>
                Leaves
              </span> <br /><span style={{

                color: 'red',
              }}>{errorMessag}</span>


              <div className="mb-3 pt-4 ">
                <label htmlFor="Dept" className="form-label">
                  <b>Number of Leaves:</b>
                </label>
                {nuleaves}
              </div>

              <div className="mb-3">
                <label htmlFor="Dept" className="form-label">
                  <b>leave type:</b>
                </label>
                <select
                  name="leavetype_id"
                  onChange={(e) => {
                    setleavetype_id(e.target.value);
                  }}>
                  <option value='Select'>Type of Leave</option>
                  {leavetype.map(
                    (el) => {
                      return <option value={el.l_id}>{el.leave_type}</option>;
                    }
                  )}
                </select>
              </div>


              <div>
                <label htmlFor="Dept" className="form-label"><b>
                  Reason : </b>
                </label>
                <input
                  type="text"
                  name="reason"
                  autoComplete="off"
                  onChange={(event) => {
                    setcomment(event.target.value);
                  }}
                />

              </div>
              <br />
              <div className="mb-3">
                <label htmlFor="Dept" className="form-label">
                  <b>Manager:</b>
                </label>
                {managerdata.first_name + " " + managerdata.last_name}
              </div>
              <span className="btn btn-primary  container " onClick={() => handleSubmitforemployee()}>
                Submit
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}

export default LandingPage;