import React, { useState, useEffect } from "react";
import { API } from "../../config";
import { getCookie } from "../../utils/cookie";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
/* import Button from "@material-ui/core/Button"; */
import SearchIcon from "@material-ui/icons/Search";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CancelIcon from "@material-ui/icons/Cancel";
import { Pagination } from "@material-ui/lab";
import Checkbox from "@material-ui/core/Checkbox";
import ExportCSV from "../General/ExportExcel";

const SearchUsertoBlock = () => {
  const [token] = useState(getCookie("token"));
  const [modal, setModal] = useState(false);
  const [usersToSearch, setUsersToSearch] = useState([]);
  const [emailSearch, setEmailSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBusqueda, setIsLoadingBusqueda] = useState(true);
  const [error, setError] = useState(null);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    // Where we're fetching data from
    fetch(`${API}/users`, {
      method: "GET",
      headers: headers
    })
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data => {
        setUsersToSearch(data);
        setIsLoadingBusqueda(false);
      })
      // Catch any errors we hit and update the app
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [isLoading]);

  const searchByEmail = () => {
    /* console.log(this.state.emailSearch); */
    setIsLoading(true);
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    fetch(`${API}/blockUser`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({ email: emailSearch })
    })
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data => {
        setIsLoading(false);
        console.log(data)
      })
      // Catch any errors we hit and update the app
      .catch(error => {setError(error); setIsLoading(false);});
      toggle()
  };

  return (
    <React.Fragment>
      {!isLoadingBusqueda ? (
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
              options={usersToSearch.map(user => user.email)}
              renderInput={params => (
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
            {/* emailSearch && modal */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              onClick={() => toggle()}
            >
              Bloquear
            </Button>
          </Grid>
        </Grid>
      ) : null}

      <Modal isOpen={modal} toggle={toggle} style={{ marginTop: "90px" }}>
        <ModalHeader toggle={toggle}>Bloquear usuario</ModalHeader>
        <ModalBody>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="text"
            autoFocus
            disabled
            value={emailSearch}
            className="colorInputDisabled"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={searchByEmail}>
            Bloquear
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
/* 
class SearchUsertoBlock extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            token : getCookie('token'),
            usersToSearch:[],
            emailSearch: null,
            isLoading: true,
            isLoadingBusqueda: true,
            error: null,
        };
      }

      

      componentDidMount() {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }
        // Where we're fetching data from
        fetch(`${API}/users`,{
            method: 'GET',
            headers:headers
        })
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data => {
              set
          }
            this.setState({ 
              usersToSearch: data,
              isLoadingBusqueda: false,
            })
          )
          // Catch any errors we hit and update the app
          .catch(error => this.setState({ error, isLoading: false }));
      }
    
    render(){
        return(
            <React.Fragment>
                {
                    !this.state.isLoadingBusqueda ? 
                    <Grid container direction="row" spacing={1} justify="flex-start"
                    alignItems="center">
                        <Grid item xs={4}>
                        <Autocomplete
                            freeSolo
                            disableClearable
                            onChange={(event, value) => this.setState({
                                emailSearch: value,
                            })}
                            options={this.state.usersToSearch.map(user => user.email)}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Busqueda por email"
                                margin="normal"
                                
                                variant="outlined"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                            />
                            )}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <ModalBlock  email={this.state.emailSearch}/>
                    </Grid>
                    </Grid>
                     : null
                }
            </React.Fragment>
        )
    };

} */

export default SearchUsertoBlock;
