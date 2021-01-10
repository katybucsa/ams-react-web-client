import React, {Fragment, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";
// Redux
import {Provider} from "react-redux";
import store from "./store";
import {loadUser} from "./store/auth/authActions";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/layout/navbar/Navbar";
import Sidebar from "./components/layout/sidebar/Sidebar";

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar/>
                    <Sidebar/>
                    <Switch>
                        <Route exact path="/" component={Landing}/>
                        <Route component={Routes}/>
                    </Switch>
                    <ToastContainer/>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;