import React, {useState, useEffect} from 'react';
import { API } from '../../config';
import { getCookie } from '../../utils/cookie';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import {Pagination} from '@material-ui/lab';
import TableRow from '@material-ui/core/TableRow';
import LookUser from './ViewDetailsUser';

const TableUsers = () =>{

    const [token] = useState(getCookie('token'))
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    //Pagination
    const [perPage] = useState(25)
    const [currentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [contentArray, setContentArray] = useState([])

    const changePage = (page) => {
        setContentArray(
            users.slice(
                perPage * (page - 1),
                perPage * page)
        )
    }

      useEffect(() => {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        // Where we're fetching data from
        fetch(`${API}/users`,{
            method: 'GET',
            headers:headers
        })
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>{
            setUsers(data)
            setContentArray(
              data.slice(
                  perPage * (currentPage - 1),
                  perPage * currentPage)
            )
            setPages(
              data.length % perPage === 0 ? 
              Math.floor(data.length/perPage) :
              Math.floor(data.length/perPage) + 1
            )
            setIsLoading(false)
        }
            
          )
          // Catch any errors we hit and update the app
          .catch(error => setError(error));
      }, [])
    
      return(
        <React.Fragment>
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
            {!isLoading ? (
                contentArray.map((user) => {
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
        <Pagination count={pages} onChange={(event, page) => changePage(page)} />
        </React.Fragment>
    );

}

export default TableUsers;