import _ from "lodash";
import React, { Component } from "react";

import { Link } from "react-router-dom";

import { getAllQuotes } from "../services/allQuotesService";
import { getUsers } from "../services/userService";
import { getDealers } from "../services/dealerService";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
//import TableHead from "@material-ui/core/TableHead";

import TableBody from "@material-ui/core/TableBody";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";

import Reassignquote from "./reassignquote";
import "typeface-roboto";
import { reassignQuote } from "../services/quotesService";

class AllQuotes extends Component {
  state = {
    quotes: [],
    users: [],
    dealers: [],
  };

  async componentDidMount() {
    const { data: quotes } = await getAllQuotes();
    console.log("Quotes Returned", quotes);

    const { data: users } = await getUsers();
    console.log("Users Returned", users);

    const { data: dealers } = await getDealers();
    console.log("Dealers Returned", dealers);

    this.setState({
      quotes,
      users,
      dealers,
    });
  }

  handleReassign = (quoteid, newowner) => {
    //console.log("Reassign - ", quoteid, " ", newowner);

    const thequote = _.find(this.state.quotes, ["_id", quoteid]);

    if (thequote === undefined) return;

    //console.log("the Quote", thequote);
    thequote.userid = newowner;
    this.setState({ thequote });
    //console.log("the Amended Quote", thequote);

    reassignQuote(quoteid, newowner);
  };

  render() {
    const t = this.state.quotes;
    const u = this.state.users;
    const d = this.state.dealers;
    //console.log("LL", t);

    const { length: count } = this.state.quotes;

    if (count === 0) return <p>There are no Quotes in the database</p>;

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
            <h2>List of Quotes</h2>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date & Time</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Dealer</TableCell>
                  <TableCell align="right">Model</TableCell>
                  <TableCell align="right">Cost</TableCell>
                  <TableCell align="right">Reassign</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {t.map((x) => (
                  <TableRow key={x._id}>
                    <TableCell>
                      <Link to={{ pathname: "/quotes/" + x._id }}>
                        <Button>
                          {_.slice(x.updatedAt, 0, 10)}{" "}
                          {_.slice(x.updatedAt, 11, 19)}
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      {_.find(u, ["_id", x.userid]).name}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      {_.find(u, ["_id", x.userid]).email}
                    </TableCell>
                    <TableCell align="right"> {dealername(x.userid)}</TableCell>
                    <TableCell align="right"> {x.model}</TableCell>
                    <TableCell align="right">
                      {" £"}
                      {x.price}
                    </TableCell>
                    <TableCell align="right">
                      <Reassignquote
                        quoteid={x._id}
                        quoteowner={x.userid}
                        users={u}
                        onReassign={this.handleReassign}
                      />
                    </TableCell>
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

export default AllQuotes;
