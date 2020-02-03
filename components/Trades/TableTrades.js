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
import LookTrade from './ViewDetailsTrade';

class TableUsers extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            token : getCookie('token'),
            trades :{},
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
        fetch(`${API}/canje`,{
            method: 'GET',
            headers:headers
        })
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>
            this.setState({ 
              trades: data,
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
                            Código de Canje
                        </TableCell>
                        <TableCell align="center">
                            Usuario
                        </TableCell>
                        <TableCell align="center">
                            Tienda
                        </TableCell>
                        <TableCell align="center">
                            Ver detalles
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {!this.state.isLoading ? (
                    this.state.trades.map((trade) => {
                        return(
                            <TableRow hover role="checkbox" key={trade._id}>
                                <TableCell key={trade.name} align="center">
                                    {trade.code_trade}
                                </TableCell>
                                <TableCell key={trade.type} align="center">
                                    {trade.user}
                                </TableCell>
                                <TableCell key={trade.email} align="center">
                                    {trade.store}
                                </TableCell>
                                <TableCell  align="center">
                                    <LookTrade
                                    tradecode={trade.code_trade}
                                    codeuser={trade.user}
                                    storecode={trade.store}
                                    fecha={trade.createdAt}
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