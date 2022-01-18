import React, { useState, useEffect } from "react";
import { API } from "../../config";
import { getCookie } from "../../utils/cookie";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Grid from "@material-ui/core/Grid";
import { Pagination } from "@material-ui/lab";
import TableRow from "@material-ui/core/TableRow";
import AddShop from './AddShop'
import EditShop from "./EditShop";

const TableShops = () => {
  const [token, setToken] = useState(getCookie("token"));
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [perPage] = useState(25);
  const [page, setPage] = useState(1);
  const [currentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [contentArray, setContentArray] = useState([]);

  const changePage = (page) => {
    setContentArray(shops.slice(perPage * (page - 1), perPage * page));
    setPage(page);
  };

  useEffect(() => {
    var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      };
      fetch(`${API}/shops`, {
        method: "GET",
        headers: headers
      })
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we update the users state
        .then(data => {
          const reverseData = data.reverse();
          setShops(reverseData);
          setContentArray(
            reverseData.slice(perPage * (currentPage - 1), perPage * currentPage)
          );
          setPages(
            data.length % perPage === 0
              ? Math.floor(data.length / perPage)
              : Math.floor(data.length / perPage) + 1
          );
          setIsLoading(false);
        })
        // Catch any errors we hit and update the app
        .catch(error => setError(error));
  }, []);

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        spacing={1}
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={4}>
          <AddShop />
        </Grid>
      </Grid>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Orden</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Ruc</TableCell>
              <TableCell align="center">Direccion</TableCell>
              <TableCell align="center">Distrito</TableCell>
              <TableCell align="center">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading ? (
              contentArray.map((shop, index) => {
                return (
                  <TableRow hover role="checkbox" key={shop._id}>
                    <TableCell key={index} align="center">
                      {perPage * (page - 1) + (index + 1)}
                    </TableCell>
                    <TableCell key={shop.name} align="center">
                      {shop.name}
                    </TableCell>
                    <TableCell key={shop.ruc} align="center">
                      {shop.ruc}
                    </TableCell>
                    <TableCell key={shop.direction} align="center">
                      {shop.direction}
                    </TableCell>
                    <TableCell key={shop.ruc} align="center">
                      {shop.ruc}
                    </TableCell>
                    <TableCell key={Math.random()} align="center">
                      <EditShop shop={shop} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow hover role="checkbox">
                <TableCell>... Loading</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={pages} onChange={(event, page) => changePage(page)} />
    </React.Fragment>
  );
};

export default TableShops;
