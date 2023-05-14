import { useNavigate } from "react-router-dom";


const FooterSection=()=>{
  const navigate = useNavigate();
    return(
        <div>
             <footer >
        <ul className="nav justify-content-center  bg-primary ">
          <li className="nav-item">
            <a
              onClick={() => navigate("/Landing")}
              className="nav-link px-2 text-light"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link px-2 text-light">
              Features
            </a>
          </li>

          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="#"
              className="nav-link px-2 text-light" >
              Contact Us
            </a>
          </li>
        </ul>
        <p
          className="text-center  bg-primary text-light"
          style={{ margin: "unset" }}
        >
          © 2023 Company, Inc
        </p>
      </footer>
        </div>
    )
}
export default FooterSection;