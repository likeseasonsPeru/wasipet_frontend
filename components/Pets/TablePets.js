import React from 'react';
import { API } from '../../config';
import { getCookie } from '../../utils/cookie';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

class TablePets extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            token : getCookie('token'),
            pets :[],
            isLoading: true,
            error: null
        };
        
      }

      componentDidMount() {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }
        // Where we're fetching data from
        fetch(`${API}/pets`,{
            method: 'GET',
            headers:headers
        })
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>
            this.setState({
                pets: data,
              isLoading: false,
            })
          )
          // Catch any errors we hit and update the app
          .catch(error => this.setState({ error, isLoading: false }));
      }
    
    render(){
        return(
            <div>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow >
                        <TableCell align="center">
                            Nombre
                        </TableCell>
                        <TableCell align="center">
                            Raza
                        </TableCell>
                        <TableCell align="center">
                            Edad
                        </TableCell>
                        <TableCell align="center">
                            Sexo
                        </TableCell>
                        <TableCell align="center">
                            Dueño
                        </TableCell>
                        <TableCell align="center">
                            Photo
                        </TableCell>
                        <TableCell align="center">
                            Component Edit
                        </TableCell>
                        <TableCell align="center">
                            Component Delete
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {!this.state.isLoading ? (
                    this.state.pets.map((pet) => {
                        return(
                            <TableRow hover role="checkbox" key={pet._id}>
                                <TableCell key={pet.name} align="center">
                                    {pet.name}
                                </TableCell>
                                <TableCell key={pet.breed} align="center">
                                    {pet.breed}
                                </TableCell>
                                <TableCell key={pet.age} align="center">
                                    {pet.age}
                                </TableCell>
                                <TableCell key={pet.sex} align="center">
                                    {pet.sex}
                                </TableCell>
                                <TableCell key={pet.owner} align="center">
                                    {pet.owner}
                                </TableCell>
                                <TableCell key={pet.photo} align="center">
                                    {pet.photo}
                                </TableCell>
                                <TableCell align="center">
                                    Component Edit
                                </TableCell>
                                <TableCell align="center">
                                    Component Delete
                                </TableCell>
                            </TableRow>
                        )
                    })
                ) : (
                    <TableRow hover role="checkbox" >
                        <TableCell>
                            -.. Loading
                        </TableCell>      
                    </TableRow>
                ) 
                }
                </TableBody>
                </Table>
            </TableContainer>
            </div>
        )
    };

}

export default TablePets;