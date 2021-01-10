import React, {useRef} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "./NotificationsList.css";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import SchoolIcon from '@material-ui/icons/School';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUserNotifs} from "../../../store/notifications/notificationActions";
import clsx from "clsx";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({

    parent: {
        top: '3.4875rem',
        right: '8rem',
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: '1rem',
        width: '25rem',
        maxHeight: '20rem',
        overflow: 'auto',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.leavingScreen
        }),
    },
    firstItem: {
    },
    lastItem: {
        borderRadius: '0 0 0.5rem 0.5rem',
    },
    item: {
        backgroundColor: "#e0e0e0",
    },
    textColor: {
        color: 'black',
    },
    header: {
        backgroundColor: "#37474f",
        borderRadius: '0.5rem 0.5rem 0 0',
    }
}));

function NotificationItem(props) {

    const classes = useStyles();
    const {item, index, nrTot} = props;
    const myRef = useRef(item.postId);
    const executeScroll = () => {

        localStorage.setItem('scrollTo', myRef.current);
    };

    if (index === nrTot - 1) {
        return <>
            <Link to={`/course/${item.courseId}/posts`} onClick={executeScroll}>
                <ListItem button className={clsx(classes.lastItem, classes.item)}>
                    <ListItemIcon>
                        <SchoolIcon/>
                    </ListItemIcon>
                    {item.type === 'new_post' ? (
                            <ListItemText className={classes.textColor} primary={item.title}/>) :
                        (<ListItemText className={classes.textColor} primary={item.body}/>)
                    }
                </ListItem>
            </Link>
            <Divider/>
        </>
    }
    return <>
        <Link to={`/course/${item.courseId}/posts`} onClick={executeScroll}>
            <ListItem button className={classes.item}>
                <ListItemIcon>
                    <SchoolIcon/>
                </ListItemIcon>
                {item.type === 'new_post' ? (
                        <ListItemText className={classes.textColor} primary={item.title}/>) :
                    (<ListItemText className={classes.textColor} primary={item.body}/>)
                }
            </ListItem>
        </Link>
        <Divider/>
    </>
}


export const NotificationsList = ({notifications}) => {

    const classes = useStyles();
    return <div className={classes.parent}>
        <ListItem className={classes.header}>
            <ListItemText>Notifications</ListItemText>
        </ListItem>
        <ListItem/>
        <Divider/>
        {notifications.map((notifItem, index) =>
            <NotificationItem key={index} item={notifItem} index={index} nrTot={notifications.length}/>
        )}
    </div>;
};

NotificationsList.propTypes = {
    notifications: PropTypes.array
};

const mapStateToProps = state => ({
    notifications: state.notification.data
});

export default connect(mapStateToProps, {getUserNotifs})(NotificationsList);