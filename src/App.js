import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
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

// const navigate = useNavigate();

// useEffect(() => {
//   navigate('/users')
// }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact={true} path="/users" element={<Home />} ></Route>
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
