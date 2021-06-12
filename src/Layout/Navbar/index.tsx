import {useState} from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: 'black'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      [theme.breakpoints.down('sm')]:{
        fontSize: 14
      }
    },
    header:{
      textDecoration: 'none',
      color: 'black',
      fontFamily:  `Roboto, Helvetica, Arial, sans-serif`,
    },
    link:{
        textDecoration: 'none',
        color: 'black',
        marginLeft: '0.5rem',
        fontFamily:  `Roboto, Helvetica, Arial, sans-serif`,
        padding: '0.5rem',
        borderRadius: 8,
        transition: "all ease-in",
        transitionDuration: '0.25s',
        [theme.breakpoints.down('xs')]:{
          fontSize: 10,
          marginLeft: '0.25rem',
          padding: '0.5rem',
        },
        fontSize: '0.875rem',
        "&:hover":{
          backgroundColor: '#fff',
        }
    }
  }),
);

interface Navbar {
    login: boolean
}

export default function ButtonAppBar({login}: Navbar) {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggesIn] = useState<boolean>(login)
    const logout = () => {
        localStorage.removeItem("user-credentials")
        setIsLoggesIn(false)
    }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
                <Link to='/modeltype' className={classes.header} > Infinity Data Model </Link>
            </Typography>

            {isLoggedIn && <Link to='/modeltype' className={classes.link} > ModelType </Link>}
            {isLoggedIn && <Link to='/devicemodel' className={classes.link} > Add Device </Link>}

            {isLoggedIn ? 
                <Link to='/login' className={classes.link} onClick={logout}> LogOut </Link>
                : 
                <Link to='/login' className={classes.link}> LogIn </Link>
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}