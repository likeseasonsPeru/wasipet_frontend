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
import Grid from "@material-ui/core/Grid";
import ExportCSV from "../General/ExportExcel";
import AddService from "./AddService";
import EditService from "./EditService";
import DisableService from "./DisableService";

const TableServices = () => {
  const [token] = useState(getCookie("token"));
  const [services, setServices] = useState([]);
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadServices, setDownloadServices] = useState([]);
  //Pagination
  const [perPage] = useState(25);
  const [page, setPage] = useState(1);
  const [currentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [contentArray, setContentArray] = useState([]);

  const changePage = (page) => {
    setContentArray(products.slice(perPage * (page - 1), perPage * page));
    setPage(page);
  };

  const formatServices = async (data) => {
    let newDownload = await data.map((service) => {
      var newObj = {};
      newObj["ID del servicio"] = data._id;
      newObj["Nombre del servicio"] = data.name;
      newObj["Descripción del servicio"] = data.description;
      newObj["Tipo de mascota"] = data.petType === "Dog" ? "Perro" : "Gato";
      newObj["Imagen"] = `https://wasipetapp.com/api/public/${service.image}`;
      return newObj;
    });
    setDownloadServices(newDownload);
  };

  const getStores = () => {
    try {
      var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      fetch(`${API}/shops`, {
        method: "GET",
        headers: headers,
      })
        // We get the API response and receive data in JSON format...
        .then((response) => response.json())
        // ...then we update the users state
        .then((data) => {
          setShops(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    // Where we're fetching data from
    fetch(`${API}/services/ocultos`, {
      method: "GET",
      headers: headers,
    })
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) => {
        const reverseData = data.reverse();
        setServices(reverseData);
        setContentArray(
          reverseData.slice(perPage * (currentPage - 1), perPage * currentPage)
        );
        setPages(
          data.length % perPage === 0
            ? Math.floor(data.length / perPage)
            : Math.floor(data.length / perPage) + 1
        );
        setIsLoading(false);
        /* formatServices(data); */
      })
      // Catch any errors we hit and update the app
      .catch((error) => setError(error));
    getStores();
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
       {/*  <Grid item xs={4}>
          <ExportCSV csvData={downloadProducts} fileName={"marcas-WASIPET"} />
        </Grid> */}
        <Grid item xs={4} alignItems={"right"}>
          Total: {services.length} servicios registrados
        </Grid>
        <Grid item xs={4}>
          <AddService stores={shops} />
        </Grid>
      </Grid>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Orden</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Foto</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acción</TableCell>
              <TableCell align="center">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading ? (
              contentArray.map((service, index) => {
                return (
                  <TableRow hover key={service._id}>
                    <TableCell key={index} align="center">
                      {perPage * (page - 1) + (index + 1)}
                    </TableCell>
                    <TableCell key={service.name} align="center">
                      {service.name}
                    </TableCell>
                    <TableCell key={Math.random()} align="center">
                      {service.photo ? (
                        <img
                          src={`https://wasipetapp.com/api/public/${service.photo}`}
                          style={{ width: "40px" }}
                        />
                      ) : (
                        "Sin foto"
                      )}
                    </TableCell>
                    <TableCell key={Math.random()} align="center">
                      {service.active == true ? (
                        <div style={{ color: "green", fontWeight: "bold" }}>
                          Activo
                        </div>
                      ) : (
                        <div style={{ color: "red", fontWeight: "bold" }}>
                          Desactivado
                        </div>
                      )}
                    </TableCell>
                    <TableCell key={Math.random()} align="center">
                      <DisableService service={service} />
                    </TableCell>
                    <TableCell key={Math.random()} align="center">
                      <EditService service={service} stores={shops} />
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

export default TableServices;
