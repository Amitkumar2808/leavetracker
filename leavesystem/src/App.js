
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ContactUs from './component/ContactUs';
import LandingPage from './component/LandingPage';

import LeavApplication from './component/LeaveApplication';
import LeaveById from './component/LeaveById';
import LeaveByIdSerch from './component/LeaveByIdSearch';
import LeaveofManager from './component/LeaveofManager';
import Leaves from './component/Leaves';
import LeaveStatus from './component/LeaveStatus';
import LeaveStatusAdmin from './component/LeaveStatusAdmin';
import LeaveStatusManager from './component/LeaveStatusManager';
import Login from './component/Login';
import ManagerLeave from './component/ManagerLeave';
import ManagerLeaveApplication from './component/ManagerLeaveApplication';
import Register from './component/RegisterEmplooye';
import RegisterManager from './component/RegisterManager';


function App() {
  return (
    <div>

<Routes>
<Route path="*" element={<Login/>} exact></Route>
<Route path='/' element={<Login/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path='/registere' element={<Register/>}></Route>
<Route path='/registerm' element={<RegisterManager/>}></Route>
<Route path='/leave' element={<Leaves/>}></Route>
<Route path='/leavebyid' element={<LeaveById/>}></Route>
<Route path='/leaverequest' element={<LeavApplication/>}></Route>
<Route path='/leavestatus' element={<LeaveStatus/>}></Route>
<Route path='/leavebyidsearch' element={<LeaveByIdSerch/>}></Route>
<Route path='/leavestatusadmin' element={<LeaveStatusAdmin/>}></Route>
<Route path='/leaveofmanager' element={<LeaveofManager/>}></Route>
<Route path='/leavestatusmanager' element={<LeaveStatusManager/>}></Route>
<Route path='/managerleave' element={<ManagerLeave/>}></Route>
<Route path='/managerleaveapp' element={<ManagerLeaveApplication/>}></Route>
<Route path='/home' element={<LandingPage/>}></Route>
<Route path='/Contact' element={<ContactUs/>}></Route>
</Routes>
    </div>
  );
}

export default App;
