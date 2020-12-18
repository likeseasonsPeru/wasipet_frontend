import React, { useState, useEffect } from "react";
import { API } from "../../config";
import { getCookie } from "../../utils/cookie";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import { Pagination } from "@material-ui/lab";
import TableRow from "@material-ui/core/TableRow";
//import LookUser from './ViewDetailsUser';
import ExportCSV from "../General/ExportExcel";
import Grid from "@material-ui/core/Grid";
import EditBanner from "./EditBanner";
import RemoveBanner from "./RemoveBanner";
import AddBanner from "./AddBanner";

const TableBanners = () => {
  const [token] = useState(getCookie("token"));
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //Pagination
  const [perPage] = useState(25);
  const [page, setPage] = useState(1);
  const [currentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [contentArray, setContentArray] = useState([]);

  const changePage = page => {
    setContentArray(banners.slice(perPage * (page - 1), perPage * page));
    setPage(page);
  };

  useEffect(() => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    // Where we're fetching data from
    fetch(`${API}/bannersWasi`, {
      method: "GET",
      headers: headers
    })
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data => {
        const reverseData = data.reverse();
        setBanners(reverseData);
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
        {/* <Grid item xs={4}>
          <ExportCSV csvData={downloadBrands} fileName={"marcas-WASIPET"} />
        </Grid>
        <Grid item xs={4} alignItems={"right"}>
          Total: {brands.length} marcas registradas
        </Grid> */}
        <Grid item xs={4}>
          <AddBanner />
        </Grid>
      </Grid>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Orden</TableCell>
              <TableCell align="center">Titulo</TableCell>
              <TableCell align="center">Foto</TableCell>
              <TableCell align="center">Fecha de registro</TableCell>
              <TableCell align="center">Acción</TableCell>
              <TableCell align="center">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading ? (
              contentArray.map((banner, index) => {
                return (
                  <TableRow hover role="checkbox" key={banner._id}>
                    <TableCell key={index} align="center">
                      {perPage * (page - 1) + (index + 1)}
                    </TableCell>
                    <TableCell key={banner.title} align="center">
                      {banner.title}
                    </TableCell>
                    <TableCell key={Math.random()} align="center">
                      {banner.imagen ? (
                        <img
                          src={`https://wasipetapp.com/api/public/${banner.imagen}`}
                          style={{ width: "40px" }}
                        />
                      ) : (
                        "Sin foto"
                      )}
                    </TableCell>
                    <TableCell key={banner.createdAt} align="center">
                      {new Date(banner.createdAt).toLocaleString("es-PE")}
                    </TableCell>
                    <TableCell key={Math.random()} align="center">
                      <EditBanner banner={banner} />
                    </TableCell>
                    <TableCell key={Math.random()} align="center">
                      <RemoveBanner banner={banner} />
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

export default TableBanners;
