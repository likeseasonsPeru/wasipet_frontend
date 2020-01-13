import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Button from '@material-ui/core/Button';

//{!isAuthenticated && <Link href="/"><a>Login</a></Link>}
//{isAuthenticated && <Link href="/dashboard"><a>Home</a></Link>}
const Layout = ({ children, title, isAuthenticated, deauthenticate }) => (
    
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

    </Head>
    <div className="text-center">
      <div className="nav" style={{float:'left', width:'100%',display:'flex',}}>
        <div style={{width:'50%'}}>
          { children }
        </div> 
        <div style={{width:'50%'}}>
          {isAuthenticated && <Button variant="contained" color="secondary" style={{float:'right'}}  onClick={deauthenticate} type="button" >Salir</Button>}
        </div> 
      </div>
    </div>

    <div className="has-text-centered">
    </div>
  </div>
);

const mapStateToProps = (state) => (
  {isAuthenticated: !!state.authentication.token}
);


export default connect(mapStateToProps, actions)(Layout);

