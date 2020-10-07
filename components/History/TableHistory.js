import React from 'react';
import { API } from '../../config';
import { getCookie } from '../../utils/cookie';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LookHistory from './ViewDetailHistory';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import {Pagination} from '@material-ui/lab';
import Checkbox from '@material-ui/core/Checkbox';
import ExportCSV from '../General/ExportExcel'
class TableHistory extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            token : getCookie('token'),
            usersToSearch:[],
            emailSearch: '',
            isLoading: true,
            isLoadingBusqueda: true,
            error: null,
            perPage: 25,
            currentPage:1,
            pages:null,
            totalHistory: [],
            currentData : [],
        };
        this.searchByEmail = this.searchByEmail.bind(this);
        this.changePage = this.changePage.bind(this);
      }

      changePage = (page) => {
        this.setState(
            {
                currentData: this.state.totalHistory.slice(
                    this.state.perPage * (page - 1),
                    this.state.perPage * page)
            }
        )
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
          .then(data =>
            this.setState({ 
              usersToSearch: data,
              isLoadingBusqueda: false,
            })
          )
          // Catch any errors we hit and update the app
          .catch(error => this.setState({ error, isLoading: false }));
      }

      searchByEmail(){
          console.log(this.state.emailSearch)
          this.setState({ 
            isLoading: true,
          })
          var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }
        fetch(`${API}/user/userHistorial/${this.state.emailSearch}`,{
            method: 'GET',
            headers:headers
        })
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>
            this.setState({ 
                currentData:data.slice(
                    this.state.perPage * (this.state.currentPage - 1),
                    this.state.perPage * this.state.currentPage),
                totalHistory: data,
                pages: data.length % this.state.perPage === 0 ? 
                  Math.floor(data.length/this.state.perPage) :
                  Math.floor(data.length/this.state.perPage) + 1,
                isLoading: false,
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
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon />}
                            onClick={() => this.searchByEmail()}
                            >
                            Buscar
                        </Button>
                    </Grid>
                    </Grid>
                     : null
                }
                
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow >
                        <TableCell align="center">
                            Código de Historial
                        </TableCell>
                        <TableCell align="center">
                            Nombre
                        </TableCell>
                        <TableCell align="center">
                            Puntos
                        </TableCell>
                        <TableCell align="center">
                            Tipo de acción
                        </TableCell>
                        <TableCell align="center">
                            Fecha
                        </TableCell>
                        <TableCell align="center">
                            Ver detalles
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {!this.state.isLoading ? (
                    this.state.currentData.map((historial,index) => {
                        return(
                            <TableRow 
                                hover 
                                //role="checkbox" 
                                key={historial._id} 
                                //selected={ItemSelected}
                                //onClick={event => this.handleRowClick(event, trade._id)}
                                >
                               {
                                   /* 
                                   <TableCell padding="checkbox">
                                    <Checkbox
                                    checked={ItemSelected}
                                    onClick={event =>
                                        this.handleCheckboxClick(event, trade._id)
                                      }
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </TableCell>
                                   */
                               }
                                <TableCell key={historial._id} align="center">
                                    {historial._id}
                                </TableCell>
                                <TableCell key={historial.name} align="center">
                                    {historial.name}
                                </TableCell>
                                <TableCell key={Math.random()} align="center">
                                    {
                                        historial.type_data === 'Producto escaneado' ?
                                        <div style={{color: 'green', fontWeight:'bold'}}>
                                            {historial.ptos}
                                        </div> : 
                                        historial.type_data === 'Producto canjeado' ? 
                                        <div style={{color: 'red', fontWeight:'bold'}}>
                                            - {historial.ptos}
                                        </div> : 
                                        <div style={{color: 'green', fontWeight:'bold'}}>
                                            {historial.ptos}
                                        </div>
                                    }
                                </TableCell>
                                <TableCell key={Math.random()} align="center">
                                    {historial.type_data}
                                </TableCell>
                                <TableCell key={Math.random()} align="center">
                                    {new Date(historial.date).toLocaleString('es-PE')}
                                </TableCell>
                                <TableCell  align="center">
                                    <LookHistory
                                    historialId={historial._id}
                                    accionName={historial.name}
                                    puntos={historial.ptos}
                                    typeData={historial.type_data}
                                    fecha={new Date(historial.date).toLocaleString('es-PE')}
                                    /> 
                                </TableCell>
                            </TableRow>
                        )
                    })
                ) : (
                    <TableRow hover role="checkbox" >
                        <TableCell>
                            ... Ingrese un correo electrónico
                        </TableCell>      
                    </TableRow>
                ) 
                }
                </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={this.state.pages} onChange={(event, page) => this.changePage(page)} />
            </React.Fragment>
        )
    };

}

export default TableHistory;