import _ from "lodash";
import React, { Component } from "react";

//import { Link } from "react-router-dom";

import { getUsers } from "../services/userService";
import { getDealers } from "../services/dealerService";

import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";

import TableBody from "@material-ui/core/TableBody";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import "typeface-roboto";

class ListAllUsers extends Component {
  state = {
    users: [],
    dealers: [],
  };

  async componentDidMount() {
    const { data: users } = await getUsers();
    //console.log("Users Returned", users);

    const { data: dealers } = await getDealers();
    //console.log("Dealers Returned", dealers);

    this.setState({
      users,
      dealers,
    });
  }

  render() {
    const u = this.state.users;
    const d = this.state.dealers;

    const { length: count } = this.state.users;

    if (count === 0) return <p>There are no Users in the database</p>;

    const dealername = (id) => {
      //console.log(id);
      const m = _.find(u, ["_id", id]).dealerId;

      if (m === undefined) return " - ";

      const dn = _.find(d, ["_id", m]).dealername;
      return dn;
    };

    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <h2>List of Users</h2>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Dealer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {u.map((x) => (
                  <TableRow key={x._id}>
                    <TableCell align="right"> {x.name}</TableCell>
                    <TableCell align="right"> {x.email}</TableCell>
                    <TableCell align="right"> {dealername(x._id)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ListAllUsers;
