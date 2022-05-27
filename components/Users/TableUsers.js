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
import ExportCSV from '../General/ExportExcel'
import Grid from '@material-ui/core/Grid';

const TableUsers = () =>{

    const [token] = useState(getCookie('token'))
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [downloadUsers, setDownloadUsers] = useState([])
    //Pagination
    const [perPage] = useState(25)
    const [page,setPage] = useState(1)
    const [currentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [contentArray, setContentArray] = useState([])

    const changePage = (page) => {
        setContentArray(
            users.slice(
                perPage * (page - 1),
                perPage * page)
        )
        setPage(page)
    }

    const formatUsers = async (users) => {
       let newDownload = await users.map(user => {
            var newObj = {}
            newObj['ID del Usuario'] = user.user_id
            newObj['Nombres'] = user.firstName + ' ' + user.secondName
            newObj['Apellidos'] = user.firstSurname + ' ' + user.secondSurname
            newObj['Correo electrónico'] = user.email
            newObj['Puntos'] = user.points
            newObj['Teléfono'] = user.phone
            newObj['DNI'] = user.DNI
            newObj['Foto'] = user.photo
            newObj['Fecha de registro'] = new Date(user.createdAt).toLocaleString('es-PE')
            return newObj;
        })
        setDownloadUsers(newDownload)
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
            const reverseData = data.reverse()
            setUsers(reverseData)
            setContentArray(
                reverseData.slice(
                  perPage * (currentPage - 1),
                  perPage * currentPage)
            )
            setPages(
              data.length % perPage === 0 ? 
              Math.floor(data.length/perPage) :
              Math.floor(data.length/perPage) + 1
            )
            setIsLoading(false)
            formatUsers(data)
        }
            
          )
          // Catch any errors we hit and update the app
          .catch(error => setError(error));
      }, [])
    
      return(
        <React.Fragment>
            <Grid container direction="row" spacing={1} justify="flex-start"
                    alignItems="center" >
                    <Grid item xs={4}>
                        <ExportCSV 
                            csvData={downloadUsers} 
                            fileName={'usuarios-WASIPET'}  
                        />
                    </Grid>
                    <Grid item xs={4} alignItems={'right'}>
                        Total: {users.length} usuarios registrados
                    </Grid>
            </Grid>
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow >
                    <TableCell align="center">
                        Orden
                    </TableCell>
                    <TableCell align="center">
                        Nombre
                    </TableCell>
                    <TableCell align="center">
                        Puntos Actuales
                    </TableCell>
                    <TableCell align="center">
                        Email
                    </TableCell>
                    <TableCell align="center">
                        Teléfono
                    </TableCell>
                    <TableCell align="center">
                        Fecha de registro
                    </TableCell>
                    <TableCell align="center">
                        Ver detalles
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {!isLoading ? (
                contentArray.map((user,index) => {
                    return(
                        <TableRow hover role="checkbox" key={user._id}>
                            <TableCell key={index} align="center">
                                {perPage * (page - 1) + (index + 1)}
                            </TableCell>
                            <TableCell key={user.name} align="center">
                                {user.firstName + ' ' + user.firstSurname + ' ' + user.secondSurname}
                            </TableCell>
                            <TableCell key={Math.random()} align="center">
                                {user.points}
                            </TableCell>
                            <TableCell key={user.email} align="center">
                                {user.email}
                            </TableCell>
                            <TableCell key={user.phone} align="center">
                                {user.phone}
                            </TableCell>
                            <TableCell key={user.createdAt} align="center">
                                {new Date(user.createdAt).toLocaleString('es-PE')}
                            </TableCell>
                            <TableCell key={user.user_id} align="center">
                                <LookUser
                                name={user.firstName + ' ' + user.firstSurname + ' ' + user.secondSurname}
                                points={user.points}
                                type={user.type}
                                phone={user.phone}
                                photo={user.photo}
                                email={user.email}
                                user_id={user.user_id}
                                fecha={new Date(user.createdAt).toLocaleString('es-PE')}
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