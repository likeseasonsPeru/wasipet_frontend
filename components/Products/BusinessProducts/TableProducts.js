import React, {useState, useEffect} from 'react';
import { API } from '../../../config';
import { getCookie } from '../../../utils/cookie';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import {Pagination} from '@material-ui/lab';
import TableRow from '@material-ui/core/TableRow';
import DisableProduct from './DisableProduct';
import ExportCSV from '../../General/ExportExcel'
import Grid from '@material-ui/core/Grid';
import EditProduct from './EditProduct'
import AddProduct from './AddProduct'
const TableProductsBusiness = () =>{

    const [token] = useState(getCookie('token'))
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [downloadProducts, setDownloadProducts] = useState([])
    //Pagination
    const [perPage] = useState(25)
    const [page,setPage] = useState(1)
    const [currentPage] = useState(1)
    const [pages, setPages] = useState(null)
    const [contentArray, setContentArray] = useState([])

    const changePage = (page) => {
        setContentArray(
            products.slice(
                perPage * (page - 1),
                perPage * page)
        )
        setPage(page)
    }

    const formatProducts = async (products) => {
       let newDownload = await products.map(product => {
            var newObj = {}
            newObj['ID del producto'] = product._id
            newObj['Nombre del producto'] = product.name
            newObj['Descripción del producto'] = product.description
            newObj['Marca'] = product.brand
            /* newObj['Tipo de mascota'] = product.petType === 'Dog' ? 'Perro' : 'Gato' */
            newObj['Coste de canjeo'] = product.pointsTrade
            /* newObj['Puntos al Escanear'] = product.pointsValue */
            /* newObj['Producto Medicado'] = product.medicado == true ? 'Si' : 'No' */
            newObj['Estado del producto'] = product.active == true ? 'Activo' : 'Desactivado'
            newObj['Foto'] = `https://wasipetapp.com/api/public/${product.image}`
            return newObj;
        })
        setDownloadProducts(newDownload)
    }

      useEffect(() => {
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        // Where we're fetching data from
        fetch(`${API}/products/business/ocultos`,{
            method: 'GET',
            headers:headers
        })
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>{
            const reverseData = data.reverse()
            setProducts(reverseData)
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
            formatProducts(data)
        }
            
          )
          // Catch any errors we hit and update the app
          .catch(error => setError(error));
      }, [])
    
      const getBrands = () => {
          try{
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
            fetch(`${API}/brands`,{
                method: 'GET',
                headers:headers
            })
              // We get the API response and receive data in JSON format...
              .then(response => response.json())
              // ...then we update the users state
              .then(data =>{
                setBrands(data)
            })
          }catch(error){
              console.log(error)
          }
      }
      useEffect(() => {
        getBrands()
      }, [])
      return(
        <React.Fragment>
            <Grid container direction="row" spacing={1} justify="flex-start"
                    alignItems="center" >
                    <Grid item xs={4}>
                        <ExportCSV 
                            csvData={downloadProducts} 
                            fileName={'marcas-WASIPET'}  
                        />
                    </Grid>
                    <Grid item xs={4} alignItems={'right'}>
                        Total: {products.length} productos registrados
                    </Grid>
                    <Grid item xs={4}>
                        <AddProduct brands={brands} />
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
                        Marca
                    </TableCell>
                    <TableCell align="center">
                        Foto
                    </TableCell>
                    <TableCell align="center">
                        Estado
                    </TableCell>
                    <TableCell align="center">
                        Acción
                    </TableCell>
                    <TableCell align="center">
                        Acción
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {!isLoading ? (
                contentArray.map((product,index) => {
                    return(
                        <TableRow hover  key={product._id}>
                            <TableCell key={index} align="center">
                                {perPage * (page - 1) + (index + 1)}
                            </TableCell>
                            <TableCell key={product.name} align="center">
                                {product.name}
                            </TableCell>
                            <TableCell key={Math.random()} align="center">
                                {product.brand}
                            </TableCell>
                            <TableCell key={Math.random()} align="center">
                            {
                                    product.image ? 
                                    <img src={`https://wasipetapp.com/api/public/${product.image}`} style={{width:'40px'}}/>
                                    : 'Sin foto'
                                }
                            </TableCell>
                            <TableCell key={Math.random()} align="center">
                                { product.active == true ? 
                                    <div style={{color:'green', fontWeight:'bold'}}>
                                        Activo
                                    </div> : 
                                    <div style={{color:'red', fontWeight:'bold'}}>
                                        Desactivado
                                    </div>
                                }
                            </TableCell>
                            <TableCell key={Math.random()} align="center">
                                <DisableProduct product={product} />
                            </TableCell>
                            <TableCell key={Math.random()} align="center">
                                <EditProduct product={product} brands={brands}  />
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

export default TableProductsBusiness;