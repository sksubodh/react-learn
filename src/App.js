import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  Switch,
  useNavigate,
  redirect,
  Navigate

} from "react-router-dom";

import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import { useEffect } from 'react';




function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<Home />} ></Route>
          {/* <Route exact redirect to="/user" match='full' path="/user" element={<Home />} ></Route> */}
          <Route  path="/about" element={<About />} ></Route>
          <Route  path="/contact" element={<Contact />} ></Route>
          <Route  path="/users/add-user" element={<AddUser />} ></Route>
          <Route  path="/users/edit/:id" element={<EditUser />} ></Route>
          {/* <Redirect from="/users" to="/users" /> */}
          <Route path="/*" element={<Navigate to="/users" />} />
        </Routes>


      </BrowserRouter>

    </>
  );
}

export default App;
