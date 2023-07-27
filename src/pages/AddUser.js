import React, { useState } from "react";
import axios from 'axios'
// import { useHistory } from "react-router-dom";

import Box from '@mui/material/Box';
import Sidenav from '../sidebar'

import { useNavigate } from 'react-router-dom';
import { Backdrop, Button, Container, Stack } from "@mui/material";
import HorizontalLinearStepper from "./stepper";

const AddUser = () => {
  // let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: ""
  });

  const { name, username, email, phone, website } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()


  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:3003/users", user);

    navigate("/");
  };


  const backTohome = () => {
    navigate("/")
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />

      {/* <div style={{ height: 400, width: '100%', marginTop:'10%' }}> */}
      <div className="container" style={{ marginTop: '5%' }}>
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <Button variant="contained" onClick={backTohome}>
            Back
          </Button>
        </Stack>

        <Container>
          <Box sx={{ bgcolor: '#cfe8fc', padding:'30px 30px 30px 30px' }}>
            <HorizontalLinearStepper />

          </Box>
        </Container>
        {/* <div className="w-75 mx-auto shadow p-5">
          <h3 className="text-center mb-4">Add A User</h3>
          <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input style={{ marginTop: '2%' }}
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your Name"
                name="name"
                value={name}
                onChange={e => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input style={{ marginTop: '2%' }}
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your Username"
                name="username"
                value={username}
                onChange={e => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input style={{ marginTop: '2%' }}
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter Your E-mail Address"
                name="email"
                value={email}
                onChange={e => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input style={{ marginTop: '2%' }}
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your Phone Number"
                name="phone"
                value={phone}
                onChange={e => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input style={{ marginTop: '2%' }}
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your Website Name"
                name="website"
                value={website}
                onChange={e => onInputChange(e)}
                required
              />
            </div>
            <button className="btn btn-primary btn-block" style={{ marginTop: '2%' }}>Add User</button>
          </form>
        </div> */}
      </div>
    </Box>
  );
};

export default AddUser;

