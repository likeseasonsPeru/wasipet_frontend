import React,{useState, useEffect} from 'react';
import { API } from '../../config';
import { getCookie } from '../../utils/cookie';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import {Pagination} from '@material-ui/lab';
import TableRow from '@material-ui/core/TableRow';
import LookPet from './ViewDetailsPet';

const TablePets = () => {
    const [token] = useState(getCookie('token'))
    const [pets, setPets] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [perPage] = useState(25)
    const [currentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [error, setError] = useState(null)
    const [contentArray, setContentArray] = useState([])

    const changePage = (page) => {
        setContentArray(
            pets.slice(
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
        fetch(`${API}/pets`,{
            method: 'GET',
            headers:headers
        })
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>{
              setPets(data)
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
          })
          // Catch any errors we hit and update the app
          .catch(error => {
            setError(error)
            setIsLoading(true)
          });
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
                        Raza
                    </TableCell>
                    <TableCell align="center">
                        Edad
                    </TableCell>
                    <TableCell align="center">
                        Sexo
                    </TableCell>
                    <TableCell align="center">
                        Código de dueño
                    </TableCell>
                    <TableCell align="center">
                        Photo
                    </TableCell>
                    <TableCell align="center">
                        Ver Detalles
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {!isLoading ? (
                contentArray.map((pet) => {
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
                                {pet.gender}
                            </TableCell>
                            <TableCell key={pet.owner} align="center">
                                {pet.owner}
                            </TableCell>
                            <TableCell key={pet.photo} align="center">
                                {pet.photo}
                            </TableCell>
                            <TableCell align="center">
                                <LookPet 
                                name={pet.name}
                                photo={pet.photo}
                                age={pet.age}
                                sex={pet.gender}
                                owner={pet.owner}
                                breed={pet.breed}
                                fecha={pet.createdAt}
                                />
                            </TableCell>
                        </TableRow>
                    )
                })
            ) : (
                <TableRow hover role="checkbox" >
                    <TableCell>
                        ... Cargando
                    </TableCell>      
                </TableRow>
            ) 
            }
            </TableBody>
            </Table>
        </TableContainer>

        <Pagination count={pages} onChange={(event, page) => changePage(page)} />
        </React.Fragment>
    )
    
}

export default TablePets;