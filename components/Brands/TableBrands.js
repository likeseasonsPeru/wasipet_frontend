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
//import LookUser from './ViewDetailsUser';
import ExportCSV from '../General/ExportExcel'
import Grid from '@material-ui/core/Grid';

const TableBrands = () =>{

    const [token] = useState(getCookie('token'))
    const [brands, setBrands] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [downloadBrands, setDownloadBrands] = useState([])
    //Pagination
    const [perPage] = useState(25)
    const [page,setPage] = useState(1)
    const [currentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [contentArray, setContentArray] = useState([])

    const changePage = (page) => {
        setContentArray(
            brands.slice(
                perPage * (page - 1),
                perPage * page)
        )
        setPage(page)
    }

    const formatBrands = async (brands) => {
       let newDownload = await brands.map(brand => {
            var newObj = {}
            newObj['ID de Marca'] = brand._id
            newObj['Nombre de la marca'] = brand.name
            newObj['URL del logo'] = brand.photo
            newObj['Fecha de registro'] = new Date(brand.createdAt).toLocaleString('es-PE')
            return newObj;
        })
        setDownloadBrands(newDownload)
    }

      useEffect(() => {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        // Where we're fetching data from
        fetch(`${API}/brands`,{
            method: 'GET',
            headers:headers
        })
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>{
            const reverseData = data.reverse()
            setBrands(reverseData)
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
            formatBrands(data)
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
                            csvData={downloadBrands} 
                            fileName={'marcas-WASIPET'}  
                        />
                    </Grid>
                    <Grid item xs={4} alignItems={'right'}>
                        Total: {brands.length} marcas registradas
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
                        Foto
                    </TableCell>
                    <TableCell align="center">
                        Fecha de registro
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {!isLoading ? (
                contentArray.map((brand,index) => {
                    return(
                        <TableRow hover role="checkbox" key={brand._id}>
                            <TableCell key={index} align="center">
                                {perPage * (page - 1) + (index + 1)}
                            </TableCell>
                            <TableCell key={brand.name} align="center">
                                {brand.name}
                            </TableCell>
                            <TableCell key={Math.random()} align="center">
                            {
                                    brand.photo ? 
                                    <img src={brand.photo} style={{width:'40px'}}/>
                                    : 'Sin foto'
                                }
                            </TableCell>
                            <TableCell key={brand.createdAt} align="center">
                                {new Date(brand.createdAt).toLocaleString('es-PE')}
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

export default TableBrands;