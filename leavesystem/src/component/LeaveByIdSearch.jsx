
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LeaveByIdSerch = () => {
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
    const [employeedata, setemployeedata] = useState([]);
    const [employee_id, setEmployee_id] = useState(0);
    const [leave, setLeave] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/allemployee", {

            headers: { "content-type": "application/json" }
        })
            .then(req => req.json())
            .then(data => { setemployeedata(data) })
    }, []);

    const FetchEmployee = () => {

        if (employee_id == null)
            alert("please select any employee")
        else {

            fetch("http://localhost:8080/getleavebyempid?employee_id=" + employee_id)
                .then(r => r.json())
                .then(d => { setLeave(d) });
        }
    }
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
            <div className="pt-3"></div>
            <div className="container card w-25 ">
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
                            <td style={{backgroundColor:"lightseagreen"}}>{p.employee.first_name + " " + p.employee.last_name}</td>
                  <td  style={{backgroundColor:"lightgray"}}>{p.start_date}</td>
                  <td style={{backgroundColor:"lightgray"}}>{p.end_date}</td>
                  <td style={{backgroundColor:"lightskyblue"}}>{p.nuleavs}</td>
                  <td style={{backgroundColor:"lightpink"}}>{p.leavetype.leave_type}</td>
                  <td style={{backgroundColor:"lightgoldenrodyellow"}}>{p.status}</td>
                            {callfun(p)}
                        </tr>

                    );
                })}

                <tr  style={{backgroundColor:"lightcyan"}}>
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
export default LeaveByIdSerch;