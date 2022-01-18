import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import PetsIcon from "@material-ui/icons/Pets";
import StorefrontIcon from "@material-ui/icons/Storefront";
import HistoryIcon from "@material-ui/icons/History";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BlockIcon from '@material-ui/icons/Block';
import RecentActorsSharpIcon from '@material-ui/icons/RecentActorsSharp';
import AnnouncementSharpIcon from '@material-ui/icons/AnnouncementSharp';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectorySharp';
import Link from "next/link";

export default class ListNav extends React.Component {
  render() {
    return (
      <React.Fragment>
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
        <Link href="/trades">
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Canjes" />
          </ListItem>
        </Link>
        <Link href="/history">
          <ListItem button>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Historial por Usuario" />
          </ListItem>
        </Link>
        <Link href="/brands">
          <ListItem button>
            <ListItemIcon>
              <BrandingWatermarkIcon />
            </ListItemIcon>
            <ListItemText primary="Marcas" />
          </ListItem>
        </Link>
        <Link href="/products">
          <ListItem button>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItem>
        </Link>
        <Link href="/banners">
          <ListItem button>
            <ListItemIcon>
              <RecentActorsSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Banners" />
          </ListItem>
        </Link>
        <Link href="/services">
          <ListItem button>
            <ListItemIcon>
              <StoreMallDirectoryIcon />
            </ListItemIcon>
            <ListItemText primary="Stores" />
          </ListItem>
        </Link>
        <Link href="/message">
          <ListItem button>
            <ListItemIcon>
              <AnnouncementSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Mensajes" />
          </ListItem>
        </Link>
        <Link href="/blockUser">
          <ListItem button>
            <ListItemIcon>
              <BlockIcon />
            </ListItemIcon>
            <ListItemText primary="blockuser" />
          </ListItem>
        </Link>
      </React.Fragment>
    );
  }
}
