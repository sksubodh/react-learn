import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useHistory, useParams } from "react-router-dom";
import Sidenav from '../sidebar';
import { Box, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

const EditUser = () => {
  // let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    address1: ""
  });

  const { firstName, lastName, emailAddress, phoneNumber, address1 } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/users/${id}`, user);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(result.data);
  };

  const backTohome = () => {
    navigate("/")
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />

      <div className="container" style={{ marginTop: '5%' }}>
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <Button variant="contained" onClick={backTohome}>
            Back
          </Button>
        </Stack>


        <div className="container" style={{ marginTop: '0%' }}>
          <div className="w-75 mx-auto shadow p-5">
            <h2 className="text-center mb-4">Edit A User</h2>
            <form onSubmit={e => onSubmit(e)}>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your First Name"
                  name="firstName"
                  value={firstName}
                  onChange={e => onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={e => onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter Your E-mail Address"
                  name="emailAddress"
                  value={emailAddress}
                  onChange={e => onInputChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Phone Number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={e => onInputChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Address"
                  name="address1"
                  value={address1}
                  onChange={e => onInputChange(e)}
                  required
                />
              </div>
              <button className="btn btn-warning btn-block">Update User</button>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default EditUser;





