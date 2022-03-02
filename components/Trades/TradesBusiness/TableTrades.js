import React, { useEffect, useState } from "react";
import { API } from "../../../config";
import { getCookie } from "../../../utils/cookie";
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
import ExportCSV from "../../General/ExportExcel";
import Router from "next/router";

const TableTradesBusiness = () => {
  const [token, setToken] = useState(getCookie("token"));
  const [trades, setTrades] = useState({});
  const [emailSearch, setEmailSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [perPage, setPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedTrades, setSelectedTrades] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [downloadTrades, setDownloadTrades] = useState([]);
  const [modal, setModal] = useState(false);
  const [idCanjetoReturn, setIdCanjetoReturn] = useState(null);
  const [cancelSearch, setCancelSearch] = useState(false);

  const toggle = () => setModal(!modal);
  const changePage = (newPage) => {
    setCurrentData(trades.slice(perPage * (newPage - 1), perPage * newPage));
    setPage(newPage);
  };
  const formatTrades = async (newTrades) => {
    let newDownload = await newTrades.map((trade) => {
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
    setDownloadTrades(newDownload);
  };

  useEffect(() => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    fetch(`${API}/canjes/business`, {
      method: "GET",
      headers: headers,
    })
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) => {
        const reverseData = data.reverse();
        setTrades(reverseData)
        setCurrentData(reverseData.slice(
          perPage * (currentPage - 1),
          perPage * currentPage
        ))
        setPages(
          data.length % perPage === 0
            ? Math.floor(data.length / perPage)
            : Math.floor(data.length / perPage) + 1
        )
        setIsLoading(false)
        formatTrades(data);
      })
      // Catch any errors we hit and update the app
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      });
  }, [])

  const searchByEmail = () => {
    setIsLoading(true);
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    fetch(`${API}/canjes/business/email/${emailSearch}`, {
      method: "GET",
      headers: headers,
    })
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) => {
        const reverseData = data.reverse();
        setCurrentData(
          reverseData.slice(perPage * (currentPage - 1), perPage * currentPage)
        );
        setPages(
          data.length % perPage === 0
            ? Math.floor(data.length / perPage)
            : Math.floor(data.length / perPage) + 1
        );
        setIsLoading(false);
        setCancelSearch(true);
      })
      // Catch any errors we hit and update the app
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  //Checkbox
  const isSelected = (id) =>
    selectedTrades.includes((trade) => trade._id === id);
  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    console.log("checkbox select");
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

    setSelectedTrades(newSelected);
  };

  const handleRowClick = (event, id) => {
    console.log("row link");
  };

  const setStateTrade = (value, id) => {
    const newCurrentData = currentData.map((trade, i) => {
      if (trade._id === id) {
        return {
          ...trade,
          newState: value,
        };
      } else {
        return trade;
      }
    });
    setCurrentData(newCurrentData);
  };

  const sendChanges = async (trade) => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    await fetch(`${API}/canje/business/${trade._id}`, {
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

  const returnTrade = async (newState) => {
    if (idCanjetoReturn) {
      var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
      setStateTrade(newState, idCanjetoReturn);

      await fetch(`${API}/canje/business/setState/${idCanjetoReturn}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ newState: newState }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log("El error es ", err);
        });
    }
    toggle();
  };

  return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} style={{ marginTop: "90px" }}>
        <ModalHeader toggle={toggle}>¿ Desea devolver el canje ?</ModalHeader>
        <ModalBody className="text-center">
          <h5>
            Al devolver el canje se le regresaran los puntos al usuario y no se
            podra volver a cambiar el estado del canje
            <br />
          </h5>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => returnTrade("Proceso cancelado (puntos devueltos)")}
          >
            Confirmar
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
      {!isLoading ? (
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
              onChange={(event, value) => setEmailSearch(value)}
              options={trades.map((trade) => trade.userEmail)}
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
              onClick={() => searchByEmail()}
            >
              Buscar
            </Button>
          </Grid>
          <Grid item xs={2}>
            {cancelSearch ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={() => {
                  setCurrentData(
                    trades.slice(
                      perPage * (currentPage - 1),
                      perPage * currentPage
                    )
                  );
                  setCancelSearch(false);
                  setPages(
                    trades.length % perPage === 0
                      ? Math.floor(trades.length / perPage)
                      : Math.floor(trades.length / perPage) + 1
                  );
                }}
              >
                Cancelar
              </Button>
            ) : null}
          </Grid>
          <Grid item xs={4}>
            <ExportCSV
              csvData={downloadTrades}
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
              {/* <TableCell align="center">RUC - Tienda Destino</TableCell> */}
              <TableCell align="center">Marca del Producto</TableCell>
              <TableCell align="center">Producto</TableCell>
              {/* <TableCell align="center">Estado en app Antiguo</TableCell> */}
              <TableCell align="center">Estado en App</TableCell>
              <TableCell align="center">Guardar Cambios</TableCell>
              <TableCell align="center">Devolver puntos</TableCell>
              <TableCell align="center">Fecha de Canje</TableCell>
              {/* <TableCell align="center">Ver detalles</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading ? (
              currentData.map((trade, index) => {
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
                      {perPage * (page - 1) + (index + 1)}
                    </TableCell>
                    <TableCell key={Math.random()} align="center">
                      {trade.userName}
                    </TableCell>
                    <TableCell key={trade.type} align="center">
                      {trade.userEmail}
                    </TableCell>
                   {/*  <TableCell key={trade.email} align="center">
                      {trade.store}
                    </TableCell> */}
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
                          trade.state == "Vencido" || trade.state == "Entregado"
                            ? trade.state
                            : trade.newState
                        }
                        labelId="label-brand"
                        disabled={
                          trade.state == "Vencido" ||
                          trade.state == "Entregado" ||
                          trade.newState ==
                            "Proceso cancelado (puntos devueltos)" ||
                          trade.newState == "Entregado"
                        }
                        onChange={(e) =>
                          setStateTrade(e.target.value, trade._id)
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
                          <div style={{ color: "orange", fontWeight: "bold" }}>
                            Confirmado
                          </div>
                        </MenuItem>
                        <MenuItem value={"En camino"}>
                          <div style={{ color: "blue", fontWeight: "bold" }}>
                            En camino
                          </div>
                        </MenuItem>
                        <MenuItem value={"Proceso cancelado (Sin stock)"}>
                          <div style={{ color: "indigo", fontWeight: "bold" }}>
                            Sin stock
                          </div>
                        </MenuItem>
                        {trade.state == "Vencido" && (
                          <MenuItem value={"Vencido"} disabled>
                            <div style={{ color: "red", fontWeight: "bold" }}>
                              Vencido
                            </div>
                          </MenuItem>
                        )}
                        <MenuItem value={"Entregado"}>
                          <div style={{ color: "green", fontWeight: "bold" }}>
                            Entregado
                          </div>
                        </MenuItem>
                        <MenuItem
                          value={"Proceso cancelado (puntos devueltos)"}
                          disabled
                        >
                          <div style={{ color: "red", fontWeight: "bold" }}>
                            Puntos devueltos
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
                        onClick={() => sendChanges(trade)}
                      >
                        Guardar cambios
                      </Button>
                    </TableCell>
                    <TableCell key={Math.random()} align="center">
                      {trade.state !== "Vencido" &&
                      trade.state !== "Entregado" &&
                      trade.newState !==
                        "Proceso cancelado (puntos devueltos)" ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            setIdCanjetoReturn(trade._id)
                            toggle();
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
                    {/* <TableCell align="center">
                      <LookTrade
                        tradecode={trade.code_trade}
                        codeuser={trade.user}
                        storecode={trade.store}
                        fecha={trade.createdAt}
                      />
                    </TableCell> */}
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
        count={pages}
        onChange={(event, page) => changePage(page)}
      />
    </React.Fragment>
  );
};

export default TableTradesBusiness;
