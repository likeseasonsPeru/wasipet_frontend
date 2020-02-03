  
import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';
import actions from '../redux/actions';
import { withStyles  } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListNav from '../components/Dashboard/ListNav';
import TableTrades from '../components/Trades/TableTrades';
const drawerWidth = 240;
const classes = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
});

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open : false,
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
  }

  async componentDidMount() {
    await this.props.getUser(
      { token: this.props.authentication.token },
      'user'
    );
  }
  handleDrawerOpen (event){
    this.setState({open : true});
    console.log('Open'+ this.state.open);
  };
  handleDrawerClose(event){
    this.setState({open: false});
    console.log('Close'+ this.state.open);
  };
  
  render() {
    const {classes} = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    //console.log(this.props.authentication.token);
    //console.log(this.props.authentication.user);
    return this.props.authentication.user ? (
        <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar, this.state.open && classes.appBarShift} style={{zIndex : 9999}}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}  align="left">
          <Layout title="Dashboard">
            Bienvenido, {this.props.authentication.user.name}
          </Layout>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
        }}
        open={this.state.open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListNav></ListNav>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
       
        <Container maxWidth="lg" className={classes.container} style={{marginTop: '60px'}}>
          <h1>
            Trades
          </h1>
          <Grid container spacing={2}>
            <Grid item xs={12}  >
              <Paper >
                  <TableTrades></TableTrades>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
          </Box>
        </Container>
      </main>
        </div> 
      
    ) : (
      <Container align="center">
        <h3>No estas autorizado.</h3>
      </Container>
      );
  }
}

export default withStyles(classes)(connect(state => state, actions)(Users));
//export default compose( withStyles(classes, { name: 'Dashboard',}),connect(state => state, actions))(Dashboard);
