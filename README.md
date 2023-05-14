1
public/index.html
src/index.js

2
index.html-- pass bootstrp link for css,js

3
create menu comp & export

4) pass navbar from bootstrp into menu comp

5) index.js
import React from "react";
import  ReactDOM  from "react-dom/client";


import Menu from "./components/Menu";

5-1) 
create 3 components ( login ,landingpage,leaveapplication,headersection,leavebyid,contactus,footersection,leavebyidsearch,leaveofmanager,leaves,leavesstatus,leavestatusadmin,managerleave,managerleaveapplication,registeremployee)
use this plugin:ES7 React/Redux/GraphQL/

6) https://reactrouter.com/en/main/start/tutorial

npm install react-router-dom
check package.json after installation



7) import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; in index.js

8) createBrowserRouter() for route creations
const router = createBrowserRouter([
  {
    path:"/",
    element:<Menu />,
    children:[
      {
        path:'/login-page',
        element:<Login />
      },
      {
        path:'/landing-page',
        element:<landing />
      },
      {
        path:'/',
        element:<Home />
      },
    ]
  } 
])

10) render your const router through
<RouterProvider router={router} />

11) Menu component set 
<outlet  />

12) import React from "react";
//import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/login.css';
import logo from '../images/Logo.png';
import ForgetPassword from "./ForgetPassoward";



useEffect(()=>{
    // console.log('CALL API ONLY ONCE');

    fetch('http://localhost:8000/api/users/')
    .then(res=>res.json())
    .then(val=>console.log(val))
    .catch(err=>console.log(err))
  } , []);