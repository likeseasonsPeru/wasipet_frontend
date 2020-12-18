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
import EditMessage from "./EditMessage";
import DisableMessage from "./DisableMessage";
/* import AddBanner from "./AddBanner"; */

const TableMessage = () => {
  const [token] = useState(getCookie("token"));
  const [mensaje, setMensaje] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    // Where we're fetching data from
    fetch(`${API}/mensaje`, {
      method: "GET",
      headers: headers
    })
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data => {
        data.data && setMensaje(data.data)
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
      </Grid>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Contenido</TableCell>
              <TableCell align="center">Acción</TableCell>
              <TableCell align="center">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading ? (
                  <TableRow hover role="checkbox" key={mensaje._id}>
                    <TableCell key={mensaje.title} align="center">
                      {mensaje.title}
                    </TableCell>
                    <TableCell key={Math.random()} align="center">
                      <EditMessage mensaje={mensaje} />
                    </TableCell>
                    <TableCell key={Math.random()} align="center">
                      <DisableMessage mensaje={mensaje} />
                    </TableCell>
                  </TableRow>
                
            ) : (
              <TableRow hover role="checkbox">
                <TableCell>... Loading</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default TableMessage;
