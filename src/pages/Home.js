import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Sidenav from '../sidebar';

import Button from '@mui/material/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Autocomplete, Stack, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";





function createData(id, firstName, lastName, emailAddress, phoneNumber, address1,) {
  return {
    id,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    address1
  };
}

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return b[1] - a[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [

  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'firstName',
    numeric: true,
    disablePadding: false,
    label: 'First Name',
  },
  {
    id: 'lastName',
    numeric: true,
    disablePadding: false,
    label: 'Last Name',
  },
  {
    id: 'emailAddress',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'phoneNumber',
    numeric: true,
    disablePadding: false,
    label: 'Phone',
  },

  {
    id: 'address1',
    numeric: true,
    disablePadding: false,
    label: 'Address'
  },

  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell >

        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>

        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <></>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Home() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.firstName);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, firstName) => {
    const selectedIndex = selected.indexOf(firstName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, firstName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };


  const [rows, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);



  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data.reverse());
  };



  console.log(rows, "user data....")

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };




  const isSelected = (firstName) => selected.indexOf(firstName) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  const filterData = (v) => {
    if (v) {
      setUser([v]);
    } else {
      setUser([]);
      loadUsers();
    }
  };

  const navigate = useNavigate()
  const addUserNavigate = () => {
    navigate('/users/add-user')
  }



  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />

      <Paper sx={{ width: '100%', marginTop: '10%' }}>


        <div style={{ marginTop: '10%px' }} >
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            {/* serach by first name */}

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.firstName || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search by first name..." />
              )}
            />


            {/* serach by last name */}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.lastName || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search by last name..." />
              )}
            />

            {/* serach by email... */}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.emailAddress || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search by email..." />
              )}
            />



            {/* serach by email... */}
            {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.phoneNumber || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search by phone..." />
              )}
            /> */}


            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={addUserNavigate}>
              Add
            </Button>
          </Stack>
        </div>

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          // size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                // const isItemSelected = isSelected(row.name);
                // const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                  // onClick={(event) => handleClick(event, row.name)}
                  // role="checkbox"
                  // aria-checked={isItemSelected}
                  // tabIndex={-1}
                  // key={row.name}
                  // selected={isItemSelected}
                  // sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      {/* <Checkbox
                        color="primary"
                        
                      /> */}
                    </TableCell>
                    <TableCell
                    // component="th"
                    // id={labelId}
                    // scope="row"
                    // padding="none"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.firstName}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">{row.emailAddress}</TableCell>
                    <TableCell align="right">{row.phoneNumber}</TableCell>
                    <TableCell align="right">{row.address1}</TableCell>

                    <TableCell align="right">
                      <Link
                        class="btn btn-outline-primary mr-2"
                        to={`/users/edit/${row.id}`}

                      >
                        {/* /${row.id} */}
                        Edit
                      </Link>
                      <Link
                        class="btn btn-danger"
                        onClick={() => deleteUser(row.id)}

                      >
                        Delete
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
