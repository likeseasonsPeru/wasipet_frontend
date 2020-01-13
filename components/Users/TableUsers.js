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
import LookUser from './ViewDetailsUser';

class TableUsers extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            token : getCookie('token'),
            users :{},
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
        fetch(`${API}/users`,{
            method: 'GET',
            headers:headers
        })
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>
            this.setState({
              users: data,
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
                            Tipo
                        </TableCell>
                        <TableCell align="center">
                            Email
                        </TableCell>
                        <TableCell align="center">
                            Teléfono
                        </TableCell>
                        <TableCell align="center">
                            Ver detalles
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {!this.state.isLoading ? (
                    this.state.users.map((user) => {
                        return(
                            <TableRow hover role="checkbox" key={user._id}>
                                <TableCell key={user.name} align="center">
                                    {user.name}
                                </TableCell>
                                <TableCell key={user.type} align="center">
                                    {user.type}
                                </TableCell>
                                <TableCell key={user.email} align="center">
                                    {user.email}
                                </TableCell>
                                <TableCell key={user.phone} align="center">
                                    {user.phone}
                                </TableCell>
                                <TableCell key={user.user_id} align="center">
                                    <LookUser
                                    name={user.name}
                                    points={user.points}
                                    type={user.type}
                                    phone={user.phone}
                                    photo={user.photo}
                                    email={user.email}
                                    user_id={user.user_id}
                                    fecha={user.createdAt}
                                    /> 
                                </TableCell>
                            </TableRow>
                        )
                    })
                ) : (
                    <TableRow hover role="checkbox" >
                        <TableCell>
                            ... Loading
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

export default TableUsers;