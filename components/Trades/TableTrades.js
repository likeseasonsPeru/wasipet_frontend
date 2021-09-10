import React from "react";
import { API } from "../../config";
import { getCookie } from "../../utils/cookie";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LookTrade from "./ViewDetailsTrade";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";
import { Pagination } from "@material-ui/lab";
import Checkbox from "@material-ui/core/Checkbox";
import { Select, MenuItem } from "@material-ui/core";
import ExportCSV from "../General/ExportExcel";
import Router from "next/router";
class TableTrades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: getCookie("token"),
      trades: {},
      emailSearch: "",
      isLoading: true,
      error: null,
      perPage: 25,
      currentPage: 1,
      pages: null,
      page: 1,
      selectedTrades: [],
      currentData: [],
      downloadTrades: [],
      modal: false,
      idCanjetoReturn: null,
      cancelSearch: false,
    };
    this.searchByEmail = this.searchByEmail.bind(this);
    this.changePage = this.changePage.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.canjeRequested = this.canjeRequested.bind(this);
    this.sendChanges = this.sendChanges.bind(this);
    this.returnTrade = this.returnTrade.bind(this);
    this.setStateTrade = this.setStateTrade.bind(this);
    this.toggle = this.toggle.bind(this);
    this.formatTrades = this.formatTrades.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  changePage = (page) => {
    this.setState({
      currentData: this.state.trades.slice(
        this.state.perPage * (page - 1),
        this.state.perPage * page
      ),
      page: page,
    });
  };
  formatTrades = async (trades) => {
    let newDownload = await trades.map((trade) => {
      var newObj = {};
      newObj["Nombres y Apellidos"] = trade.userName;
      newObj["Correo electrónico"] = trade.userEmail;
      newObj["Teléfono"] = trade.userPhone;
      newObj["RUC de la tienda"] = trade.store;
      newObj["Tipo del producto"] = trade.type;
      newObj["Marca del producto"] = trade.brand;
      newObj["Producto canjeado"] = trade.fullname;
      newObj["Fecha de registro"] = new Date(trade.createdAt).toLocaleString(
        "es-PE"
      );
      return newObj;
    });
    this.setState({
      downloadTrades: newDownload,
    });
  };

  componentDidMount() {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.token,
    };
    // Where we're fetching data from
    fetch(`${API}/canjes`, {
      method: "GET",
      headers: headers,
    })
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) => {
        const reverseData = data.reverse();
        this.setState({
          trades: reverseData,
          currentData: reverseData.slice(
            this.state.perPage * (this.state.currentPage - 1),
            this.state.perPage * this.state.currentPage
          ),
          pages:
            data.length % this.state.perPage === 0
              ? Math.floor(data.length / this.state.perPage)
              : Math.floor(data.length / this.state.perPage) + 1,
          isLoading: false,
        });
        this.formatTrades(data);
      })
      // Catch any errors we hit and update the app
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  searchByEmail() {
    console.log(this.state.emailSearch);
    this.setState({
      isLoading: true,
    });
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.token,
    };
    fetch(`${API}/canje/email/${this.state.emailSearch}`, {
      method: "GET",
      headers: headers,
    })
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) => {
        const reverseData = data.reverse();
        this.setState({
          currentData: reverseData.slice(
            this.state.perPage * (this.state.currentPage - 1),
            this.state.perPage * this.state.currentPage
          ),
          pages:
            data.length % this.state.perPage === 0
              ? Math.floor(data.length / this.state.perPage)
              : Math.floor(data.length / this.state.perPage) + 1,
          isLoading: false,
          cancelSearch: true,
        });
      })
      // Catch any errors we hit and update the app
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  //Checkbox
  isSelected = (id) =>
    this.state.selectedTrades.includes((trade) => trade._id === id);
  handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    console.log("checkbox select");
    const { selectedTrades } = this.state;
    const selectedIndex = selectedTrades.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedTrades, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedTrades.slice(1));
    } else if (selectedIndex === selectedTrades.length - 1) {
      newSelected = newSelected.concat(selectedTrades.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedTrades.slice(0, selectedIndex),
        selectedTrades.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedTrades: newSelected });
  };
  handleRowClick = (event, id) => {
    console.log("row link");
  };

  setStateTrade = (value, id) => {
    const { currentData } = this.state;
    const indexFound = currentData.findIndex((trade) => trade._id == id);
    if (indexFound !== -1) {
      currentData[indexFound].newState = value;
      this.setState({
        currentData,
      });
    }
  };

  sendChanges = async (trade) => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.token,
    };
    await fetch(`${API}/canje/${trade._id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({ newState: trade.newState }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("El error es ", err);
      });
  };

  returnTrade = async () => {
    const id = this.state.idCanjetoReturn;
    if (id) {
      var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token,
      };

      this.setStateTrade("No canjeado", id);

      await fetch(`${API}/canjes/setState/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ newState: "No canjeado" }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log("El error es ", err);
        });
    }
    this.toggle()
  };

  canjeRequested = (id) => {
    let canjes = [];
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.token,
    };
    canjes.push(id);
    console.log("canjeRequested -> canjes", canjes);
    let data = {
      canjes,
    };
    console.log("canjeRequested -> data", data);
    fetch(`${API}/canjesrequested`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    })
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) => {
        if (data.status === true) {
          Router.reload(window.location.pathname);
          /*let requestedCanje = data.canjes[0];
                  console.log("requestedCanje", requestedCanje)
                  this.state.currentData.map(trade=>{
                      if(trade._id == requestedCanje._id){
                          console.log('Trade por cambiar', trade)
                          console.log('Canje Devuelto', requestedCanje)
                          trade.requested = requestedCanje.requested
                      }
                  })*/
        }
      })
      // Catch any errors we hit and update the app
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          style={{ marginTop: "90px" }}
        >
          <ModalHeader toggle={this.toggle}>
            ¿ Desea devolver el canje ?
          </ModalHeader>
          <ModalBody className="text-center">
            <h5>
              Al devolver el canje se le regresaran los puntos al usuario y no
              se podra volver a cambiar el estado del canje
              <br />
            </h5>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.returnTrade}>
              Confirmar
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>
        {!this.state.isLoading ? (
          <Grid
            container
            direction="row"
            spacing={1}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Autocomplete
                freeSolo
                disableClearable
                onChange={(event, value) =>
                  this.setState({
                    emailSearch: value,
                  })
                }
                options={this.state.trades.map((trade) => trade.userEmail)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Busqueda por email"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={() => this.searchByEmail()}
              >
                Buscar
              </Button>
            </Grid>
            <Grid item xs={2}>
              {this.state.cancelSearch ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CancelIcon />}
                  onClick={() =>
                    this.setState({
                      currentData: this.state.trades.slice(
                        this.state.perPage * (this.state.currentPage - 1),
                        this.state.perPage * this.state.currentPage
                      ),
                      cancelSearch: false,
                      pages:
                        this.state.trades.length % this.state.perPage === 0
                          ? Math.floor(
                              this.state.trades.length / this.state.perPage
                            )
                          : Math.floor(
                              this.state.trades.length / this.state.perPage
                            ) + 1,
                    })
                  }
                >
                  Cancelar
                </Button>
              ) : null}
            </Grid>
            <Grid item xs={4}>
              <ExportCSV
                csvData={this.state.downloadTrades}
                fileName={"trades-WASIPET"}
              />
            </Grid>
          </Grid>
        ) : null}

        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Orden</TableCell>
                <TableCell align="center">Nombre de Usuario</TableCell>
                <TableCell align="center">Email de Usuario</TableCell>
                <TableCell align="center">RUC - Tienda Destino</TableCell>
                <TableCell align="center">Marca del Producto</TableCell>
                <TableCell align="center">Producto</TableCell>
                {/* <TableCell align="center">Estado en app Antiguo</TableCell> */}
                <TableCell align="center">Estado en App</TableCell>
                <TableCell align="center">Guardar Cambios</TableCell>
                <TableCell align="center">Devolver puntos</TableCell>
                <TableCell align="center">Fecha de Canje</TableCell>
                <TableCell align="center">Ver detalles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!this.state.isLoading ? (
                this.state.currentData.map((trade, index) => {
                  //const ItemSelected = this.isSelected(trade._id);
                  //const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      //role="checkbox"
                      key={trade._id}
                      //selected={ItemSelected}
                      //onClick={event => this.handleRowClick(event, trade._id)}
                    >
                      {/* 
                                   <TableCell padding="checkbox">
                                    <Checkbox
                                    checked={ItemSelected}
                                    onClick={event =>
                                        this.handleCheckboxClick(event, trade._id)
                                      }
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </TableCell>
                                   */}
                      <TableCell key={index} align="center">
                        {this.state.perPage * (this.state.page - 1) +
                          (index + 1)}
                      </TableCell>
                      <TableCell key={Math.random()} align="center">
                        {trade.userName}
                      </TableCell>
                      <TableCell key={trade.type} align="center">
                        {trade.userEmail}
                      </TableCell>
                      <TableCell key={trade.email} align="center">
                        {trade.store}
                      </TableCell>
                      <TableCell
                        key={Math.random()}
                        align="center"
                        style={{ fontWeight: "bold" }}
                      >
                        {trade.brand}
                      </TableCell>
                      <TableCell key={Math.random()} align="center">
                        {trade.fullname}
                      </TableCell>
                      {/* <TableCell key={Math.random()} align="center">
                        {trade.state === "Vencido" ? (
                          <div style={{ color: "red", fontWeight: "bold" }}>
                            {trade.state}
                          </div>
                        ) : trade.state === "Pendiente" ? (
                          <div style={{ color: "#F75E25", fontWeight: "bold" }}>
                            {trade.state}
                          </div>
                        ) : trade.state === "Disponible" ? (
                          <div style={{ color: "#FAD201", fontWeight: "bold" }}>
                            {trade.state}
                          </div>
                        ) : (
                          <div style={{ color: "green", fontWeight: "bold" }}>
                            {trade.state}
                          </div>
                        )}
                      </TableCell> */}
                      <TableCell key={Math.random()} align="center">
                        <Select
                          value={
                            trade.state == "Vencido" ||
                            trade.state == "Entregado"
                              ? trade.state
                              : trade.newState
                          }
                          labelId="label-brand"
                          disabled={
                            trade.state == "Vencido" ||
                            trade.state == "Entregado" ||
                            trade.newState == "No canjeado"
                          }
                          onChange={(e) =>
                            this.setStateTrade(e.target.value, trade._id)
                          }
                          displayEmpty
                          style={{ width: "100%" }}
                        >
                          <MenuItem value="" disabled>
                            Seleccione un estado
                          </MenuItem>
                          <MenuItem value={"En proceso"}>
                            <div style={{ color: "gray", fontWeight: "bold" }}>
                              En proceso
                            </div>
                          </MenuItem>
                          <MenuItem value={"Confirmado"}>
                            <div
                              style={{ color: "orange", fontWeight: "bold" }}
                            >
                              Confirmado
                            </div>
                          </MenuItem>
                          <MenuItem value={"En camino"}>
                            <div style={{ color: "blue", fontWeight: "bold" }}>
                              En camino
                            </div>
                          </MenuItem>
                          {trade.state == "Vencido" && (
                            <MenuItem value={"Vencido"} disabled>
                              <div style={{ color: "red", fontWeight: "bold" }}>
                                Vencido
                              </div>
                            </MenuItem>
                          )}
                          <MenuItem value={"Entregado"} disabled>
                            <div style={{ color: "green", fontWeight: "bold" }}>
                              Entregado
                            </div>
                          </MenuItem>
                          <MenuItem value={"No canjeado"} disabled>
                            <div style={{ color: "red", fontWeight: "bold" }}>
                              No canjeado
                            </div>
                          </MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell key={Math.random()} align="center">
                        {/* {!trade.requested && trade.state !== "Vencido" ? (
                          <Button
                            variant="contained"
                            color="Info"
                            onClick={() => this.canjeRequested(trade._id)}
                          >
                            Sin procesar
                          </Button>
                        ) : trade.state === "Vencido" ? (
                          <Button variant="contained" color="primary" disabled>
                            Vencido
                          </Button>
                        ) : (
                          <Button variant="contained" color="primary" disabled>
                            Procesado
                          </Button>
                        )} */}
                        <Button
                          variant="contained"
                          color="Info"
                          onClick={() => this.sendChanges(trade)}
                        >
                          Guardar cambios
                        </Button>
                      </TableCell>
                      <TableCell key={Math.random()} align="center">
                        {trade.state !== "Vencido" &&
                        trade.state !== "Entregado" &&
                        trade.newState !== "No canjeado" ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              this.setState({
                                idCanjetoReturn: trade._id,
                              });
                              this.toggle();
                            }}
                          >
                            Devolver Canje
                          </Button>
                        ) : (
                          <Button variant="contained" color="primary" disabled>
                            Devolver Canje
                          </Button>
                        )}
                      </TableCell>
                      <TableCell key={Math.random()} align="center">
                        {new Date(trade.createdAt).toLocaleString("es-PE")}
                      </TableCell>
                      <TableCell align="center">
                        <LookTrade
                          tradecode={trade.code_trade}
                          codeuser={trade.user}
                          storecode={trade.store}
                          fecha={trade.createdAt}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow hover role="checkbox">
                  <TableCell>... Cargando</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={this.state.pages}
          onChange={(event, page) => this.changePage(page)}
        />
      </React.Fragment>
    );
  }
}

export default TableTrades;
