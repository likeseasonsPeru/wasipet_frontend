import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import PetsIcon from '@material-ui/icons/Pets';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Link from 'next/link';

export default class ListNav extends React.Component{
    render(){
      return(
        <div>
        <Link href="/dashboard">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Gráficas" />
        </ListItem>
        </Link>
        <Link href="/users">
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>
        </Link>
        <Link href="/pets">
        <ListItem button>
          <ListItemIcon>
            <PetsIcon />
          </ListItemIcon>
          <ListItemText primary="Mascotas" />
        </ListItem>
        </Link>
        <Link href="/canjes">
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Canjes" />
        </ListItem>
        </Link>
        <Link href="/tiendas">
        <ListItem button>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText primary="Tiendas" />
        </ListItem>
        </Link>
        
      </div>
      );
    }
}