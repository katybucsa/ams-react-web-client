import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import clsx from 'clsx';
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../../store/auth/authActions";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import {setOpen} from "../../../store/communication/communicationActions";
import {subscribeUser, unsubscribe} from "../../../utils/subscribe/subscribeForNotif";
import {makeStyles} from "@material-ui/core/styles";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NotificationsList from "../notifications/NotificationsList";
import {getNotSeenNotifs, getUserNotifs, setNotifNr} from "../../../store/notifications/notificationActions";


let drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
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
        padding: theme.spacing(0, 1),
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
        marginRight: theme.spacing(2)
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        // position: 'relative',
        // whiteSpace: 'nowrap',
        width: drawerWidth,
        // transition: theme.transitions.create('width', {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.enteringScreen,
        // }),
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
    // content: {
    //     flexGrow: 1,
    //     height: '100vh',
    //     overflow: 'auto',
    // },
    // container: {
    //     paddingTop: theme.spacing(4),
    //     paddingBottom: theme.spacing(4),
    // },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth + 60,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
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
    beeperNub: {
        backgroundImage: "url(/images/M1UOptzgCe4.png)",
        backgroundRepeat: 'no-repeat',
        backgroundSize: '26px 380px',
        backgroundPosition: '0 -174px',
        height: '0.8875rem',
        position: 'absolute',
        width: '20px',
        top: '2.7rem',
        right: '9.2rem',
    }
}));


const Navbar = ({auth: {access_token, isAuthenticated, role, loading}, open, setOpen, logout, notifNotSeen, notifLoading, getUserNotifs, getNotSeenNotifs}) => {

    const classes = useStyles();
    const [notifClicked, setNotifClicked] = useState(false);
    const dispatch = useDispatch();
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    navigator.serviceWorker.addEventListener('message', () => getNotSeenNotifs());

    if (isAuthenticated && localStorage.getItem('subscribed') === null) {
        subscribeUser();
        localStorage.setItem('subscribed', 'true');
    }

    if (isAuthenticated && role !== 'ADMIN' && notifLoading) {
        getNotSeenNotifs();
    }

    const unsubscribeAndLogout = async () => {
        unsubscribe(localStorage.getItem('access_token'));
        logout();
    };

    const authLinks = (
        <ul>
            <li>
                <a onClick={unsubscribeAndLogout} href="/">
                    <i className="fas fa-sign-out-alt"/>{" "}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    const showNotifications = async () => {
        if (!notifClicked) {
            getUserNotifs();
            if (notifNotSeen !== 0)
                dispatch(setNotifNr(0));
        }
        setNotifClicked(!notifClicked);
    };


    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed"
                    className={(role !== 'ADMIN' && isAuthenticated) ? clsx(classes.appBar, {[classes.appBarShift]: open}) : clsx(classes.appBar)}>
                <Toolbar className={classes.toolbar}>
                    {!loading && isAuthenticated && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon/>
                        </IconButton>
                    )}
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        <Link to="/dashboard">Gotech</Link>
                    </Typography>
                    {!loading && isAuthenticated && role !== 'ADMIN' && (
                        <>
                            <IconButton color="inherit" onClick={showNotifications}>
                                <Badge badgeContent={notifNotSeen} color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton color="inherit">
                                <Link to="/dashboard">
                                    <HomeOutlinedIcon/>
                                </Link>
                            </IconButton>
                        </>
                    )}
                    {!loading && (
                        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                    )}
                </Toolbar>
                {notifClicked && (
                    <>
                        <NotificationsList/>
                        <div className={classes.beeperNub}>
                        </div>
                    </>
                )}
            </AppBar>
        </div>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    open: PropTypes.bool,
    notifNotSeen: PropTypes.number,
    notifLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
    auth: state.auth,
    open: state.communication.isOpen,
    notifNotSeen: state.notification.notifNotSeen,
    notifLoading: state.notification.loading
});

export default connect(mapStateToProps, {logout, setOpen, getUserNotifs, getNotSeenNotifs})(Navbar);
