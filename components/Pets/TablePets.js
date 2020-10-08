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
import Grid from '@material-ui/core/Grid';

const TablePets = () => {
    const [token] = useState(getCookie('token'))
    const [pets, setPets] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [perPage] = useState(25)
    const [currentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [page, setPage] = useState(1)
    const [error, setError] = useState(null)
    const [contentArray, setContentArray] = useState([])

    const changePage = (page) => {
        setContentArray(
            pets.slice(
                perPage * (page - 1),
                perPage * page)
        )
        setPage(page)
    }

    const calculateAge = (dateString) => {
        var fechaNace = new Date(dateString);
        var fechaActual = new Date()
    
        var mes = fechaActual.getMonth();
        var dia = fechaActual.getDate();
        var año = fechaActual.getFullYear();
    
        fechaActual.setDate(dia);
        fechaActual.setMonth(mes);
        fechaActual.setFullYear(año);

       let edad = Math.floor(((fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365));
       if(edad>0)
        return edad;
       else{
           return 0
       }
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
              const reverseData = data.reverse();
              setPets(reverseData)
              setContentArray(
                reverseData.slice(
                    perPage * (currentPage - 1),
                    perPage * currentPage)
              )
              setPages(
                reverseData.length % perPage === 0 ? 
                Math.floor(reverseData.length/perPage) :
                Math.floor(reverseData.length/perPage) + 1
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
            <Grid container direction="row" spacing={1} justify="flex-start"
                    alignItems="center" >
                    <Grid item xs={4}>
                        Total: {pets.length} mascotas registradas
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
                        Foto
                    </TableCell>
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
                        Género
                    </TableCell>
                    <TableCell align="center">
                        Ver Detalles
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {!isLoading ? (
                contentArray.map((pet,index) => {
                    return(
                        <TableRow hover role="checkbox" key={pet._id}>
                            <TableCell key={index} align="center">
                                {perPage * (page - 1) + (index + 1)}
                            </TableCell>
                            <TableCell key={Math.random()} align="center">
                                {
                                    pet.photo ? 
                                    <img src={pet.photo} style={{width:'40px'}}/>
                                    : 'Sin foto'
                                }
                            </TableCell>
                            <TableCell key={pet.name} align="center">
                                {pet.name}
                            </TableCell>
                            <TableCell key={Math.random()} align="center">
                                {pet.breedName}
                            </TableCell>
                            <TableCell key={Math.random()} align="center">
                                {
                                    pet.BornDate ? 
                                    calculateAge(pet.BornDate) + ' años'
                                    : 'Sin edad'
                                }
                            </TableCell>
                            <TableCell key={pet.sex} align="center">
                                {pet.gender}
                            </TableCell> 
                            <TableCell align="center">
                                <LookPet 
                                name={pet.name}
                                photo={pet.photo}
                                age={pet.BornDate ? 
                                    calculateAge(pet.BornDate) + ' años'
                                    : 'Sin edad'}
                                sex={pet.gender}
                                owner={pet.owner}
                                breed={pet.breedName}
                                fecha={new Date(pet.createdAt).toLocaleString('es-PE')}
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