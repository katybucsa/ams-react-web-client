import React, {createRef, useEffect} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link, Redirect, useHistory} from "react-router-dom";
import List from "@material-ui/core/List";
import FeaturedPost from "./FeaturedPost";
import {addParticipation, getParticipations, getPosts} from "../../store/posts/postActions";
import clsx from "clsx";
import {setOpen} from "../../store/communication/communicationActions";
import {useStyles} from "../../styles/styles";
import Button from "@material-ui/core/Button";
import Spinner from "../layout/Spinner";
import ListItem from "@material-ui/core/ListItem";

const scrollToRef = (ref) => {

    window.scrollTo(0, ref.current.offsetTop);
};

const CoursePosts = ({isAuthenticated, role, loading, posts, getPosts, participations, partLoading, getParticipations, addParticipation, match, open}) => {

    const classes = useStyles();
    const history = useHistory();
    const courseId = match.params.cId;
    const scrollTo = localStorage.getItem('scrollTo');

    const [elRefs, setElRefs] = React.useState([]);

    useEffect(() => {
        setElRefs(elRefs => (
            Array(posts.length).fill().map((_, i) => createRef())
        ));
    }, [posts]);

    useEffect(() => {
        if (localStorage.getItem('scrollTo') !== null) {
            getPosts(courseId);
            let pos = -1;
            elRefs.map((e, i) => {
                if (parseInt(e.postId) === parseInt(localStorage.getItem('scrollTo')))
                    pos = i;
            });
            let r = executeScroll(pos);
            if (r !== -1)
                localStorage.removeItem('scrollTo');
        }
    }, [scrollTo, elRefs.length]);

    const executeScroll = (pos) => {

        if (pos === -1) {
            return -1;
        } else if (elRefs[pos])
            scrollToRef(elRefs[pos].ref);
        return 1;
    };

    const addPart = (eventId) => {

        addParticipation({eventId}, courseId, history);
    };

    if (loading) {
        getPosts(courseId);
    }

    if (partLoading) {
        getParticipations(courseId);
    }
    if (!isAuthenticated) {
        return <Redirect to="/login"/>;
    }

    return <div className={classes.root1}>
        {loading ? <Spinner/> : (
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader}/>
                {isAuthenticated && role === 'PROFESSOR' && (
                    <Link to={`/course/${courseId}/posts/add-post`}>
                        <Button variant="contained">Add Post</Button>
                    </Link>)}
                <List>
                    {posts.map((post, index) => {
                        return <ListItem ref={r1 => {
                            const r2 = createRef();
                            r2.current = r1;
                            return elRefs[index] = {
                                ref: r2,
                                postId: post.id
                            };
                        }} key={post.id}>
                            <FeaturedPost post={post} particip={participations}
                                          courseId={courseId} history={history} addpart={addPart}/>
                        </ListItem>
                    })}
                </List>
            </main>
        )}
    </div>
};
CoursePosts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    participations: PropTypes.array,
    role: PropTypes.string,
    loading: PropTypes.bool,
    posts: PropTypes.array,
    open: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
    posts: state.post.data,
    loading: state.post.loading,
    partLoading: state.post.partLoading,
    participations: state.post.participations,
    open: state.communication.isOpen
});

export default connect(mapStateToProps, {getPosts, setOpen: setOpen, getParticipations, addParticipation})(CoursePosts);
