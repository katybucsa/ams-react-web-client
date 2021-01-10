import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../../store/auth/authActions";
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Gotech
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '93vh',
    },
    image: {
        backgroundImage: "url(https://images.theconversation.com/files/174709/original/file-20170620-30799-1ccyjv3.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=754&h=503&fit=crop&dpr=1)",//https://www.pngitem.com/pimgs/m/104-1040407_art-cap-diploma-transparent-background-education-logo-hd.png)",
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'auto'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = ({login, isAuthenticated, role, errors, loading}) => {

        const classes = useStyles();
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [active, setActive] = useState(false);

        const onSubmit = async e => {
            e.preventDefault();
            setActive(true);
            login(username, password);
        };

        if (isAuthenticated) {
            if (role === 'ADMIN') {
                return <Redirect to="/admin-panel"/>;
            } else {
                return <Redirect to="/dashboard"/>;
            }
        }

        return (
            <LoadingOverlay
                active={loading && active === true}
                spinner={<BounceLoader/>}
            >
                <Grid container component="main" className={classes.root}>
                    <CssBaseline/>
                    <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Login
                                </Button>
                                {/*<Grid container>*/}
                                {/*    <Grid item xs>*/}
                                {/*        <Link href="#" variant="body2">*/}
                                {/*            Forgot password?*/}
                                {/*        </Link>*/}
                                {/*    </Grid>*/}
                                {/*    <Grid item>*/}
                                {/*        <Link href="#" variant="body2">*/}
                                {/*            {"Don't have an account? Sign Up"}*/}
                                {/*        </Link>*/}
                                {/*    </Grid>*/}
                                {/*</Grid>*/}
                                <Box mt={5}>
                                    <Copyright/>
                                </Box>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </LoadingOverlay>
        );
    }
;

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    role: PropTypes.string,
    errors: PropTypes.string,
    loading: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
    errors: state.auth.errors,
    loading: state.auth.loading
});

export default connect(mapStateToProps, {login})(Login);
