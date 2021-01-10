import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import Alert from "../layout/Alert";
import NotFound from "../layout/NotFound";
import MyProfile from "../profile/MyProfile";
import PrivateRoute from "../routing/PrivateRoute";
import Login from "../auth/Login";
import Dashboard from "../dashboard/Dashboard";
import CoursePosts from "../elements/CoursePosts";
import AddPost from "../elements/AddPost";
import AdminPanel from "../admin/AdminPanel";
import StudentsTable from "../elements/students/StudentsTable";
import GradesTable from "../elements/grades/GradesTable";

const Routes = withRouter(() => {
    return (
        <section className="container">
            <Alert/>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/my-profile" component={MyProfile}/>
                <PrivateRoute exact path="/admin-panel" component={AdminPanel}/>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute
                    exact
                    path="/students/:cId/:sId"
                    component={StudentsTable}
                />
                <PrivateRoute exact path="/course/:cId/posts" component={CoursePosts}/>
                <PrivateRoute exact path="/course/:cId/posts/add-post" component={AddPost}/>
                <PrivateRoute exact path="/grades/:cId" component={GradesTable}/>
                <Route component={NotFound}/>
            </Switch>
        </section>
    );
});

export default Routes;
