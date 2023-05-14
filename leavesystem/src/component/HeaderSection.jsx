import { useNavigate } from "react-router-dom";

const HeaderSection=()=>{
    const navigate = useNavigate();
return(
<div>
<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/*<Blogo />*/}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <button
                  type="button"
                  className="btn btn-light "
                  aria-current="page"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </li>
              <li className="nav-item mx-2">
                <button
                  type="button"
                  className="btn btn-light "
                  aria-current="page"
                  onClick={() => navigate("/patientregister")}
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
)
}
export default HeaderSection;