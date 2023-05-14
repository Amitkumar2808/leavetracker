import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';


const ManagerLeaveApplication = () => {
    let nm = JSON.parse(localStorage.getItem("loggedinemp"));
    const [employeelog, setemployeelog] = useState([]);
    const navigate = useNavigate();
    let logout = () => {
        localStorage.removeItem("loggedinuser");
    }

    const [LeaveType, setLeavetype] = useState([]);
    const [Result, setResult] = useState("false");
    const [employee_id, setemployee_id] = useState(nm.manager_id);
    const [start_date, setstart_Date] = useState("");
    const [end_date, setend_Date] = useState("");
    const [nuleaves, setnuleavs] = useState(0);
    const [leavetype_id, setleavetype_id] = useState(0);
    const [comment, setreason] = useState("ss");
    const [status, setstatus] = useState("pending");
    const [errorMessage, seterrorMessage] = useState("");
    const [errorMessag, seterrorMessag] = useState("");


    useEffect(() => {
        fetch("http://localhost:8080/allLeavestype")
            .then(r => r.json())
            .then(d => { setLeavetype(d) })
    }, []);



    const handleSubmit = () => {
        //event.preventDefault();


        fetch("http://localhost:8080/savemangleave", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                manager_id: employee_id,
                start_date: start_date,
                end_date: end_date,
                nuleaves: nuleaves,
                leavetype_id: leavetype_id,
                comment: comment,
                status: status,

            })
        }, console.log(employee_id, end_date, start_date))
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
        return setnuleavs(days);
      }
    
      function parseDate(input) {
        // Transform date from text to date
      var parts = input.match(/(\d+)/g);
      // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
      return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
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
                                    onClick={() => { navigate("/manager") }}
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



                            <li className="nav-item dropdown">
                                <a style={{ backgroundColor: "white", color: "black", borderRadius: "8px" }} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {nm.first_name}
                                </a>

                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
            <div >

                <div className="container card my-2 w-25">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <h3 style={{ textAlign: "center", backgroundColor: "lightgray" }} className="mt-2"> Leave Application </h3>
                        <div className="mb-3 pt-2">
                            <label htmlFor="Dept" className="form-label">
                                <b>Manager :  </b>
                            </label>
                            {" " + nm.first_name + " " + nm.last_name}

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
                                    setstart_Date(event.target.value); 
                                }}
                            />
                            <br /><span style={{
                                fontWeight: 'bold',
                                color: 'red',
                            }}>{}</span>
                        </div>
                        <br />
                        <label><b>End date:</b></label>
                        <input
                            type="Date"
                            name="end_Date"
                            autoComplete="off"
                            onChange={(event) => {
                                setend_Date(event.target.value); workingDaysBetweenDates();
                            }}

                        /><br /><span style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>{errorMessag}</span>



                        <div className="mb-3 pt-4 ">
                            <label htmlFor="Dept" className="form-label">
                                <b>Number of Leaves:</b>
                            </label>
                            <input type="number" style={{ maxWidth: 80 }} name="nuleavs" onChange={(event) => {
                                setnuleavs(event.target.value);
                            }} />
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
                                {LeaveType.map(
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
                                    setreason(event.target.value);
                                }}
                            />

                        </div>
                        <br />




                        <span className="btn btn-primary  container " onClick={() => handleSubmit()}>
                            Submit
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ManagerLeaveApplication;